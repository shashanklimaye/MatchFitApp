import { createContext, useEffect, useState } from 'react'; // React.
import { router } from 'expo-router'; // Expo Router.
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications'; // Notifications
import * as Device from 'expo-device'; // Device functionality.

/* Create a context object to hold the notification token - this will need to be accessed later, when we go to register our device. */

export const NotificationContext = createContext<{ notificationToken: Notifications.DevicePushToken }>(null);

/* Handle. */

const handleNotificationsToken = async () : Promise<Notifications.DevicePushToken> => {

    /* Token is stored here. We use the device token, which depends on OS.  */
    
    let token: Notifications.DevicePushToken;

    /* Sets up a Notification channel. This is something Android uses. */
    
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    /* If the device is real (not emulated), the app checks current notification permissions. We can disable this for testing purposes. */
        
    if (Device.isDevice) {

        /* We call the API and check the permissions. First we see if they exist. */
        
        let NotificationStatus: Notifications.NotificationPermissionsStatus = await Notifications.getPermissionsAsync();

        /* If the permissions don't exist, we ask for them to the user. */

        console.log(NotificationStatus.status);

        if(!NotificationStatus.granted) {
            NotificationStatus = await Notifications.requestPermissionsAsync();
        }

        /* If the permissions fail, we're probably going to need more complex logic. Maybe we can come back and fix this later. */

        if (!NotificationStatus.granted) {
            alert('Failed to get push token for push notification!');
            alert(NotificationStatus.status);
            return;
        }

        /* If we do end up with valid permissions, we just grab the token. */

        token = await Notifications.getDevicePushTokenAsync();

        console.log(token);

    } else {
        alert('Must use physical device for Push Notifications');   
    }

    return token;
}

/* Parent handler for notifications. Every notification response is handled by this function, which passes on to other functions.  */

const handleNotification = (notification: Notifications.Notification) => {

  /* There are a few notification types - we handle them here, and pass them on to handlers. */

  //const url: string = notification.request.content.data?.url;

  //if(url) {
    //router.push(url);
  //}

  alert(notification.request.content);

  console.log(notification.date);
  console.log(notification.request.content.title);
  console.log(notification.request.content.body);
  console.log(notification.request.content.data);
}


export function NotificationProvider({ children }) {

  const [notificationToken, setNotificationToken] = useState<Notifications.DevicePushToken>(null);

  /* Runs code on provider load (app load) to grab token (if needed), mount handlers, and ultimately ensure we can handle requests. */

  useEffect(() => {

    /* Set handler for notifications when app is running. */

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true
      })
    });

    /* Go through setup process. */

    handleNotificationsToken().then((token) => setNotificationToken(token));

    /* Mount handlers. */

    const runningSubscription = Notifications.addNotificationReceivedListener(response => {
      console.log("here notif");
      handleNotification(response);
    });

    const clickSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("here 2 notif");
      handleNotification(response?.notification);
    });

    return () => { runningSubscription.remove(); clickSubscription.remove(); }
  }, []);

  return (
    <NotificationContext.Provider value={{ notificationToken: notificationToken }}>
      {children}
    </NotificationContext.Provider>
  );
  }
import { createContext, useEffect, useState } from 'react'; // React.
import { useRootNavigationState, router, useSegments } from 'expo-router'; // Expo Router.
import { tryActivateDevice, tryAuth, tryDeactivateDevice, verifyIfSetup } from '../services/auth'; // API service.
import { UserState } from '../schema'; // UserState type, used to store user state.
import { DeviceOS, HttpMethod, Role } from '../constants/enums'
import * as SecureStore from 'expo-secure-store'; // Encrypted storage.
import { useNotifications } from '../hooks/notification'; // Notifications.
import * as Device from 'expo-device'; // Device.

/* Create a context object to just hold auth info (because we're using redux for general storage). */

export const AuthContext = createContext<{ user: UserState, login: (username: string, password: string) => Promise<{ success: boolean, message: string }>, logout: () => Promise<{ success: boolean}> }>(null);

/* This hook is called on every change in section (as it is called when the segments change), and authenticates the user can access the route. */

function useProtectedRoute(user: UserState) {

  const segments = useSegments();
  const navState = useRootNavigationState();
  
  useEffect(() => {

    /* This part helps with navigation, which bugs out on initial load. */

    if (!navState?.key) return;

    /* Checks the segments for each section. If they're authed but not allowed, or not authed, deny their ability to do anything. */

    const inAuthGroup = segments.includes('(auth)');
    const inSetupGroup = segments.includes('(setup)');
    const inStudioGroup = segments.includes('(studio)');
    const inInstructorGroup = segments.includes('(instructor)');

    /* Check what part of the program the user belongs to. */

    if(!user && !inAuthGroup) {

      /* If the user makes it here, they are in the section requiring any auth without it. So they're logged out. */

      router.replace('/login');  

    } else {

      /* If the user makes it here, they have a user state prepared. So they're logged in. Now we do extra checks for bad perms or no setup. */

      if(user && !user.isSetup && !inSetupGroup) {

        /* If the user makes it here, they are not set up, and not in the setup process. Here, we send them to the setup screen. */

        if(user.role == Role.Studio) {

          /* Move them to the studio setup screen, to begin setup. */

          router.replace({pathname:'/LocationSetup', params:{role:"Studio"}})

        } else if (user.role == Role.Instructor) {

          /* Move them to the instructor setup screen, to begin setup. */

          router.replace({pathname:'/LocationSetup', params:{role:"Instructor"}})
        }

      } else if (user && inAuthGroup) {

        /* If the user makes it here, they are in the section for getting a token while already having one. So they're logged in. */
  
        router.replace('/');  
  
      } else {
  
        /* If the user makes it here, they're logged in. So we can then check if they're in the wrong sections. */
  
        if(inStudioGroup && user.role != Role.Studio)
        {
          router.replace('/');  
        }
  
        if(inInstructorGroup && user.role != Role.Instructor)
        {
          router.replace('/'); 
        }
  
        /* If they make it to this section, they're authorised correctly. */
      }
    }
    
  }, [user, segments, navState]);
}

/* These functions are for handling login and logout. We don't want to use inline functions for formatting reasons. */

async function login(username: string, password: string, setUser: Function, notificationToken: string, os: DeviceOS) {

  /* Attempt the API hook (using the auth endpoint). */
  
  const { data, error } = await tryAuth(username, password);

  /* Assess the response - we check the data to see if the token is provided, otherwise we consider it a bad login. */

  if(!error)
  {
    /* We then check whether the user is set up or not, which is important in determing whether to move them to the setup stage. */

    const isSetup = await verifyIfSetup(data.role, data.token, data.username);

    /* We save it both in the temporary store and the secure store. */

    const user : UserState = {
      username: data.username,
      id: data.id,
      token: data.token,
      role: data.role,
      isSetup: isSetup,
    }

    setUser(user);

    await SecureStore.setItemAsync("user", JSON.stringify(user));

    /* We then add the device to the server for notifications. */

    const isRegistered = await tryActivateDevice(user.token, user.username, notificationToken, os);

    if(isRegistered) {
      return { success: true, message: "You have logged in successfully." }
    } else {
      return { success: false, message: "Notification registration failed." }
    }
  } else
  { 
    /* Handle the error here. */

    return { success: false, message: error.message } ;
  }
}

async function logout(user: UserState, setUser: Function, notificationToken: string, os: DeviceOS) : Promise<{ success: boolean }> {

  /* To logout, we simply need to remove the token from the auth storage, and the secure storage. Then our hook redirects. */

  const isDeregistered = await tryDeactivateDevice(user.token, user.username, notificationToken, os);

  setUser(null);

  await SecureStore.deleteItemAsync("user");

  return { success: true };
}

/* This component(?) is a provider that passes down the props for the above auth hook. */

export function AuthProvider({ children }) {
  const { notificationToken } = useNotifications();
  const [user, setUser] = useState<UserState>(null);

  /* Set up function for fetching secure credentials on load, and then using it to grab the data. */

  useEffect(() => {
    const fetchSecure = async () => {
      const encryptedUser : string = await SecureStore.getItemAsync("user");
      const storedUser : UserState = JSON.parse(encryptedUser);
    
      if(storedUser) {
        setUser(storedUser);
      }
    }
    
    fetchSecure();
  }, []);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider value={{ user, login: async (username: string, password: string) => await login(username, password, setUser, notificationToken?.data, DeviceOS.Android), logout: async () => await logout(user, setUser, notificationToken?.data, DeviceOS.Android)}}>
      {children}
    </AuthContext.Provider>
  );
}

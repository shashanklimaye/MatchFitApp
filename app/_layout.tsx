import { Slot } from "expo-router"; // Routing.
import { AuthProvider } from '../context/auth'; // Auth.
import { APIProvider } from "../context/api"; // API
import { NotificationProvider } from '../context/notification'; // Notifications
import { SafeAreaProvider } from 'react-native-safe-area-context'; // Safe areas.
import { Provider as StateProvider } from 'jotai' // State management.
import tw, { useDeviceContext } from 'twrnc'; // Styling

/* This is where the root of the app is. */

export default function Root() {
  
  /* Set TWRNC (Tailwind React Native Classnames) so that it adheres to the device context, meaning it adjusts to light and dark modes. */

  useDeviceContext(tw)

  /* All global code that might be here is loaded into the React Native Context API. Bad code pattern? Maybe, but the code looks clean. */

  return (
    <StateProvider>
      <NotificationProvider>
        <AuthProvider>
          <APIProvider>
            <SafeAreaProvider>
              <Slot />
            </SafeAreaProvider>
          </APIProvider>
        </AuthProvider>
      </NotificationProvider>
    </StateProvider>
  );
}
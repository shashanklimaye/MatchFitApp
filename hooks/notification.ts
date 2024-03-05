import { useContext } from 'react';
import { NotificationContext } from '../context/notification';


/* This hook is called when the page/layout/route needs auth data, or one of the functions for loggin in or out.  */

export function useNotifications() {
  return useContext(NotificationContext);
}
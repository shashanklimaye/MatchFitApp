import { useContext } from 'react';
import { AuthContext } from '../context/auth';

/* This hook is called when the page/layout/route needs auth data, or one of the functions for loggin in or out.  */

export function useAuth() {
  return useContext(AuthContext);
}
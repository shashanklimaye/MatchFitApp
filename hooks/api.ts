import { useContext } from 'react';
import { APIContext } from '../context/api';

/* This hook is called when the page/layout/route needs auth data, or one of the functions for loggin in or out.  */

export function useAPI() {
  return useContext(APIContext);
}
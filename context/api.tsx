import { createContext } from 'react'; // React.
import { useAuth } from '../hooks/auth'; // Auth hook, for getting auth related info.
import axios, { AxiosResponse } from 'axios'; // API calls.
import { BASE_URL } from '../constants'; // Base URL for API.
import { FetchError } from '../schema/responses'; // Generic error class.
import { HttpMethod } from '../constants/enums'; // HTTP Method enum.

/* Create a context object to just hold API info (because we're using it as a general utiliity function that can also handle state storage). */

export const APIContext = createContext<{makeRequest: <T>(path: string, method: HttpMethod, body?: object) => Promise<{data: T, error: FetchError}> }>(null);

/* This function is for making API calls. */

async function makeRequest<T>(logout: Function, path: string, method: HttpMethod, body?: object, token?: string) : Promise<{data: T, error: FetchError}> {

  let data: T | null = null;
  let error: FetchError | null = null;
  
  try {
    const response: AxiosResponse<T> = await axios(path, { 
        baseURL: BASE_URL, 
        headers: token != null ? { "Authorization" : `Bearer ${token}` } : null,
        method: method, 
        data: body 
    });

    /* If it gets to this part, that means the request was a success (2xx status code). */  

    data = response.data;

  } catch (err) {

    /* If it gets to this part, that means the request failed somehow. We can manually handle some of the response codes. */

    error = { code : err.response.data.status, summary : err.response.data.title, message: "Sorry, login failed. Please check you have the correct username and password before trying again."  };
    
    if(err.response.status == 401) {

        /* If the user gets this, they're not meant to be hitting this endpoint. This should not be possible, so we log them out. */

        logout();
    }
  }

  return { data, error }
}

/* This component is a provider that passes down the props for the above API hook. */

export function APIProvider({ children }) {

  const { user, logout } = useAuth();

  return (
    <APIContext.Provider value={{ makeRequest: async (path: string, method: HttpMethod, body?: object) => await makeRequest(logout, path, method, body, user.token)}}>
      {children}
    </APIContext.Provider>
  );
}

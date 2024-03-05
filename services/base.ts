import axios, { AxiosResponse } from 'axios';
import { FetchError } from '../schema/responses';
import { BASE_URL } from '../constants';
import { HttpMethod } from '../constants/enums';

/* Here we have the base function for making non-auth request, because there's a couple of them. */

export const tryNonAuthRequest = async <T>(path: string, method: HttpMethod, body?: object) => {

    let data: T | null = null;
    let error: FetchError | null = null;

    /* Set asynchronous function for making requests in the first place.  */
        
    try {
        const response: AxiosResponse<T> = await axios(path, { 
            baseURL: BASE_URL,
            method: method, 
            data: body 
        });

        /* If it gets to this part, that means the request was a success (2xx status code). */

        data = response.data;

    } catch (err : any) {

        /* If it gets to this part, that means the request failed somehow. */

        error = { code : err.response.data.status, summary : err.response.data.title, message: "Sorry, login failed. Please check you have the correct username and password before trying again."  };
    }

    return { data, error };
}

export const tryAuthRequest = async <T>(path: string, method: HttpMethod, token: string, body?: object) => {

    let data: T | null = null;
    let error: FetchError | null = null;

    /* Set asynchronous function for making requests in the first place.  */
        
    try {
        const response: AxiosResponse<T> = await axios(path, { 
            baseURL: BASE_URL,
            headers: { "Authorization" : `Bearer ${token}` },
            method: method, 
            data: body 
        });

        /* If it gets to this part, that means the request was a success (2xx status code). */

        data = response.data;

    } catch (err : any) {
        
        console.log(err.response);

        /* If it gets to this part, that means the request failed somehow. */

        error = { code : err.response.data.status, summary : err.response.data.title, message: "Sorry, login failed. Please check you have the correct username and password before trying again."  };
    }

    return { data, error };
}
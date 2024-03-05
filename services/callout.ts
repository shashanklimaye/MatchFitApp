import { HttpMethod } from "../constants/enums";
import { StudioCallout, StudioCalloutApplication, } from "../schema";
import { StudioCalloutApplicationResponse } from "../schema/responses";
import { FetchError } from "../schema/responses";
import { REQUEST_ENDPOINT, RESPONSE_ENDPOINT } from "../constants";

export const makeInstructorRequest = async (makeRequest: <T>(path: string, method: HttpMethod, body?: object) => Promise<{data: StudioCallout, error: FetchError}>) => {

    const { data, error } = await makeRequest<StudioCallout>(REQUEST_ENDPOINT, HttpMethod.POST, {
        "instructorType": "string",
        "studioLocationId": 0,
        "note": "string",
        "isClosed": true,
        "calloutDateTimes": ["2023-09-20T05:05:20.157Z"]
    });

    return { data, error };
}

export const getInstructorRequest = async (calloutID: number, makeRequest: <T>(path: string, method: HttpMethod, body?: object) => Promise<{data: StudioCallout, error: FetchError}>) => {

    const { data, error } = await makeRequest<StudioCallout>(REQUEST_ENDPOINT + "/" + calloutID, HttpMethod.GET);

    return { data, error };
}

export const acceptInstructorRequest = async (calloutID: number, userID: number, makeRequest: <T>(path: string, method: HttpMethod, body?: object) => Promise<{data: StudioCalloutApplicationResponse, error: FetchError}>) => {

    const { data, error } = await makeRequest<StudioCalloutApplicationResponse>(RESPONSE_ENDPOINT, HttpMethod.POST, {
        "accept": true,
        "reject": false,
        "userId": userID,
        "studioCalloutId": calloutID
    });

    return { data, error };
}

export const denyInstructorRequest = async (calloutID: number, userID: number, makeRequest: <T>(path: string, method: HttpMethod, body?: object) => Promise<{data: StudioCalloutApplicationResponse, error: FetchError}>) => {

    const { data, error } = await makeRequest<StudioCalloutApplicationResponse>(RESPONSE_ENDPOINT, HttpMethod.POST, {
        "accept": false,
        "reject": true,
        "userId": userID,
        "studioCalloutId": calloutID
    });

    return { data, error };
}

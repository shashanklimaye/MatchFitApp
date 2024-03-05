import { AuthResponse, RegisterResponse, InstructorProfileResponse, UserExistsResponse, FetchError, LocationValidityResponse } from '../schema/responses';
import { DeviceOS, HttpMethod, Role } from '../constants/enums';
import { AUTH_ENDPOINT, REGISTER_ENDPOINT, USER_EXISTS_ENDPOINT, INSTRUCTOR_PROFILE_ENDPOINT, STUDIO_LOCATION_ENDPOINT, BASE_URL, USER_SPECIALIZATION_ENDPOINT, DEVICE_ENDPOINT } from '../constants';
import { tryAuthRequest, tryNonAuthRequest } from './base';
import { UserSpecializationResponse } from '../schema/responses/UserSpecializationResponse';
import { Qualifications } from '../constants';
import { StudioLocationResponse } from '../schema/responses/StudioLocationResponse';
import { Device, StudioLocation, User } from '../schema';

/* Generic auth API calls. */

export const tryAuth = async (username: string, password: string) => {

    const { data, error } = await tryNonAuthRequest<AuthResponse>(AUTH_ENDPOINT, HttpMethod.POST, { 
        "username": username, 
        "password": password
    });

    return { data, error };
}

export const tryRegister = async (username: string, password: string, firstName: string, surname: string, role: Role) => {
    
    const { data, error } = await tryNonAuthRequest<RegisterResponse>(REGISTER_ENDPOINT, HttpMethod.POST, { 
        "username": username,
        "password": password,
        "firstName": firstName,
        "surname": surname,
        "role": role
    });

    return { data, error }
}

export const trySetup = async (username: string, token: string, role: Role, location? : LocationValidityResponse, qualifications ?: Qualifications, skills ?: String[]) => {

    if(role == Role.Instructor) {

        if(qualifications) {

            const { data, error } = await tryAuthRequest<InstructorProfileResponse>(INSTRUCTOR_PROFILE_ENDPOINT,HttpMethod.POST,token, {
                "firstAidNCPR": qualifications.hasFirstAidCPR,
                "currentInsurance": qualifications.hasInsurance,
                "willingDistance": qualifications.selectedRadius,
                "mobile": "+61433221224",
                "bank_BSB": "02030034",
                "bank_Account": "1222335",
                "username": username,
                "id": 252355,
                "longitude": qualifications.longitude,
                "latitude": qualifications.latitude
            });

            console.log(data);
            console.log(error);

            if(error) {
                return false;
            }
        }

        if(skills) {

            const { data, error } = await tryAuthRequest<UserSpecializationResponse>(USER_SPECIALIZATION_ENDPOINT,HttpMethod.POST,token,{
                "username": username,
                "specializations" : skills
            });

            console.log(data);
            console.log(error);

            if(error) {
                return false;
            }
        }
    }

    if(role == Role.Studio) {

        if(location) {

            const { data, error } = await tryAuthRequest<StudioLocationResponse>(STUDIO_LOCATION_ENDPOINT,HttpMethod.POST,token, {
                "id": 0,
                "name": "",
                "streetAddress": location.result.address.formattedAddress,
                "contactName": "",
                "contactNo": "",
                "username": username,
                "longitude": location.result.geocode.location.longitude,
                "latitude": location.result.geocode.location.latitude
            });

            console.log(data);
            console.log(error);

            if(error) {
                return false;
            }
        }
    }

    return true;
}

/* Helper API calls, not the critical ones but important to function. */

export const verifyIfUserExists = async (username: string) => {

    /* Tries to check if username exists - we can call this as the user is typing to prevent an issue with registring with existing usernames. */

    const { data, error } = await tryNonAuthRequest<UserExistsResponse>(USER_EXISTS_ENDPOINT, HttpMethod.POST, { 
        "username": username 
    });

    return { data, error };
}

export const verifyIfSetup = async (role: Role, token: string, username : string, notificationToken?: string): Promise<boolean> => {

    const { data, error } = await tryAuthRequest<User>(REGISTER_ENDPOINT + "/" + username, HttpMethod.GET, token);

    console.log(data);
    console.log(error);

    /* Tries to check for the appopriate populated attributes - if they don't exist, then it's not set up, and therefore we need to pass them to the setup stage. */

    if(!error) {

        if (role == Role.Instructor) {
            if(data.specializations.length > 0 && data.instructorProfile.length > 0) {
                return true
            }
        }
    
        if (role == Role.Studio) {
            if(data.studioLocations.length > 0) {
                return true
            }
        }
    }

    return false
}

export const tryActivateDevice = async (token: string, username: string, identifier: string, os: DeviceOS) => {

    /* Add device to database. */

    const { data, error } = await tryAuthRequest<boolean>(DEVICE_ENDPOINT, HttpMethod.POST, token, {
        "deviceType": DeviceOS.Android,
        "deviceIdentifier": identifier,
        "username": username
    });

    return data;
}


export const tryDeactivateDevice = async (token: string, username: string, identifier: string, os: DeviceOS) => {

    /* Remove device from database. */

    const { data, error } = await tryAuthRequest<boolean>(DEVICE_ENDPOINT, HttpMethod.DELETE, token, {
        "deviceType": DeviceOS.Android,
        "deviceIdentifier": identifier,
        "username": username
    });

    return data;
}
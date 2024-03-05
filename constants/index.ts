/* This file contains all our generic constants that we use across the project. */

export const BASE_URL = "https://plankton-app-eqag7.ondigitalocean.app/api";

export const AUTH_ENDPOINT = "/Authentication";
export const REGISTER_ENDPOINT = "/User";
export const USER_EXISTS_ENDPOINT = "/UserExists";
export const DEVICE_ENDPOINT = "/Device";

export const LOCATION_VERIFICATION_ENDPOINT = "/AddressValidation";

export const SPECIALISATION_ENDPOINT = "/UserSpecialization";
export const INSTRUCTOR_PROFILE_ENDPOINT = "/InstructorProfile";
export const STUDIO_LOCATION_ENDPOINT = "/StudioLocations";

export const REQUEST_ENDPOINT = "/StudioCallouts";
export const USER_SPECIALIZATION_ENDPOINT = "/UserSpecialization"
export const RESPONSE_ENDPOINT = "/StudioCalloutApplication";

export interface Qualifications {
    hasFirstAidCPR : boolean,
    hasInsurance : boolean,
    selectedRadius: number,
    latitude: Number,
    longitude: Number
    streetAddress: string
}

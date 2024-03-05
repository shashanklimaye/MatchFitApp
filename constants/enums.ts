/* This file contains all our enums that we use across the project. */

export enum HttpMethod {
    /* This enum is used for ease of config when it comes to HTTP requests. */

    GET = "get", 
    HEAD = "head",
    POST = "post", 
    PUT = "put",
    DELETE = "delete",
}

export enum Role {
    /* This enum is used for ease of config when it comes to HTTP requests. */

    Admin = 0,
    Studio = 1,
    Instructor = 2
}

export enum Palette {
    /* This enum is used for ease of config when it comes to HTTP requests. */

    PRIMARY,
    SECONDARY,
    LIGHT,
    DARK,
    SUCCESS,
    FAILURE,
    WARNING
}

export enum InstructorType {
    /* This enum is used for setting up the types of instructors. */

    PILATES = "pilates",
    BODY_COMBAT = "body_combat",
    YOGA = "yoga"
}

export enum DeviceOS {
    /* This enum is used for registering the device type on the backend, for notifications. */

    Android = 0,
    iOS = 1
}
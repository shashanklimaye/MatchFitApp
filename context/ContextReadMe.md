# Context

## Constants:
### BASE_URL: Base URL for API.

## Hooks:
### useAuth: A hook for getting authentication-related information.
### useEffect: A React hook used to perform side effects in function components.
### useState: A React hook used to add state to functional components.

## Methods/Functions:
### createContext: A function from React used for creating a context object.
### axios: An HTTP client library used for making API calls.
### makeRequest<T>: An asynchronous function for making API calls. It takes parameters like path, method, body, and token.
### APIProvider: A component that serves as a provider for passing down the props related to the API hook.
### useProtectedRoute: A function used to handle navigation and authorization based on the user's state and segments.
### login: A function used for user login, including authentication, token storage, and device registration for notifications.
### logout: A function used for user logout, including token removal and device deregistration for notifications.
### handleNotificationsToken: A function for handling the retrieval of the notification token. It sets up notification channels and requests permissions, and then retrieves the device's push token.
### handleNotification: A function that handles notifications. It logs various details of the received notification.


## Enums:
### HttpMethod: An enumeration used to define different HTTP methods (GET, POST, PUT, DELETE, etc.).

## Types:
### FetchError: A custom type or class used to represent a generic error.

## Contexts:
### APIContext: A context object used to hold API-related information. It provides a makeRequest function.

## Components:
### useContext: A hook used to access the context values in functional components.
### createContext: A function from React used to create a context object.
### router: An object or function from expo-router used for navigation.
### tryActivateDevice, tryAuth, tryDeactivateDevice, verifyIfSetup: Functions for making API calls related to authentication and device registration.
### Notifications: A module from Expo used for handling notifications.
### Device: A module from Expo used for device-related functionalities.

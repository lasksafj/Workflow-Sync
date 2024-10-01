import { Credentials, User } from "@/models/User";
import axios, { AxiosInstance } from "axios";
import { hostDomain } from '@/.config/config';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to log in a user and store the access and refresh tokens locally using AsyncStorage
const loginLocal = async (email: string, password: string) => {
    try {
        // Sending a POST request to the backend API for user login
        let response = await axios.post(
            hostDomain + '/api/user/login',
            {
                email: email,
                password: password
            },
            {
                timeout: 5000  // Timeout to ensure the request doesn't hang indefinitely
            }
        );
        // Store the access and refresh tokens in AsyncStorage for later use
        await AsyncStorage.setItem('accessToken', response.data.access);
        await AsyncStorage.setItem('refreshToken', response.data.refresh);
        return response;  // Return the response containing the token
    }
    catch (err: any) {
        console.log("Login failed", err.response.data.error);
        return { status: false, data: err.response.data.error };  // Return failure response if login fails
    }
}

// Function to get a new access token using the refresh token
const getNewAccessToken = async () => {
    try {
        // Get the refresh token from AsyncStorage
        let refresh = await AsyncStorage.getItem('refreshToken');
        const response = await axios.post(
            hostDomain + '/api/user/refresh-token/',
            {
                refresh: refresh  // Send refresh token to request new access token
            },
            {
                timeout: 5000  // Timeout to avoid indefinite wait
            }
        );
        // Update AsyncStorage with the new access and refresh tokens
        await AsyncStorage.setItem('accessToken', response.data.access);
        await AsyncStorage.setItem('refreshToken', response.data.refresh);
        return response.data;  // Return the new token data
    } catch (error) {
        console.log('getNewAccessToken:', error);
        return null;  // Return null if the refresh process fails
    }
};

// Function to validate the access token, and if invalid, refresh it using the refresh token
const validateToken = async () => {
    // Retrieve access and refresh tokens from AsyncStorage
    const access = await AsyncStorage.getItem('accessToken');
    const refresh = await AsyncStorage.getItem('refreshToken');

    if (!refresh) {
        // If no refresh token is available, user must log in again
        return { status: false, data: null };
    }

    try {
        // Verify the access token by sending a request with the Bearer token
        const response = await axios.post(
            hostDomain + '/api/user/verify/',
            {},
            {
                headers: { Authorization: `Bearer ${access}` },
                timeout: 5000  // Timeout for verification
            }
        );
        return response;  // Access token is valid, return response
    } catch (err) {
        console.log('validateToken ERROR', err);
        // If the access token is invalid, attempt to refresh the token
        console.log('validateToken: try to refresh Token');

        const newToken = await getNewAccessToken();
        if (newToken == null) {
            return { status: false, data: null };  // If unable to refresh, return failure
        }
        try {
            // Retry verifying the token with the new access token
            return await axios.post(
                hostDomain + '/api/user/verify/',
                {},
                { headers: { Authorization: `Bearer ${newToken.access}` } }
            );
        }
        catch (err) {
            console.log('validateToken retry ERROR', err);
            return { status: false, data: null };  // If verification fails again, return failure
        }
    }
};

// Function to log out the user by clearing the stored tokens
const logout = async () => {
    await AsyncStorage.setItem('accessToken', '');  // Clear access token
    await AsyncStorage.setItem('refreshToken', '');  // Clear refresh token
}

export {
    loginLocal,
    logout,
    getNewAccessToken,
    validateToken,
};

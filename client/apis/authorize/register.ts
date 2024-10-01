import { Credentials, User } from "@/models/User";
import axios, { AxiosInstance } from "axios";
import { hostDomain } from '@/.config/config'

// Function to register a new user by sending user information to the backend API
const register = async (user: User, password: any) => {
    try {
        let response = await axios.post(
            hostDomain + '/api/user/register/',  // Send POST request to register API
            {
                email: user.email,
                password: password,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                dateOfBirth: user.dateOfBirth  // User details and password sent in the request body
            }
        );
        return response;  // Return response if registration is successful
    }
    catch (err: any) {
        console.log("Register failed", err);
        return { status: false, data: err.response.data.error };  // Return failure status if registration fails
    }
}

export {
    register
}

import React, { useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,  // Import Alert for error handling
} from 'react-native';
import { router } from 'expo-router';
import { loginLocal } from '@/apis/authorize/login';
import { userLogin } from '@/store/slices/userSlice';
import { useAppDispatch } from '@/store/hooks';
import { updateOrganization } from '@/store/slices/organizationSlice';

const Login = () => {
    // Managing email, password input, and loading state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    // Function to handle the login form submission
    const handleSubmit = async () => {
        setIsLoading(true);  // Show loader while waiting for response
        try {
            let response = await loginLocal(email.trim(), password);  // Call login API

            if (response.status) {
                // On successful login, update user and organization state in Redux store
                dispatch(userLogin(response.data));
                dispatch(updateOrganization({
                    abbreviation: 'ORG1',
                    name: 'Organization One',
                    address: '123 Main St'
                }));
                router.push('/auth');  // Navigate to authenticated screen
            } else {
                // If response status is false, show error message
                Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
            }
        } catch (err) {
            // Handle login failure
            console.log('login screen failed', err);
            Alert.alert('Login Failed', 'Something went wrong. Please try again later.');
        }
        setIsLoading(false);
    };

    return (
        // Wrapper to adjust the keyboard layout on different platforms
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Welcome Back!</Text>
                {/* Input field for email */}
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="#7f8c8d"
                />
                {/* Input field for password */}
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#7f8c8d"
                />
                {/* Loader to show while waiting for login API response */}
                {isLoading ? (
                    <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
                ) : (
                    // Login button that triggers handleSubmit
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                )}
                {/* Navigation to Register screen */}
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => router.replace('/unauth/register')}>
                        <Text style={styles.registerButtonText}> Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    textInput: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#dcdde1',
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#2f3640',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 50,
        color: '#2f3640',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#2980b9',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loader: {
        marginVertical: 20,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    registerText: {
        fontSize: 16,
        color: '#7f8c8d',
    },
    registerButtonText: {
        fontSize: 16,
        color: '#3498db',
        fontWeight: 'bold',
    },
});

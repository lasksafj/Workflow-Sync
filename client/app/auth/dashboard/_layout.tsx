import React from "react"; // Import React library
import { Stack } from "expo-router"; // Import the Stack component from expo-router for navigation

// Define the HomeLayout component, which sets up the navigation stack
export default function HomeLayout() {
    return (
        <Stack>
            {/* Define a screen within the stack navigator */}
            <Stack.Screen
                name="DashboardScreen" // Name of the screen component to render
                options={{ headerTitle: "Dashboard" }} // Screen options, setting the header title
            />
            <Stack.Screen name="TimeclockScreen" options={{ headerTitle: "Time Clock", headerBackTitleVisible: false }} />
            <Stack.Screen name="QRCode" options={{ headerTitle: "QR Code Generator", headerBackTitleVisible: false }} />
        </Stack>
    );
}

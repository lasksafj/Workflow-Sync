import React from 'react'
import { Stack } from 'expo-router'

export default function PayrollLayout() {
    return (
        <Stack>
            <Stack.Screen name="PayrollScreen" options={{ headerTitle: "Payroll Overview" }} />
        </Stack>
    )
}

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScheduleScreen from './ScheduleScreen';
import AvailabilityScreen from './AvailabilityScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { View } from 'react-native';


const Tab = createMaterialTopTabNavigator();

export default function PlannerTabs() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            initialRouteName='Schedule'
        >
            <Tab.Screen
                name='Schedule'
                component={ScheduleScreen}
            />
            <Tab.Screen
                name='Availability'
                component={AvailabilityScreen}
            />
        </Tab.Navigator>
    );
}

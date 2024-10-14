import { createMaterialTopTabNavigator, MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import ScheduleScreen from './ScheduleScreen';
import AvailabilityScreen from './AvailabilityScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';

const Tab = createMaterialTopTabNavigator();

export default function PlannerTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Schedule'
                component={ScheduleScreen} />
            <Tab.Screen name='Availability' component={AvailabilityScreen} />
        </Tab.Navigator>
    );
}
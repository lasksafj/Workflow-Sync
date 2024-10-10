import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { updateOrganization } from '@/store/slices/organizationSlice';
import { connectSockets, disconnectSockets } from '@/socket/socket';


export default function TabLayout() {

    const user = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();


    useEffect(() => {
        connectSockets();

        return () => {
            disconnectSockets();
        };
    }, [])

    // useEffect(() => {

    //     api.get('/api/user/protected?number=123987')
    //         .then((res) => {
    //             console.log('INDEX API get -----', res.data);
    //         })
    //         .catch(err => {
    //             console.log('INDEX API err----', err);
    //             // if (err.unauthorized) {
    //             //     alert('LOGOUT');
    //             //     router.replace('');
    //             //     logout();
    //             //     dispatch(userLogout());
    //             // }
    //         });

    // }, []);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors['light'].tint,
                headerShown: false,
            }}>
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
            {/* Commented out Schedule tab */}
            {/* <Tabs.Screen
                name="schedule"
                options={{
                    title: 'Schedule',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
                    ),
                }}
            /> */}
            {/* New Schedule1 Tab */}
            <Tabs.Screen
                name="Schedule1"
                options={{
                    title: 'Schedule1', // Update the title to differentiate
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="notification"
                options={{
                    title: 'Notifications',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}

import React, { useCallback, memo, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, PanResponder, Dimensions } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import moment from 'moment';
import Constants from 'expo-constants';

// Width for each day item
const itemWidth = Dimensions.get('window').width / 9;

// WeekDays component that displays a week view
const WeekDays = (props: any) => {

    // Animation value for calendar height
    const animationValue = useRef(new Animated.Value(0)).current;

    // Handle pressing a specific day in the calendar
    const handleDayPress = useCallback((day: DateData) => {
        props.setSelectedDay(day.dateString);
        toggleCalendarVisibility(0);
    }, []);

    // Handle selecting a day in the week header
    const handleSelectDay = useCallback((day: string) => {
        props.setSelectedDay(day);
    }, []);

    // Toggle calendar visibility between expanded and collapsed
    const toggleCalendarVisibility = (value: number) => {
        Animated.timing(animationValue, {
            toValue: value,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start();
    };

    // Detect swipe gestures to expand/collapse calendar
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) >= 10,
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 10) {
                    toggleCalendarVisibility(1);
                } else if (gestureState.dy < -10) {
                    toggleCalendarVisibility(0);
                }
            },
        })
    ).current;

    // Interpolate calendar height
    const calendarHeight = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 350],
    });

    return (
        <View style={styles.container}>

            {/* Collapsible calendar */}
            <Animated.View style={{ overflow: 'hidden', height: calendarHeight }}>
                <Calendar onDayPress={handleDayPress} selectedDay={props.selectedDay} />
            </Animated.View>

            {/* Weekly header with swipe gestures */}
            <View style={styles.weeks} {...panResponder.panHandlers}>
                <Header
                    daysOfWeek={props.daysOfWeek}
                    selectedDay={props.selectedDay}
                    onDayPress={handleSelectDay}
                />
            </View>
        </View>
    );
};

// Memoized Calendar component
const CalendarComponent = memo(({ onDayPress, selectedDay }: any) => (
    <Calendar
        onDayPress={onDayPress}
        markedDates={{ [selectedDay]: { selected: true, selectedColor: '#00aaa5' } }}
    />
));


// Memoized Header component to display days of the week
const Header = memo(({ daysOfWeek, selectedDay, onDayPress }: any) => {
    return (
        <View style={styles.header}>
            {daysOfWeek.map((day: string) => (
                <TouchableOpacity
                    key={day}
                    style={[
                        styles.dayButton,
                        day === selectedDay && styles.selectedDayButton,
                    ]}
                    onPress={() => onDayPress(day)}
                >
                    <View style={styles.item}>
                        <Text
                            style={[
                                styles.dayText,
                                day === selectedDay && styles.selectedDayText,
                            ]}
                        >
                            {moment(day).format('ddd')}
                        </Text>
                        <Text
                            style={[
                                styles.dayText,
                                day === selectedDay && styles.selectedDayText,
                            ]}
                        >
                            {moment(day).format('D')}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
});

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
        backgroundColor: '##8bc462',
        paddingHorizontal: 2,
    },
    dayButton: {
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 4,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    selectedDayButton: {
        borderColor: '#5ce65c',
        borderWidth: 2,
        borderRadius: 5,
        padding: 4,
    },
    dayText: {
        color: '#2C3E50',
        fontSize: 16,
        fontWeight: '500',
    },
    selectedDayText: {
        color: '#5ce65c',
        fontWeight: 'bold',
    },
    weeks: {
        width: Constants.screenWidth,
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        width: itemWidth,
        backgroundColor: '#F5F5F5',
        borderColor: '#E5E7EB',
        borderRadius: 10,
        height: 50,
        elevation: 3,
    }
});

export default WeekDays;
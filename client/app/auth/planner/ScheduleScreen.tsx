import React, { useState, useMemo, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import WeekDays from "./schedule/WeekDays";
import ScheduleDetail from './schedule/ScheduleDetail';
import moment from 'moment';

// ScheduleScreen component which displays a week's schedule
const ScheduleScreen: React.FC = () => {
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [expandedDate, setExpandedDate] = useState<string | null>(null);
    const itemRefs = useRef<{ [key: string]: View | null }>({});

    // Memoized array representing each day of the week
    const daysOfWeek = useMemo(
        () =>
            Array.from({ length: 7 }, (v, i) =>
                moment(date).startOf('week').add(i, 'days').format('YYYY-MM-DD')
            ),
        [date]
    );

    // Memoized week data
    const week = useMemo(() => daysOfWeek, [daysOfWeek]);

    // use useEffect to measure the position of the expanded date view
    useEffect(() => {
        if (itemRefs.current[date]) {
            itemRefs.current[date]?.measure((x, y, width, height, pageX, pageY) => {
                setExpandedDate(date);
            });
        }
    }, [date, week]);

    // Handler to toggle the expansion of the detail view
    const handleBarPress = (item: string) => {
        setExpandedDate((prev) => (prev === item ? null : item));
        setDate(item);
    };

    return (
        <View style={styles.container}>
            {/* Render the list of days */}
            <FlatList
                data={week}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <View ref={(ref) => (itemRefs.current[item] = ref)}>
                        <ScheduleDetail
                            detail={item}
                            isExpanded={expandedDate === item}
                            onPress={() => handleBarPress(item)}
                        />
                    </View>
                )}
                ListHeaderComponent={
                    <View style={styles.calendar}>
                        <WeekDays selectedDay={date} setSelectedDay={setDate} daysOfWeek={daysOfWeek} />
                    </View>
                }
            />
        </View>
    );
};

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    calendar: {
        paddingVertical: 5,
    },
    tabs: {
        paddingHorizontal: 2,
    },
});

export default ScheduleScreen;
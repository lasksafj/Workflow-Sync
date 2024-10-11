import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import WeekDays from '../components/WeekDays';
import ScheduleDetail from '../components/ScheduleDetail';
import moment from 'moment';
import { useFocusEffect } from 'expo-router';

const Schedule: React.FC = () => {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const itemRefs = useRef<{ [key: string]: View | null }>({});

  const [trigger, setTrigger] = useState(0);
  
  useFocusEffect(
    useCallback(() => {
      setTrigger((prev) => prev + 1);
    }, [])
  );

  const daysOfWeek = useMemo(
    () =>
      Array.from({ length: 7 }, (v, i) =>
        moment(date).startOf('week').add(i, 'days').format('YYYY-MM-DD')
      ),
    [date]
  );

  const [week, setWeek] = useState<string[]>(daysOfWeek);

  useEffect(() => {
    setWeek(daysOfWeek);
  }, [date]);

  useEffect(() => {
    if (itemRefs.current[date]) {
      itemRefs.current[date]?.measure((x, y, width, height, pageX, pageY) => {
        scrollViewRef.current?.scrollTo({ y: pageY, animated: true });
        setExpandedDate(date);
      });
    }
  }, [date, week]);

  const handleBarPress = (item: string) => {
    setExpandedDate((prev) => (prev === item ? null : item));
    setDate(item);
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.calendar}>
          <WeekDays selectedDay={date} setSelectedDay={setDate} daysOfWeek={daysOfWeek} />
        </View>
        <View style={styles.scheduleContainer}>
          {week.map((item, index) => (
            <View
              key={index}
              ref={(ref) => { itemRefs.current[item] = ref; }}
              style={styles.scheduleCard}
            >
              <ScheduleDetail detail={item} isExpanded={expandedDate === item} onPress={() => handleBarPress(item)} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 15,
  },
  calendar: {
    paddingTop: 20,
  },
  scheduleContainer: {
    paddingVertical: 15,
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  scheduleHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  scheduleText: {
    fontSize: 14,
    color: '#666',
  },
});

export default Schedule;

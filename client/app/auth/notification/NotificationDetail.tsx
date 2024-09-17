import { StyleSheet, Text, View, Image } from "react-native";
import React, { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { format } from "date-fns";
import { Avatar } from "@/components/Avatar";

type NotificationParams = {
    avatar?: string;
    first_name: string;
    last_name: string;
    created_date: string;
    content: string;
};

const NotificationDetail = () => {
    const item = useLocalSearchParams() as NotificationParams;

    const formattedDate = useMemo(() => {
        const date = new Date(item.created_date);
        return format(date, "MMM dd, yyyy h:mm a");
    }, [item.created_date]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {item.avatar ? (
                    <Image
                        alt="avatar"
                        resizeMode="cover"
                        style={styles.avatar}
                        source={{ uri: item.avatar }}
                    />
                ) : (
                    <Avatar
                        name={`${item.first_name} ${item.last_name}`}
                        img={item.avatar}
                    />
                )}

                <View style={styles.senderInfo}>
                    <Text style={styles.senderName}>
                        {item.first_name} {item.last_name}
                    </Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
            </View>
            
            <View style={styles.contentBox}>
                <Text style={styles.content}>{item.content}</Text>
            </View>
        </View>
    );
};

export default NotificationDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    senderInfo: {
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 10,
    },
    senderName: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
    },
    date: {
        fontSize: 14,
        color: "#999",
    },
    contentBox: {
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: "#333",
    },
});

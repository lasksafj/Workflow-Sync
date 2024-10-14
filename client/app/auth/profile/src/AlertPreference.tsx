import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity, Dimensions, Switch } from "react-native";
import { Feather as FeatherIcon } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";

// Define the props for AlertPreference component
type AlertProps = {
    alertVisible: boolean;
    setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

// AlertPreference component to manage notification preferences
const AlertPreference = ({
    alertVisible,
    setAlertVisible,
}: AlertProps) => {

    // State variables to manage preferences for different alerts
    const [timeoffPref, setTimeoffPref] = useState(true);
    const [swapdropPref, setSwapdropPref] = useState(true);
    const [schedulePref, setSchedulePref] = useState(true);
    const [announcementPref, setAnnouncementPref] = useState(true);
    const [chatPref, setChatPref] = useState(true);

    // Header component for the modal
    const Header = () => (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => {
                    setAlertVisible(false);
                }}
            >
                <FeatherIcon
                    name="chevron-left"
                    size={25}
                    color="white"
                    style={styles.title}
                />
            </TouchableOpacity>
            <Text style={styles.title}>Alert Preference</Text>
            <View style={styles.spacer} />
        </View>
    );

    // Function to save user preferences
    const savePreferences = async () => { };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={alertVisible}
            onRequestClose={() => {
                setAlertVisible(false);
            }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <Header />{/* Render the header */}
                <View style={styles.section}>
                    <View>
                        {/* Time-Off Request Switch */}
                        <View style={styles.rowWraper}>
                            <View style={styles.row}>
                                <Text style={styles.rowLabel}>Time-Off Request</Text>
                                <View style={styles.rowSpacer} />
                                <Switch
                                    value={timeoffPref}
                                    onValueChange={(value) => {
                                        setTimeoffPref(value);
                                        savePreferences();
                                    }}
                                />
                            </View>
                        </View>
                        {/* Swap/Drop Request Switch */}
                        <View style={styles.rowWraper}>
                            <View style={styles.row}>
                                <Text style={styles.rowLabel}>Swap/Drop Request</Text>
                                <View style={styles.rowSpacer} />
                                <Switch
                                    value={swapdropPref}
                                    onValueChange={(value) => {
                                        setSwapdropPref(value);
                                        savePreferences();
                                    }}
                                />
                            </View>
                        </View>
                        {/* Schedule Update Switch */}
                        <View style={styles.rowWraper}>
                            <View style={styles.row}>
                                <Text style={styles.rowLabel}>Schedule Update</Text>
                                <View style={styles.rowSpacer} />
                                <Switch
                                    value={schedulePref}
                                    onValueChange={(value) => {
                                        setSchedulePref(value);
                                        savePreferences();
                                    }}
                                />
                            </View>
                        </View>
                        {/* Announcement */}
                        <View style={styles.rowWraper}>
                            <View style={styles.row}>
                                <Text style={styles.rowLabel}>Announcement</Text>
                                <View style={styles.rowSpacer} />
                                <Switch
                                    value={announcementPref}
                                    onValueChange={(value) => {
                                        setAnnouncementPref(value);
                                        savePreferences();
                                    }}
                                />
                            </View>
                        </View>
                        {/* Chat Alert */}
                        <View style={styles.rowWraper}>
                            <View style={styles.row}>
                                <Text style={styles.rowLabel}>Chat</Text>
                                <View style={styles.rowSpacer} />
                                <Switch
                                    value={chatPref}
                                    onValueChange={(value) => {
                                        setChatPref(value);
                                        savePreferences();
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.rowWraper} />
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default AlertPreference;

//Style
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f6f6f6",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 6,
        marginTop: 6,
    },
    spacer: {
        width: 25,
    },
    section: {
        height: 200,
        width: Dimensions.get("screen").width,
    },
    rowWraper: {
        paddingLeft: 24,
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3",
        backgroundColor: "#fff",
    },
    row: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingRight: 24,
    },
    rowLabel: {
        fontSize: 17,
        fontWeight: "500",
        color: "#000",
    },
    rowSpacer: {
        flex: 1,
    },
});
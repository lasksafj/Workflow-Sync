import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native";
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Feather as FeatherIcon } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import api from "@/apis/api";

// Custom components
import ImageProfile from "./src/ImageProfile";
import Logout from "./src/Logout";
import SwitchWorkplace from "./src/SwitchWorkplace";

// Interface to define the structure of profile items
interface ItemProps {
    id: string;
    label: string;
    value: any;
}

// Interface to define the structure of link items
interface LinkProps {
    id: string;
    label: string;
    icon: any;
    type: string;
}

// ProfileScreen component
const ProfileScreen = () => {
    const navigation = useNavigation();

    // Get user and organization data from the store
    const user = useAppSelector((state: RootState) => state.user);
    const organization = useAppSelector(
        (state: RootState) => state.organization
    );
    const dispatch = useAppDispatch(); //luu du lieu vao store va refresh app xai du lieu do
    // console.log("ProfileScreen", user.profile);
    console.log("ProfileScreen", organization);

    // Format date of birth
    const date = user.profile.dateOfBirth
        ? new Date(user.profile.dateOfBirth)
        : undefined;

    const [role, setRole] = useState<string>("");

    // Define the sections of the profile and organization
    let section = [
        {
            header: "Profile Settings",
            // use items for map, data for SectionList
            items: [
                {
                    id: "name",
                    label: "Name",
                    value: user.profile.firstName + " " + user.profile.lastName,
                },
                { id: "email", label: "Email", value: user.profile.email },
                {
                    id: "phone",
                    label: "Phone",
                    value: user.profile.phoneNumber,
                },
                {
                    id: "dateOfBirth",
                    label: "Date of Birth",
                    value: date?.toISOString().split("T")[0],
                },
            ],
        },
        {
            header: "Workplace",
            // use items for map, data for SectionList
            items: [
                { id: "namewp", label: "Name", value: organization.name },
                {
                    id: "address",
                    label: "Address",
                    value: organization.address,
                },
                {
                    id: "position",
                    label: "Position",
                    value: role,
                },
            ],
        },
    ];

    // Define the sections of the utilities
    const LINKSECTIONS = [
        {
            header: "Utilities",
            items: [
                {
                    id: "request",
                    label: "Request",
                    icon: "archive" as const,
                    type: "link",
                },
                {
                    id: "switchworkplace",
                    label: "Switch Workplace",
                    icon: "refresh-cw" as const,
                    type: "link",
                },
                {
                    id: "employeelist",
                    label: "Employee List",
                    icon: "users" as const,
                    type: "link",
                },
                {
                    id: "logout",
                    label: "Log Out",
                    icon: "log-out" as const,
                    type: "trigger",
                },
            ],
        },
    ];

    // Get role of the user in the organization
    useEffect(() => {
        let org = organization.abbreviation; // Organization ID
        api.get("/api/profile/profile-getRole?org=" + org)
            .then((response) => {
                const data = response.data;
                console.log(data);
                setRole(data.role);
            })
            .catch((error) => {
                alert(error);
            });
    }, [organization]); // [] dieu kien chay tiep. [] thi chay 1 lan

    // State for controlling visibility of 'Logout' and 'Switch Workplace' modals
    // console.log("ProfileScreen", user.profile);
    const [logOutVisible, setLogOutVisible] = useState(false);
    const [switchWorkplaceVisible, setSwitchWorkplaceVisible] = useState(false);

    // Helper function to render section header
    const renderSectionHeader = ({
        section: { header },
    }: {
        section: { header: string };
    }) => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
        </View>
    );

    // Helper function to render profile items
    const RenderItems = ({ id, label, value }: ItemProps, index: number) => (
        <View
            style={[styles.rowWraper, index === 0 && { borderBottomWidth: 0 }]}
            key={id}
        >
            <View style={styles.row}>
                <Text style={styles.rowLabel}>{label}</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>{value}</Text>
            </View>
        </View>
    );

    // Helper function to render link items
    const RenderLinkItems = ({ id, label, icon, type }: LinkProps, index: number) => (
        <View
            style={[styles.rowWraper, index === 0 && { borderBottomWidth: 0 },]}
            key={id}
        >
            <TouchableOpacity
                onPress={() => {
                    if (id === "logout") {
                        setLogOutVisible(true);
                        // console.log("Logout Pressed!");
                    }
                    if (id === "switchworkplace") {
                        setSwitchWorkplaceVisible(true);
                    }
                }}
            >
                <View style={styles.row}>
                    <FeatherIcon
                        name={icon}
                        size={20}
                        color="#616161"
                        style={{ marginRight: 12 }}
                    />
                    <Text style={styles.rowLabel}>
                        {label}
                    </Text>
                    <View style={styles.rowSpacer} />
                    {["link"].includes(type) && (
                        <FeatherIcon
                            name="chevron-right"
                            size={20}
                            color="#616161"
                        />
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );

    // Render the ProfileScreen component
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <ImageProfile /> {/* Component to display the user's profile avatar */}

                {/*Render the profile sections*/}
                {section.map(({ header, items }) => (
                    <View style={styles.section} key={header}>
                        {renderSectionHeader({ section: { header: header } })}
                        <View>
                            {items.map(({ id, label, value }, index) => (
                                RenderItems({ id, label, value }, index)
                            ))}
                        </View>
                    </View>
                ))}

                {/*Render the link sections*/}
                {LINKSECTIONS.map(({ header, items }) => (
                    <View style={styles.section} key={header}>
                        {renderSectionHeader({ section: { header: header } })}
                        <View>
                            {items.map(({ id, label, icon, type }, index) => (
                                RenderLinkItems({ id, label, icon, type }, index)
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/*Modals for 'Logout' and 'Switch Workplace'*/}
            <Logout
                logOutVisible={logOutVisible}
                setLogOutVisible={setLogOutVisible}
            />
            <SwitchWorkplace
                switchWorkplaceVisible={switchWorkplaceVisible}
                setSwitchWorkplaceVisible={setSwitchWorkplaceVisible}
            />
        </SafeAreaView>
    );
};

export default ProfileScreen;

// Styles
const styles = StyleSheet.create({
    container: {

    },
    header: {
        flexDirection: "row",
        paddingHorizontal: 10,
        // marginBottom: 8,
        backgroundColor: "#008000",
        justifyContent: "space-between",
        alignItems: "center",
    },
    spacer: {
        width: 25,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 6,
        marginTop: 6,
    },
    section: {
        // paddingTop: 12,
    },
    sectionHeader: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        backgroundColor: "lightgray",
    },
    sectionHeaderText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#a7a7a7",
        textTransform: "uppercase",
        letterSpacing: 1.2,
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
    rowValue: {
        fontSize: 17,
        color: "#616161",
        marginRight: 4,
        textAlign: "right",
    },
});
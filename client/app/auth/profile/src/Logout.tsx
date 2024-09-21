import React from "react";
import { router, Stack } from "expo-router";
import { Text, StyleSheet, View, Modal, Button } from "react-native";
import { logout } from "@/apis/authorize/login";
import { userLogout } from "@/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

type LogoutProps = {
    logOutVisible: boolean;
    setLogOutVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Logout = ({
    logOutVisible,
    setLogOutVisible,
}: LogoutProps) => {
    // const router = useRouter();
    const dispatch = useAppDispatch();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={logOutVisible}
            onRequestClose={() => {
                setLogOutVisible(false);
            }}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Confirm Logout</Text>
                    <Text style={styles.modalMessage}>
                        Are you sure you want to log out?
                    </Text>
                    <View style={styles.modalButtons}>
                        <Button
                            title="Yes"
                            onPress={() => {
                                setLogOutVisible(false);
                                logout();
                                // console.log("Logout");
                                router.dismissAll();
                                // router.replace('');
                                // router.push('');
                                // console.log("aaaaaaaaaaaaaaaa");
                                dispatch(userLogout());
                            }}
                        />
                        <Button
                            title="No"
                            onPress={() => setLogOutVisible(false)}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
});

export default Logout;
import { Modal, Pressable, Text, View, StyleSheet, TextInput } from "react-native";

type SaveModalProps = {
    visible: boolean;
    onClose:() => void;
    onSave:(name: string) => void;
}


export default function SaveModal({visible, onClose, onSave}: SaveModalProps) {
    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent={true}
        >
            <Pressable style={styles.backdrop} onPress={onClose}></Pressable>
            <View style={styles.modalContainer}>
                <Text>Save a project</Text>

                <TextInput style={styles.input} placeholder="Enter project name" placeholderTextColor="#ded6d6" autoFocus/>
                <View style={styles.buttons}>
                <Pressable style={styles.saveBtn}>
                    <Text style={styles.saveBtnText}>Save</Text>
                </Pressable>
                <Pressable style={styles.cancelBtn}>
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                </Pressable>
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({

    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },

    modalContainer: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },

    input: {
        backgroundColor: "#2a2a2a",
        color: "#ffff",
        padding: 10,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 20
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        gap: 20
    },

    cancelBtn: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "darkred",
        alignItems: "center"
    },
    cancelBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 500
    },

    saveBtn: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "purple",
        alignItems: "center"
    },

    saveBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 500
    }

})
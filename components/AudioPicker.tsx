import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import * as DocumentPicker from 'expo-document-picker';

type AudioPickerProps = {
    onAudioSelected: (audioPath: string) => void;
    audioSelected?: boolean;
}

export function AudioPicker({ onAudioSelected, audioSelected }: AudioPickerProps) {

    const pickAudio = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: true,
            type: 'audio/*',
        });
        console.log("PICKED AUDIO ", result);
        if (!result.canceled && result.assets && result.assets.length > 0) {
            onAudioSelected(result.assets[0].uri);
        }
    }


    return (
        <View>
            <TouchableOpacity onPress={pickAudio} style={{...styles.button, backgroundColor: `${audioSelected ? "grey" : "purple"}`}}>
                <Text style={styles.buttonText}>Pick an audio</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: "purple",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: 600
    }
});
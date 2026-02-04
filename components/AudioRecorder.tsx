import {
    AudioModule,
    RecordingPresets,
    setAudioModeAsync,
    useAudioRecorder,
    useAudioRecorderState
} from 'expo-audio';
import { useEffect } from 'react';
import { Alert, Button, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

type AudioRecorderProps = {
    onRecordingComplete: (audioPath: string) => void;
    audioSelected?: boolean;
}

export default function AudioRecorder({ onRecordingComplete, audioSelected }: AudioRecorderProps) {
    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const recorderState = useAudioRecorderState(audioRecorder);

    const record = async () => {
        await setAudioModeAsync({
            playsInSilentMode: true,
            allowsRecording: true,
        });
        await audioRecorder.prepareToRecordAsync();
        audioRecorder.record();
    };

    const stopRecording = async () => {
        await audioRecorder.stop();
        console.log("RECORDED AUDIO ", audioRecorder.uri);
        if (audioRecorder.uri) {
            onRecordingComplete(audioRecorder.uri)
        }
    };


    useEffect(() => {
        (async () => {
            const status = await AudioModule.requestRecordingPermissionsAsync();
            if (!status.granted) {
                Alert.alert('Permission to access microphone was denied');
            }
        })();
    }, []);

    return (
        <View>
            <TouchableOpacity style={{...styles.button, backgroundColor: `${audioSelected ? "grey" : "purple"}`}} onPress={recorderState.isRecording ? stopRecording : record}>
                <Text style={styles.buttonText}>{recorderState.isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
            </TouchableOpacity>
        </View>
    );
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
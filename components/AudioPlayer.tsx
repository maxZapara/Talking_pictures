import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native';
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

type AudioPlayerProps = {
    audioSource: string;
}

export default function AudioPlayer({audioSource}: AudioPlayerProps) {
  const player = useAudioPlayer(audioSource);
  const status = useAudioPlayerStatus(player);

  const togglePlay =async () => {
    if (status.playing) {
        player.pause();
        return;
    }
    
    await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: false,
    });
    player.volume = 1.0;
    player.seekTo(0);
    player.play();
  }



  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={togglePlay}>
        <Text style={styles.buttonText}>{status.playing ? "Stop" : "Play"}</Text>
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

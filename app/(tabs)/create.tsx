import React, { useState } from "react";
import ImagePickerExample from "../../components/ImagePicker";
import { Text, View, Image, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import AudioRecorder from "../../components/AudioRecorder";
import { AudioPicker } from "../../components/AudioPicker";
import AudioPlayer from "../../components/AudioPlayer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native-safe-area-context";
import SaveModal from "@/components/SaveModal";


export default function Index() {
  const [image, setImage] = useState<string | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const step= image ? 2:1;

  const handleImageSelected = (imagePath: string) => {
    setImage(imagePath);
  };

  const handleAudioSelected = (audioPath: string) => {
    setAudioUri(audioPath);
  }

  const handleCloseImage = () => {
    setImage(null);
    setAudioUri(null);
  }

  const handleSave = async () => {
        try {
            const data = {
                projectName: "Test",
                image,
                audioUri
            }

            await AsyncStorage.setItem("projects", JSON.stringify(data));

        } catch (e) {
            console.error("Error saving project: ", e);
        }
    }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar
              animated={true}
              barStyle="dark-content"
              showHideTransition="slide"
              hidden={false}
            />
      {step === 1 ? (
        <View>
          <Text style={styles.mainLabel}>Lets create new meme!</Text>
          <ImagePickerExample onImageSelected={handleImageSelected} />
        </View>
      ) : (
        <View>
          <View>
            <Text style={styles.previewLabel}>Your Picture:</Text>
            <View style={styles.imageBlock}>
              <TouchableOpacity onPress={handleCloseImage} style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>X</Text>
              </TouchableOpacity>
              <Image source={{ uri: image || "" }} style={styles.imagePreview} />
            </View>
          </View>

          {audioUri && <View style={{ padding: 20 }}> <AudioPlayer audioSource={audioUri} /> </View>}

          <View style={styles.flexContainer}>
            <AudioRecorder audioSelected={audioUri !== null} onRecordingComplete={handleAudioSelected} />
            <AudioPicker audioSelected={audioUri !== null} onAudioSelected={handleAudioSelected} />
          </View>

            {audioUri && image && (
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            )}

            <SaveModal visible={modalVisible} onClose={() => setModalVisible(false)} onSave={(name:string) => { }} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue"
  },

  mainLabel: {
    fontSize: 25,
    fontWeight: 600,
    marginBottom: 10,
    color: "black",
  },

  previewLabel: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 10,
    color: "darkgray",
  },

  imagePreview: {
    width: 380,
    height: 500,
    borderRadius: 10,
    backgroundColor: "white"
  },

  flexContainer: {
    width: '100%',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },

  imageBlock: {
    position: "relative",
    width: "100%"
  },

  cancelBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "darkred",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    top: -20,
    right: -10,
    zIndex: 50

  },
  cancelBtnText: {
    fontSize: 20,
    fontWeight: 600,
    color: "white",
  },
  button: {
        // flex: 1,
        backgroundColor: "purple",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: "center",
        minHeight: 40,
        marginHorizontal: 20

    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: 600
    }
})
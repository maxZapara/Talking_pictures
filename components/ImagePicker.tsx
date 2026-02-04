import { useState } from 'react';
import { Alert, Button, Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type ImagePickerExampleProps = {
    onImageSelected: (imagePath: string) => void;
}

export default function ImagePickerExample({onImageSelected}: ImagePickerExampleProps) {
  const pickImage = async (useCamera=false) => {
    if (useCamera) {
            const { granted } = await ImagePicker.requestCameraPermissionsAsync();
            if (!granted) {
                Alert.alert("Permission required", "Permission to access camera is required.");
                return;
            }
        } else {
            const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!granted) {
                Alert.alert('Permission required', 'Permission to access the media library is required.');
                return;
            }
        }

    let result = useCamera
            ? await ImagePicker.launchCameraAsync({
                quality: 1,
            })
            : await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images', 'videos'],
                // allowsEditing: true,
                // aspect: [4, 3],
                quality: 1,
            });

    console.log(result);

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
    }
  };

  const showOptions = () => {
    Alert.alert(
      'Choose image',
      'How would you like to select an image?',
      [
        { text: 'Choose from Gallery', onPress: () => pickImage(false) },
        { text: 'Take Photo', onPress: () => pickImage(true) },
        { text: 'Cancel', style: 'cancel' }
      ]
      
    )
};

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showOptions} style={styles.button}>
        <Text style={{ color: 'white' }}>Pick an image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
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
  
});

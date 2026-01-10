import { Text, TouchableOpacity } from "react-native";

export default function ImagePicker() {
    const handlePickerPress = () => {
        console.log('Image picker clicked');
    }

    return (
        <TouchableOpacity onPress={handlePickerPress}>
            <Text>Select Picture</Text>
        </TouchableOpacity>
    )
}
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  useEffect(() => {
    async function getProjects() {
      const projects = await AsyncStorage.getItem("projects");
      console.log("Projects: ", projects);
    }

    getProjects();
  });
  return (
    <SafeAreaView style={{backgroundColor: 'lightblue', flex: 1}}>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        showHideTransition="slide"
        hidden={false}
      />
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
}
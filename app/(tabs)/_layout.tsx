import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="house" color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create Project',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="edit" color={color} />,
        }}
      />
    </Tabs>
  );
}
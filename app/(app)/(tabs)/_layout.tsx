import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default () => {
    return (    
        // Layout for the home and profile tabs.
        <Tabs>
            <Tabs.Screen name="home" options={{ headerShown: false,tabBarIcon: ({color, size}) => (<Ionicons name="home-outline" size={24} color="black" />), }} />
            <Tabs.Screen name="profile" options={{ headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="person-outline" size={24} color="black" />),}} />
        </Tabs>
    )
}
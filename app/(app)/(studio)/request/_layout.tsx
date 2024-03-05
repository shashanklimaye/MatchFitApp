import { Stack } from "expo-router";

export default () => {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="RequestForm" options={{headerShown: true, headerBackButtonMenuEnabled: true}} />
            <Stack.Screen name="RequestFormLoading" options={{headerShown: true}} />
        </Stack>
    )
}
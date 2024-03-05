// Importing the Stack component from "expo-router"
import { Stack } from "expo-router";
 
// Define a functional component
export default () => {
    return (
        // Render a Stack component to organize screens
        <Stack>
            {/* Screen for setting up qualifications */}
            <Stack.Screen name="QualificationSetup" options={{ headerShown: true, title: 'Qualifications'}} />

            {/* Screen for setting up skills */}
            <Stack.Screen name="SkillSetup" options={{headerShown: true, title: 'Skills'}} />

            {/* Screen for setting up distance */}
            <Stack.Screen name="DistanceSetup" options={{headerShown: true}} />

            {/* Screen for setting up location */}
            <Stack.Screen name="LocationSetup" options={{headerShown: true, title: 'Location'}} />

            {/* Screen for setting up payment details */}
            <Stack.Screen name="PaymentSetup" options={{headerShown: true, title: 'Bank Details'}} />
        </Stack>
    )
}

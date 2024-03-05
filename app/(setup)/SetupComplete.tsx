import { View, Button, Text } from '../../components';
import { router } from 'expo-router';
import { useAuth } from '../../hooks/auth';

export default function SetupIntro() {

  const { logout } = useAuth();

  return (
    <View style="flex-1 items-center justify-center  bg-[#f5f3ef]">
      <View style="p-9 w-full max-w-sm">
          <Text>Setup Complete</Text>
          <Button label="Continue to login" onPress={() => logout()} />
      </View>
        
    </View>
      
  );
}
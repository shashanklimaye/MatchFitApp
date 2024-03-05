import { View, Button } from '../../../components'
import { Palette } from '../../../constants/enums';
import { useAuth } from '../../../hooks/auth';
import { SafeAreaView, Text } from 'react-native';

export default function SettingsPage() {
  const { logout } = useAuth();

  //Users can logout from their profile from this page.

  return (
      <View style="justify-center items-center h-full bg-slate-50">
          <Button palette={Palette.PRIMARY} label="Logout" onPress={() => logout()} />
      </View>
        
    
  )
}

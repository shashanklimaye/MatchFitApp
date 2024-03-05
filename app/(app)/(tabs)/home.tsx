import { Text, View, Button } from '../../../components';
import { router } from 'expo-router';
import { useAuth } from '../../../hooks/auth';
import { Palette, Role } from '../../../constants/enums';

export default function HomePage() {
  const { user } = useAuth();

  //Homepage, where instructors can accept shifts while studios can make shift requests.

  return (
    <View style="flex-1 items-center justify-center bg-slate-50">
      <View style="p-9 max-w-sm">
        { 
          user?.role == Role.Studio ? (

            <Button palette={Palette.PRIMARY} label="Create Request" onPress={() => router.push('/request/RequestForm')} />
          ) : null
        }
        { 
          user?.role == Role.Instructor ? (
            <View>
              <Button palette={Palette.SUCCESS} style="mb-2" label="Accept Request" onPress={() => router.replace('/')} />
              <Button palette={Palette.FAILURE} style="mb-2" label="Decline Request" onPress={() => router.replace('/')} />
            </View>
          ) : null
        }
        <Text></Text>
      </View>
    </View>
  )
}

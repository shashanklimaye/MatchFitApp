import { View, Text, Button } from '../../components'
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../hooks/auth';
import { trySetup } from '../../services/auth';

const register = async () => {
  //const { data, error } = trySetup();
  // not sure whether to do this as a token one or a non-token one
}

export default function PaymentSetup() {
  const { location, qualifications, skills, distance } = useLocalSearchParams();
  const { user } = useAuth();
 
  return (
    <View>
      <Text>This is where payment sign up will go.</Text>
      <Button label="Register" onPress={() => register()} />
    </View>     
  );
}
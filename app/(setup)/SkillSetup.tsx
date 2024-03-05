import { View, Button, Text } from '../../components';
import { useAuth } from '../../hooks/auth';
import { useState } from 'react';
import CustomCheckbox from '../../components/Checkbox';
import { router, useLocalSearchParams } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { SkillsSchema, Skills } from '../../schema'
import { ActivityIndicator } from 'react-native';
import { trySetup } from '../../services/auth';
import { useAtom } from 'jotai';
import { latitude, longitude, streetAddress, cpr, insurance, distance } from '../../constants/atom';
import { Qualifications } from '../../constants';


export default function SkillSetup() {
  // Initialize authentication hook
  const { user, logout } = useAuth();

  // Initialize state variables for skill checkboxes
  const [pilates, setPilates] = useState(false);
  const [bodyCombat, setBodyCombat] = useState(false);
  const [yoga, setYoga] = useState(false);
  const [hiit, setHiit] = useState(false);
  const [loading,setLoading] = useState(false);

  // Initialize jotai atoms for storing data
  const [latitudeData] = useAtom(latitude);
  const [longitudeData] = useAtom(longitude);
  const [streetAddressData] = useAtom(streetAddress);
  const [FirstAIDCPR] = useAtom(cpr);
  const [Insurance] = useAtom(insurance);
  const [radius] = useAtom(distance);

  // Initialize form control using react-hook-form
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SkillsSchema)
  });

  // Function to proceed to the next step
  const proceed = async () =>{
    let skills: string[] = [""]

    if(pilates){
      skills.push("pilates")
    }
    if(yoga){
      skills.push("yoga")
    }
    if(bodyCombat){
      skills.push("body-combat")
    }
    if(hiit){
      skills.push("hiit")
    }

    if(pilates || yoga || bodyCombat || hiit){
      skills.reverse();
      skills.pop();
    }

    setLoading(true);

    const qualifications: Qualifications = {
      hasFirstAidCPR : FirstAIDCPR,
      hasInsurance: Insurance,
      selectedRadius : radius,
      longitude: Number(longitudeData),
      latitude: Number(latitudeData),
      streetAddress: streetAddressData
    }

    const setup = await trySetup(user.username,user.token,user.role, null, qualifications, skills)

    if(setup ){
      router.push({pathname: '/SetupComplete'});
    }

    setLoading(false);
  }

  return (
    <View style="flex-1 items-center bg-[#f5f3ef]">
      <View style="p-9 w-full max-w-sm">
        <Text style="p-8 text-center text-2xl font-bold">Select your skills</Text>
      </View>
      <View style='flex-1'>
        {/* Checkbox for Pilates */}
        <CustomCheckbox
          label="Pilates"
          value={pilates}
          onValueChanged={(value) => setPilates(value)}
          // ...
        />
        {/* Checkbox for Body Combat */}
        <CustomCheckbox
          label="Body Combat"
          value={bodyCombat}
          onValueChanged={(value) => setBodyCombat(value)}
          // ...
        />
        {/* Checkbox for HIIT */}
        <CustomCheckbox
          label="HIIT"
          value={hiit}
          onValueChanged={(value) => setHiit(value)}
          // ...
        />
        {/* Checkbox for Yoga */}
        <CustomCheckbox
          label="Yoga"
          value={yoga}
          onValueChanged={(value) => setYoga(value)}
          // ...
        />
        {/* Button to complete setup */}
        <Button label='Complete' onPress={() => proceed()}></Button>
        {/* Loading indicator */}
        <ActivityIndicator animating={loading}></ActivityIndicator>
      </View>
    </View>
  );
}

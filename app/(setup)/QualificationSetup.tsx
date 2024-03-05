import { View, Button, Text } from '../../components'
import { useAuth } from '../../hooks/auth';
import { router, useLocalSearchParams } from 'expo-router';
import CustomCheckbox from '../../components/Checkbox';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { QualificationsSchema } from '../../schema'
import RNPickerSelect from 'react-native-picker-select';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform } from 'react-native';
import { trySetup } from '../../services/auth';
import { Qualifications } from '../../constants';
import { useAtom } from 'jotai';
import { distance, insurance, cpr, latitude, longitude, streetAddress } from '../../constants/atom';
import { LocationValidityResponse } from '../../schema/responses';

export default function QualificationSetup() {
  // Initialize authentication hook
  const { user, logout } = useAuth();

  // Initialize state variables using jotai atoms
  const [hasFirstAidCPR, setHasFirstAidCPR] = useAtom(cpr);
  const [hasInsurance, setHasInsurance] = useAtom(insurance);
  const [selectedRadius, setSelectedRadius] = useAtom(distance);

  // Initialize state variables for dropdown
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: '5 KM', value: 5},
    {label: '10 KM', value: 10},
    {label: '15 KM', value: 15},
    {label: '20 KM', value: 20}]
  );

  // Initialize form control using react-hook-form
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(QualificationsSchema)
  });

  // Function to proceed to the next step
  const proceed = async () => {
    router.push({ pathname: '/SkillSetup' });
  }
  
  return (
    <View style="flex-1 items-center bg-[#f5f3ef]">
      <Text style="p-8 text-center text-2xl font-bold">Qualification Set-Up</Text>
      
      {/* Checkbox for first aid/CPR */}
      <View style="p-9 w-full max-w-sm">
        <CustomCheckbox
          label="Do you have a first aid/CPR certificate?"
          value={hasFirstAidCPR}
          onValueChanged={(value) => setHasFirstAidCPR(value)}
          activeIconProps={{ name: 'checkmark', size: 24, color: 'white' }}
          buttonStyle={{
            width: 24,
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderWidth: 2,
            borderColor: 'black',
            backgroundColor: 'transparent',
          }}
          activeButtonStyle={{ backgroundColor: 'black' }}
        />

        {/* Next button */}
        <Button label="Next" onPress={() => router.push({ pathname: '/SkillSetup' })}  style='mb-5'/>
      </View>

      {/* Checkbox for insurance */}
      <View style="p-9 w-full max-w-sm">
        <CustomCheckbox
          label="Do you have insurance?"
          value={hasInsurance}
          onValueChanged={(value) => setHasInsurance(value)}
          activeIconProps={{ name: 'checkmark', size: 24, color: 'white' }}
          buttonStyle={{
            width: 24,
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderWidth: 2,
            borderColor: 'black',
            backgroundColor: 'transparent',
          }}
          activeButtonStyle={{ backgroundColor: 'black' }}
        />

        {/* Dropdown for distance selection */}
        <View style="p-9 w-full max-w-sm mt-3">
          <Text style='text-lg'>How far are you willing to travel?</Text>
          { Platform.OS == 'ios' && 
            <RNPickerSelect
              onValueChange={(value) => setSelectedRadius(value)}
              items={[
                { label: '5 KM', value: 5 },
                { label: '10 KM', value: 10 },
                { label: '15 KM', value: 15 },
                { label: '20 KM', value: 20 },
              ]}
              value={selectedRadius}
            />
          }
          {Platform.OS == 'android' && 
            <DropDownPicker
              open={open}
              value={selectedRadius}
              items={items}
              setOpen={setOpen}
              setValue={setSelectedRadius}
              setItems={setItems}
            />
          }
        </View>

        {/* Buttons for logout and next */}
        <View style='flex flex-row mt-5 justify-center'>
          <Button label="Logout" onPress={logout} style='mb-5'/>
          <Button label="Next" onPress={() =>proceed()}  style='mb-5'/>
        </View>
      </View>
    </View>
  );
}

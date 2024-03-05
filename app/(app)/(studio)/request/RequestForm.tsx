import { View, Text, TextField, Button } from '../../../../components'
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useAPI } from '../../../../hooks/api';
import { makeInstructorRequest } from '../../../../services/callout';
import { HttpMethod, Palette } from '../../../../constants/enums';
import { StudioCallout, StudioCalloutSchema, StudioLocation, User } from '../../../../schema';
import { FetchError } from '../../../../schema/responses';
import { ActivityIndicator, Platform, Pressable, ScrollView, TextInput } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from "twrnc";
import { REGISTER_ENDPOINT, REQUEST_ENDPOINT, STUDIO_LOCATION_ENDPOINT, USER_EXISTS_ENDPOINT } from '../../../../constants';
import DropDownPicker from 'react-native-dropdown-picker';
import { useAuth } from '../../../../hooks/auth';


export default function RequestFormPage() {

  const { makeRequest } = useAPI();
  const { user } = useAuth();

  const [locationID, setLocationID] = useState(0);
  const [locationStreetAddress, setLocationStreetAddress] = useState("Yoga");

  useEffect(() => {

    const query = async () => {
      const { data, error } = await makeRequest<User>(REGISTER_ENDPOINT + "/" + user.username, HttpMethod.GET);

      setLocationID(data.studioLocations[0].id);
      setLocationStreetAddress(data.studioLocations[0].streetAddress);
    }

    query();
  }, []);


  const[errorMessage,setErrorMessage] = useState("")
  const[loading,setLoading] = useState(false);

  const[date,setDate] = useState(new Date());
  const[androidDate,setAndroidDate] = useState('');

  const[showDateModal,setShowDateModal] = useState(false);


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Pilates', value: 'pilates'},
    {label: 'Yoga', value: 'yoga'},
    {label: 'Kick-Boxing', value: 'kickboxing'},
    {label: 'Body-Combat', value: 'bodycombat'}
  ]);

  const onChanged = ({type}, selectedDate) => {
    if(type == 'set'){
      const currentDate = selectedDate;
      setDate(currentDate);
      if(Platform.OS == 'android'){
        toggleDatePicker();
        setAndroidDate(currentDate.toLocaleString());
      }
    }
    else{
      toggleDatePicker();
    }
    
  };
  
  const toggleDatePicker = () => {
    setShowDateModal(!showDateModal);
  }

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(StudioCalloutSchema)
  });

  const proceed = async (data : StudioCallout) => {
    setLoading(true);

    data.studioLocationId = locationID;
    data.studioLocationAddress = locationStreetAddress;

    try{
      await makeRequest(REQUEST_ENDPOINT,HttpMethod.POST,data).then(response =>{
        if(response.error){
          setErrorMessage(response.error.message);
        }
      })
    }
    catch(e){
      setErrorMessage(e.message.toString());
    }
    finally{
      setLoading(false);
    }
    setLoading(false);
    
  }

  const test = async () => {

    const { data, error } = await makeRequest(REQUEST_ENDPOINT, HttpMethod.POST, {
      "id": 344,
      "instructorType": "pilates",
      "studioLocationId": locationID,
      "studioLocationAddress": locationStreetAddress,
      "note": "Respond asap.",
      "payrate": 32.0,
      "isClosed": false,
      "calloutDateTimes": ["2023-10-22T05:05:20.157Z"]
    });

    console.log(data);
    console.log(error);
  }

  /* Page. */

  return (
    <View style='justify-center items-center h-full'>
      <View style="flex-1 items-center justify-center bg-slate-50">
      <ScrollView>
        
      <View style="p-9 w-full max-w-sm">
        <Text style="p-8 text-center text-2xl font-bold">Create Request</Text>
        <View style="items-center">
          <View>
            
          <Text style='text-center'>Type of Intructor :</Text>
          <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              listMode="SCROLLVIEW"
              dropDownDirection="TOP"
            />
          </View>
          
            
            {Platform.OS === 'ios' && 
            <View style="flex flex-row items-center justify-center pt-5">
              <Text>Enter Date: </Text>
              <DateTimePicker mode='datetime' value={date} onChange={onChanged} minimumDate={new Date()}></DateTimePicker>
            </View>
            }
            {Platform.OS === 'android' &&
            <View style="flex flex-row items-center justify-center pt-5">
            <Text>Enter Date: </Text>
              <Pressable onPress={toggleDatePicker}>
                <TextInput style={tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} editable={false} placeholder='Select a date' value={androidDate}></TextInput>
                {showDateModal && <DateTimePicker value={date} onChange={onChanged} minimumDate={new Date()}></DateTimePicker>}
              </Pressable>
              </View>
            }
        </View>
        <Controller control={control} name="location" render={({ field: { onChange, value} }) => (
         <>
            <TextField value={locationStreetAddress} onValueChanged={onChange} placeholder='Enter Location' label='Location' />
            {errors.location && <Text style="text-red-500">{errors.location.message.toString()}</Text>}
         </>
        )}
       />
        <Controller control={control} name="payrate" render={({ field: { onChange, value} }) => (
         <>
            <TextField keyboardType={'number-pad'} value={value} onValueChanged={onChange} placeholder='Enter Pay Rate' label='Pay Rate' />
            {errors.payrate && <Text style="text-red-500">{errors.payrate.message.toString()}</Text>}
         </>
        )}
       />
        <Controller control={control} name="note" render={({ field: { onChange, value} }) => (
         <>
            <TextField value={value} onValueChanged={onChange} placeholder='Eg: class size 20, mic available' label='Note' />
            {errors.note && <Text style="text-red-500">{errors.note.message.toString()}</Text>}
         </>
        )}
       />
       <View style="flex flex-row items-center justify-center pt-5">
        
          <Button palette={Palette.PRIMARY} style="text-green-600 p-3 text-center" label="Submit" onPress={async () => await test()}/>
          <Button palette={Palette.SECONDARY} style="text-red-600 p-3 text-center" label="Cancel" onPress={() => router.push('/home')}/>
        </View>
        <Text>{errorMessage}</Text>
        <ActivityIndicator animating={loading}></ActivityIndicator>
      </View>
    
    </ScrollView>
    </View>
    </View>
  )
}

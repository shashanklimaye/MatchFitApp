import { router, useLocalSearchParams } from 'expo-router';
import { FormLayout } from '../../layouts';
import { View, Text, TextField, Button, ModalDialog } from '../../components'
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { StudioLocation, StudioLocationSchema } from '../../schema'
import { LocationValidityResponse } from '../../schema/responses';
import { LOCATION_VERIFICATION_ENDPOINT } from '../../constants';
import { useAPI } from '../../hooks/api';
import { HttpMethod } from '../../constants/enums';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { latitude, longitude, streetAddress } from '../../constants/atom';
import { trySetup } from '../../services/auth';
import { useNotifications } from '../../hooks/notification';

export default function LocationSetup() {

  // Initialize hooks and state variables
  const { makeRequest } = useAPI();
  const { user, logout } = useAuth();
  const params = useLocalSearchParams();
  const { role } = params;

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [latitudeData, setLatitudeData] = useAtom(latitude);
  const [longitudeData, setLongitudeData] = useAtom(longitude);
  const [streetAddressData, setStreetAddressData] = useAtom(streetAddress);

  // Initialize form control using react-hook-form
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(StudioLocationSchema)
  });

  // Function to handle location setup submission
  const proceed = async (submitted: StudioLocation) => {
    
    setLoading(true);
    try {

      // Make an API call to verify the location
      const { data, error } = await makeRequest<LocationValidityResponse>(LOCATION_VERIFICATION_ENDPOINT, HttpMethod.POST, {
        "regionCode": "AU",
        "locality": submitted.suburb,
        "addressLines" : [`${submitted.streetAddress}, ${submitted.suburb} ${submitted.state} ${submitted.postcode}`]
      });

      if(data && !error) {

        // Update latitude, longitude, and street address based on the response
        setLatitudeData(String(data.result.geocode.location.latitude));
        setLongitudeData(String(data.result.geocode.location.longitude));
        setStreetAddressData(String(data.result.address.formattedAddress));

        if(role === 'Instructor') {

          router.push({pathname: '/QualificationSetup'});    
            
        } else {      

          // Attempt to perform setup (not provided in this code snippet)
          const setup = await trySetup(user.username, user.token, user.role, data);

          if(setup) {    

            router.push({pathname: '/SetupComplete'});

          } else {

            console.log("Error")
          }   
        }
      } else {
        console.log(error.message)
        setErrorMessage(error.message)
      }
    } catch(e) {
      console.log(e)

    } finally{
      setLoading(false)
    }
  }

  return (  
    <View style="m-9">
      {/* Render the form layout */}
      <FormLayout nextFunction={handleSubmit(async (data) => proceed(data))} nextText="Next">
        
        {/* Render a logout button */}
        <Button label="Logout" onPress={() => logout()} />

        {/* Render input fields for street address, suburb, postcode, and state */}
        <Controller control={control} rules={{ required: true }} name="streetAddress" render={({ field: { onChange, value} }) => (
            <TextField label="Street Address" value={value} onValueChanged={onChange} />
          )}
        />
        <Controller control={control} rules={{ required: true }} name="suburb" render={({ field: { onChange, value} }) => (
            <TextField label="City / Suburb" value={value} onValueChanged={onChange} />
          )}
        />
        <Controller control={control} rules={{ required: true }} name="postcode" render={({ field: { onChange, value} }) => (
            <TextField label="ZIP" value={value} onValueChanged={onChange} />
          )}
        />
        <Controller control={control} rules={{ required: true }} name="state" render={({ field: { onChange, value} }) => (
            <TextField label="State" value={value} onValueChanged={onChange} />
          )}
        />

        {/* Render error messages for each input field */}
        {errors.streetAdress && <Text>Streetaddress error</Text>}
        {errors.suburb && <Text>Suburb error</Text>}
        {errors.postcode && <Text>Postcode error</Text>}
        {errors.state && <Text>State error</Text>}

        {/* Render loading indicator */}
        <ActivityIndicator animating={loading}></ActivityIndicator>

        {/* Render error message */}
        <Text>{errorMessage}</Text>
      </FormLayout>
    </View>
  );
}

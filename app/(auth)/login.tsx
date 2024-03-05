//Importing neccessary packages.
import { useAuth } from '../../hooks/auth';
import { TextField, Image, View, Button, Text } from '../../components';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Login, LoginSchema } from '../../schema'
import { Children, useState } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { Palette } from '../../constants/enums';
import { AntDesign } from '@expo/vector-icons';

export default function Page() {

  // Initialize the authentication hook and state variables
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize the form control using react-hook-form
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(LoginSchema)
  });

  // Function to handle the form submission
  const proceed = async (data : Login) => {

    setLoading(true);

    try {
      // Call the login function from the authentication hook
      await login(data.username, data.password)
      .then(response => {
        if(response.message){
          setErrorMessage(response.message);
        }
      })
    } catch(e) {
      // Handle any errors that occur during login
      setErrorMessage(e.message.toString());
    } finally {
      setLoading(false);
    }  
  }
  
  return (
    // Render the main UI components
    <View style="flex-1 items-center justify-center  bg-[#f5f3ef]">
      <View style="p-9 w-full max-w-sm">
        <Image source={require('../../assets/108-yoga-road-yoga-shop-logo.png')}/>
        <Text style="p-8 text-center text-2xl font-bold">Match Fit</Text>

        {/* Render the email input field */}
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value} }) => (
            <>
              <TextField value={value} onValueChanged={onChange} placeholder='Email' label='Email' />
              {errors.username && <Text style="text-red-500">{errors.username.message.toString()}</Text>}
            </>
          )}
        />

        {/* Render the password input field */}
        <Controller 
          control={control} 
          name="password"
          render={({ field: { onChange, value} }) => (
            <>
              <TextField value={value} onValueChanged={onChange} placeholder='Password' label='Password' isPassword />
              {errors.password && <Text style="text-red-500">{errors.password.message.toString()}</Text>}
            </>
          )}
        />

        {/* Render the submit button */}
        <View style='p-2 items-center'>
          <Pressable onPress={handleSubmit(async (data) => await proceed(data))}>
            <AntDesign name="arrowright" size={30} color="black" />
          </Pressable>
        </View>
        
        {/* Render loading indicator */}
        <ActivityIndicator animating={loading}></ActivityIndicator>

        {/* Render error message */}
        <Text style="text-red-500">{errorMessage}</Text>

        <View style="grow" />
        
        {/* Render the link to the registration page */}
        <View style="flex flex-row items-center justify-center pt-2">
          <Text>Don't have an account? </Text>
          <Button palette={Palette.PRIMARY} style="text-blue-500" label="Join" onPress={() => router.push('/register')} />
        </View>
      </View>
    </View>
  );
}

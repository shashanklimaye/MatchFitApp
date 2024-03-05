import { router } from 'expo-router';
import { View, TextField, Button, Text, Radio } from '../../components';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Role } from '../../constants/enums'
import { tryRegister } from '../../services/auth';
import { useAuth } from '../../hooks/auth';
import { Account, AccountSchema } from '../../schema'
import { ActivityIndicator, Pressable } from 'react-native';
import { useState } from 'react';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import { useNotifications } from '../../hooks/notification';

 // Initialize authentication hook and notification token hook
export default function RegisterPage() {
  const { login } = useAuth();
  const { notificationToken } = useNotifications();

  // Initialize state variables
  const[loading,setLoading] = useState(false);
  const[errorMessage,setErrorMessage] = useState("");

   // Initialize form control using react-hook-form
  const { control, watch, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(AccountSchema)
  });

   // Watch for changes in the selected role
  const role : Role = useWatch({ control, name: "role"})

  // Function to handle form submission
  const proceed = async (submitted: Account) => {


    setLoading(true);
    try{
       // Attempt to register the user
      const { data, error } = await tryRegister(submitted.username, submitted.password, submitted.firstName, submitted.surname, submitted.role);

    if(data && !error)

    {
       // If registration is successful, automatically log in the user
      login(submitted.username, submitted.password);
    }
    }
    catch(e){
       // Handle any errors that occur during registration
      setErrorMessage(e.message.toString());
    }
    finally{
      setLoading(false);
    }
    
  }
  
  return (
    <View style="flex-1 items-center justify-center bg-[#f5f3ef]">
      <View style="p-9 w-full max-w-sm">
        <Text style="p-2 text-center text-2xl font-bold">I am a: </Text>
        <Controller control={control} rules={{ required: true }} name="role"
          render={({ field: { onChange, value} }) => (
              <Radio<Role> label="" value={value} onValueChanged={onChange} options={[
                { id: 1, option: Role.Instructor, label: "Instructor", sublabel: "Teach for a little extra cash."},
                { id: 2, option: Role.Studio, label: "Studio", sublabel: "Find last minute covers."},
              ]} />
            )}
          />
        <View>
          <Controller control={control} rules={{ required: true }} name="firstName"
          render={({ field: { onChange, value} }) => (
            <>
            <TextField value={value} onValueChanged={onChange} placeholder='First Name' label='First Name' />

            {errors.firstName && <Text style="text-red-500 text-center">{errors.firstName.message.toString()}</Text>}

            </>
            )}
          />
          
          <Controller control={control} rules={{ }} name="surname" disabled={watch("role") != Role.Instructor}
          render={({ field: { onChange, value} }) => (
            <>
          
              <TextField value={value} onValueChanged={onChange} placeholder='Surname' label='Surname' />

              {errors.surname && <Text style="text-red-500 text-center">{errors.surname.message.toString()}</Text>}

            </>
            )}
          />
        </View>
        <Controller control={control} rules={{ required: true }} name="username"
          render={({ field: { onChange, value} }) => (
            <>
            
            <TextField value={value} onValueChanged={onChange} placeholder='Username' label='Username' />

            {errors.username && <Text style="text-red-500 text-center">{errors.username.message.toString()}</Text>}

            </>
          )}
        />
        <Controller control={control} rules={{ required: true }} name="password"
          render={({ field: { onChange, value} }) => (
            <>
            <TextField value={value} onValueChanged={onChange} placeholder='Password' label='Password' isPassword={true} />

            {errors.password && <Text style="text-red-500 text-center">{errors.password.message.toString()}</Text>}
            </>
          )}
        />
        <View style="flex flex-row  items-center justify-evenly pt-3">
          <Pressable onPress={handleSubmit(async (data) => proceed(data))} >
            <AntDesign name="arrowright" size={30} color="black" />
          </Pressable>
          {/* <Button style="text-green-600 p-3" label="Next" onPress={handleSubmit(async (data) => proceed(data))} />  */}
        </View>

        <View style="flex flex-row  items-center justify-center pt-5">
          <Text>Already have an Account? </Text>
          <Button style="text-blue-500 rounded-full" label='Sign-in' onPress={() => router.replace('/login')}></Button>
          <ActivityIndicator animating={loading}></ActivityIndicator>
        </View>
        <Text style="text-red-500">{errorMessage}</Text>   
      </View>
    </View>  
  );
}
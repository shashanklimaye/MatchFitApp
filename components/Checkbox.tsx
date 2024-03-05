import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native'
import CustomView from './View';
import CustomText from './Text';
import { Ionicons } from '@expo/vector-icons';

interface CustomCheckboxProps {

}

const CustomCheckbox = ({ value, label, onValueChanged, buttonStyle = {}, activeButtonStyle = {}, inactiveButtonStyle = {}, activeIconProps = {}, inactiveIconProps = {},}) => {
  const iconProps = value ? activeIconProps : inactiveIconProps;

  return (
    <CustomView style='items-center m-5'>
      <CustomText style='text-lg'>{label}</CustomText>
      <Pressable
      style={[
        buttonStyle,
        value
          ? activeButtonStyle
          : inactiveButtonStyle,
      ]}
      onPress={() => onValueChanged(!value)}>
      {value && (
        <Ionicons
          name="checkmark"
          size={24}
          color="white"
          {...iconProps}
        />
      )}
    </Pressable>
    </CustomView>
    
    
  );
}


const styles = StyleSheet.create({
    checkboxBase: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderWidth: 2,
      borderColor: 'blue',
      backgroundColor: 'transparent',
    },
    checkboxChecked: {
      backgroundColor: 'blue',
    },
    appContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    appTitle: {
      marginVertical: 16,
      fontWeight: 'bold',
      fontSize: 24,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkboxLabel: {
      marginLeft: 8,
      fontWeight: 500,
      fontSize: 18,
    },
  });

export default CustomCheckbox;

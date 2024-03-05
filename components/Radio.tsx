import { View, Pressable, PressableProps, Text, TextProps } from "react-native";
import tw from 'twrnc'

interface CustomRadioProps<T> {
    label: string,
    value: T,
    onValueChanged: (value: T) => void,
    options: Array<CustomRadioOptionProps<T>>
}

interface CustomRadioOptionProps<T> {
    id?: number,
    label?: string, 
    sublabel?: string,
    option?: T,
    selected?: boolean
}

function CustomRadioGroup<T>({ label, value, onValueChanged, options, }: CustomRadioProps<T>) {

    const CustomRadioOption = ({ label, sublabel, option,selected }: CustomRadioOptionProps<T>) => {
        return (

            <Pressable style={tw.style("items-center bg-white rounded-full dark:border-gray-700", { 'bg-blue-500' : option == value,marginVertical: 6 })} onPress={() => update(option)}>
                <Text style={tw.style("w-full p-3 text-sm text-center font-medium text-gray-900 dark:text-gray-300",{'text-white': option==value})}>{label}</Text>

                <Text style={tw.style("",{'text-white': option==value})}>{sublabel}</Text>
            </Pressable>
        );
    }

    const update = (updatedValue: T) => {

        this.value = updatedValue;
        onValueChanged(updatedValue);
    }

    return (
      <View>
        <Text>{label}</Text>
        <View>
        {options.map((option) => {
            return (
                <CustomRadioOption label={option.label} sublabel={option.sublabel} option={option.option} key={option.id}  />
            )
        })}
        </View>
      </View>
    )
}


    
export default CustomRadioGroup;
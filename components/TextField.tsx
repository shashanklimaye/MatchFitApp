
import { View, ViewProps, Text, TextProps, TextInput, TextInputProps } from "react-native";
import { Palette } from "../constants/enums";
import tw from "twrnc";

type CustomTextFieldProps = {
    label: string,
    palette?: Palette,
    placeholder?: string,
    isPassword?: boolean,
    keyboardType?: string,
    readonly ?: boolean,
    value?: TextInputProps["value"],
    onValueChanged?: TextInputProps["onChangeText"],
};

const CustomTextField = ({ label,readonly,value,keyboardType, isPassword, onValueChanged, placeholder, palette = Palette.PRIMARY }: CustomTextFieldProps) => {

    //const [text, setText] = useState();

    return (
        <View>
            <Text style={tw`mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white`}>{label}</Text>

            <TextInput autoCapitalize={"none"} value={value} placeholder={placeholder} secureTextEntry={isPassword} onChangeText={onValueChanged} style={tw`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />

        </View>
    )
}

export default CustomTextField;
import { Text, TextProps } from "react-native";
import tw from 'twrnc';

interface CustomTextProps {
    style?: string
    children?: TextProps["children"]
}

const CustomText = ({style, children , ...props}: CustomTextProps) => {
    return (
        <Text style={tw`${style}`}>{children}</Text>
    )
}

export default CustomText;
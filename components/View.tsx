import { View, ViewProps } from "react-native";
import tw from 'twrnc';

interface CustomViewProps {
    style?: string
    children?: ViewProps["children"]
}

const CustomView = ({style, children, ...props}: CustomViewProps) => {
    return (
        <View style={tw`${style}`}>{children}</View>
    )
}

export default CustomView;
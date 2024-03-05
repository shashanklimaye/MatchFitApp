import { Image, ImageProps, View, ViewProps } from "react-native";
import tw from "twrnc";

interface CustomImageProps {
    source?: ImageProps["source"];
    style?: string
};

const CustomImage = ({ source }: CustomImageProps) => {
    return (
        <View>
            <Image source={source} style={{width:300 ,height:300, alignContent: 'center' }} />
        </View>    
    )
}

export default CustomImage;
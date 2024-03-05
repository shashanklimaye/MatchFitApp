import { Pressable, PressableProps, Text, TextProps } from "react-native";
import { TextColourPalette, BackgroundColourPalette, BorderColorPalette } from "../constants/palette";
import { Palette } from "../constants/enums";
import tw from 'twrnc';

type CustomButtonProps = {
    palette?: Palette
    style?: string,
    label?: string,
    icon?: string,
    onPress?: PressableProps["onPress"]
}
  
function Button({ style, onPress, label, icon, palette = Palette.PRIMARY }: CustomButtonProps) {
  return (
    <Pressable style={tw.style("py-3 m-4 px-5 text-sm rounded-full font-medium focus:ring-4 border", style, BackgroundColourPalette[palette], BorderColorPalette[palette])} onPress={(onPress)}>
      { icon ? (<Text>ICON</Text>) : null }
      { label ? (<Text style={tw.style("text-center", TextColourPalette[palette])}>{label}</Text>) : null }
    </Pressable>
  )
}
  
export default Button;
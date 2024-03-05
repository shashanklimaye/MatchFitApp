import { Button } from "../components";
import { View, ViewProps } from "react-native";
import { Palette } from "../constants/enums";

type CustomFormLayoutProps = {
    palette?: Palette,
    nextText?: string,
    previousText?: string,
    nextFunction?: Function,
    previousFunction?: Function,
    children: ViewProps["children"]
}

function FormLayout({ children, nextText, previousText, nextFunction, previousFunction, palette = Palette.PRIMARY }: CustomFormLayoutProps) {
    return (
        <View>
            <Button label={previousText} onPress={() => previousFunction()} />
            { children }
            <Button label={nextText} onPress={() => nextFunction()} />
        </View>
    )
  }
    
  export default FormLayout;
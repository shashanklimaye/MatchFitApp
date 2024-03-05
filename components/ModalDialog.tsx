import { View, ViewProps } from "react-native";
import tw from 'twrnc';

interface CustomModalDialogProps extends ViewProps {
  children: ViewProps["children"]
}
  
function CustomModalDialog({ children }: CustomModalDialogProps) {
  return (
    <View style={tw`flex `}>
      {children}
    </View>
  )
}
  
export default CustomModalDialog;
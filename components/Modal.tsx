import { View, ViewProps } from "react-native";
import tw from 'twrnc';

interface CustomModalProps extends ViewProps {
  children: ViewProps["children"]
}
  
function CustomModal({ children }: CustomModalProps) {
  return (
    <View style={tw`flex `}>
      {children}
    </View>
  )
}
  
export default CustomModal;
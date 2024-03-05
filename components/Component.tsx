import { View, ViewProps } from 'react-native'
import { Palette } from '../constants/enums';

export interface ComponentProps extends ViewProps {
    children: ViewProps["children"],
    palette: Palette
}
  
export const Component = ({ children }: ComponentProps) => {
  return (
    <View>
        {children}
    </View>
  )
}
import { MutableRefObject } from 'react';
import BottomSheet, { BottomSheetRefProps } from './BottomSheet';
import tw from 'twrnc';

interface CustomPickerProps {
  ref: MutableRefObject<BottomSheetRefProps>
}
  
function CustomPicker({ ref }: CustomPickerProps) {
  return (
    <BottomSheet ref={ref}>
      
    </BottomSheet>
  )
}
  
export default CustomPicker;
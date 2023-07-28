// src/components/GenderPicker.tsx
import React from 'react';
import { Picker } from '@react-native-picker/picker';

type GenderPickerProps = {
  selectedValue: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
};

const GenderPicker: React.FC<GenderPickerProps> = ({ selectedValue, onValueChange }) => {
  return (
    <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
      <Picker.Item label="Male" value="Male" />
      <Picker.Item label="Female" value="Female" />
      <Picker.Item label="Other" value="Other" />
    </Picker>
  );
};

export default GenderPicker;

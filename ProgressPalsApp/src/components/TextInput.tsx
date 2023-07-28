// src/components/TextInput.tsx
import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';

type TextInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

const TextInput: React.FC<TextInputProps> = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <RNTextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 10,
  },
});

export default TextInput;

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
type CustomInputProps = { 
value: string;
onChangeText: (text: string) => void;
placeholder?: string;
keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
secureTextEntry?: boolean;
}
export default function CustomInput({
value,
onChangeText,placeholder,keyboardType = 'default', secureTextEntry = false,
}: CustomInputProps) {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  );
}
  
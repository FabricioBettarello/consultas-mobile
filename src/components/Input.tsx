/**
 * Input - campo de formulário reutilizável (modelo da aula de separação de estilos).
 *
 * Lógica e JSX apenas; estilos em src/styles/input.styles.ts.
 */

import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { styles } from '../styles/input.styles';

type InputProps = TextInputProps & {
  label: string;
  error?: string;
};

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor="#999"
        {...props}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

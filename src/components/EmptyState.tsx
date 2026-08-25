/**
 * EmptyState - estado vazio com ícone (emoji) e mensagem personalizada.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme';

type EmptyStateProps = {
  icone?: string;
  mensagem: string;
};

export default function EmptyState({ icone = '📭', mensagem }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icone}>{icone}</Text>
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  icone: {
    fontSize: 56,
    marginBottom: 16,
  },
  mensagem: {
    fontSize: 16,
    color: cores.textoSecundario,
    textAlign: 'center',
    lineHeight: 22,
  },
});

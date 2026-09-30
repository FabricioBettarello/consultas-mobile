/**
 * EmptyState - estado vazio com ícone (emoji) e mensagem personalizada.
 *
 * Estilos em src/styles/emptyState.styles.ts.
 */

import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/emptyState.styles';

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

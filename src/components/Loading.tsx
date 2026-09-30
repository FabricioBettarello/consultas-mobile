/**
 * Loading - indicador de carregamento centralizado com mensagem opcional.
 *
 * Estilos em src/styles/loading.styles.ts.
 */

import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { cores } from '../theme';
import { styles } from '../styles/loading.styles';

type LoadingProps = {
  mensagem?: string;
};

export default function Loading({ mensagem }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={cores.primaria} />
      {mensagem ? <Text style={styles.texto}>{mensagem}</Text> : null}
    </View>
  );
}

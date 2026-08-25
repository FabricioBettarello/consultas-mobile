/**
 * Loading - indicador de carregamento centralizado com mensagem opcional.
 */

import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cores.fundo,
    padding: 24,
  },
  texto: {
    marginTop: 12,
    fontSize: 15,
    color: cores.textoSecundario,
  },
});

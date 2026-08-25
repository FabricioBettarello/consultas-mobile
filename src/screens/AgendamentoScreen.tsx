/**
 * AgendamentoScreen - ponto de entrada do fluxo de agendamento.
 *
 * Mantida como rota separada da navegação; encaminha o usuário para o
 * formulário de nova consulta.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { cores } from '../theme';

type AgendamentoScreenProps = {
  navigation: any;
};

export default function AgendamentoScreen({ navigation }: AgendamentoScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icone}>🗓️</Text>
      <Text style={styles.titulo}>Agendamento</Text>
      <Text style={styles.texto}>
        Marque uma nova consulta escolhendo especialidade, médico, data e horário.
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('NovaConsulta')}
      >
        <Text style={styles.botaoTexto}>Iniciar agendamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  icone: { fontSize: 64, marginBottom: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: cores.texto, marginBottom: 8 },
  texto: {
    fontSize: 15,
    color: cores.textoSecundario,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  botao: {
    backgroundColor: cores.primaria,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  botaoTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 16 },
});

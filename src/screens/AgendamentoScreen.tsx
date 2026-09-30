/**
 * AgendamentoScreen - ponto de entrada do fluxo de agendamento.
 *
 * Mantida como rota separada da navegação; encaminha o usuário para o
 * formulário de nova consulta.
 *
 * Estilos em src/styles/agendamento.styles.ts.
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/agendamento.styles';

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

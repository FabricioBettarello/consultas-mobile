/**
 * PressaoArterialScreen - Monitor de Pressão Arterial (simulação IoT).
 *
 * Classifica a medição e, em caso de crise hipertensiva (Estágio 3),
 * oferece criar uma consulta de EMERGÊNCIA com o cardiologista
 * (Dr. Roberto Silva / medicoId 1). Essa consulta entra marcada como
 * emergência/prioridade e passa a aparecer no topo da agenda do médico.
 *
 * Estilos em src/styles/pressaoArterial.styles.ts.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import consultasService from '../services/consultasService';
import { cores } from '../theme';
import { styles } from '../styles/pressaoArterial.styles';

type PressaoArterialScreenProps = {
  navigation: any;
};

type Classificacao = {
  rotulo: string;
  cor: string;
  estagio3: boolean;
};

function classificar(sis: number, dia: number): Classificacao {
  if (sis >= 180 || dia >= 120) {
    return { rotulo: 'Crise Hipertensiva (Estágio 3)', cor: cores.erro, estagio3: true };
  }
  if (sis >= 140 || dia >= 90) {
    return { rotulo: 'Hipertensão Estágio 2', cor: '#ea580c', estagio3: false };
  }
  if (sis >= 130 || dia >= 80) {
    return { rotulo: 'Hipertensão Estágio 1', cor: cores.aviso, estagio3: false };
  }
  if (sis >= 120) {
    return { rotulo: 'Pressão Elevada', cor: '#ca8a04', estagio3: false };
  }
  return { rotulo: 'Pressão Normal', cor: cores.sucesso, estagio3: false };
}

export default function PressaoArterialScreen({
  navigation,
}: PressaoArterialScreenProps) {
  const { usuario } = useAuth();
  const [sistolica, setSistolica] = useState('');
  const [diastolica, setDiastolica] = useState('');
  const [resultado, setResultado] = useState<Classificacao | null>(null);

  function handleMedir() {
    const sis = Number(sistolica);
    const dia = Number(diastolica);

    if (!sis || !dia) {
      Alert.alert('Atenção', 'Informe a pressão sistólica e a diastólica.');
      return;
    }

    const classificacao = classificar(sis, dia);
    setResultado(classificacao);

    if (classificacao.estagio3) {
      Alert.alert(
        '🚨 Emergência detectada',
        'Pressão em nível de crise. Deseja criar uma consulta de emergência com o cardiologista?',
        [
          { text: 'Agora não', style: 'cancel' },
          { text: 'Criar emergência', onPress: criarEmergencia },
        ],
      );
    }
  }

  async function criarEmergencia() {
    if (!usuario) {
      Alert.alert('Erro', 'Usuário não identificado. Faça login novamente.');
      return;
    }

    const hoje = new Date();
    const dataISO = hoje.toISOString().slice(0, 10);

    try {
      await consultasService.criarConsulta({
        pacienteId: usuario.id,
        pacienteNome: usuario.nome,
        medicoId: 1,
        medicoNome: 'Dr. Roberto Silva',
        especialidade: 'Cardiologia',
        usuarioId: usuario.id,
        data: dataISO,
        horario: hoje.toTimeString().slice(0, 5),
        status: 'agendada',
        observacoes: `Emergência de pressão arterial (${sistolica}x${diastolica} mmHg)`,
        emergencia: true,
        prioridade: true,
      });

      Alert.alert(
        'Emergência registrada',
        'Uma consulta de emergência foi criada e enviada para a agenda do cardiologista.',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível registrar a emergência.');
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.icone}>🩺</Text>
      <Text style={styles.titulo}>Pressão Arterial</Text>
      <Text style={styles.subtitulo}>Registre sua medição (mmHg)</Text>

      <View style={styles.linha}>
        <View style={styles.campo}>
          <Text style={styles.label}>Sistólica</Text>
          <TextInput
            style={styles.input}
            placeholder="120"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            maxLength={3}
            value={sistolica}
            onChangeText={setSistolica}
          />
        </View>
        <Text style={styles.separador}>×</Text>
        <View style={styles.campo}>
          <Text style={styles.label}>Diastólica</Text>
          <TextInput
            style={styles.input}
            placeholder="80"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            maxLength={3}
            value={diastolica}
            onChangeText={setDiastolica}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.botao} onPress={handleMedir}>
        <Text style={styles.botaoTexto}>Avaliar medição</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={[styles.resultado, { borderColor: resultado.cor }]}>
          <Text style={[styles.resultadoTexto, { color: resultado.cor }]}>
            {resultado.rotulo}
          </Text>
          {resultado.estagio3 && (
            <TouchableOpacity style={styles.emergenciaBotao} onPress={criarEmergencia}>
              <Text style={styles.emergenciaTexto}>
                🚨 Criar consulta de emergência
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ScrollView>
  );
}

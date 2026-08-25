/**
 * PressaoArterialScreen - Monitor de Pressão Arterial (simulação IoT).
 *
 * Classifica a medição e, em caso de crise hipertensiva (Estágio 3),
 * oferece criar uma consulta de EMERGÊNCIA com o cardiologista
 * (Dr. Roberto Silva / medicoId 1). Essa consulta entra marcada como
 * emergência/prioridade e passa a aparecer no topo da agenda do médico.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import consultasService from '../services/consultasService';
import { cores } from '../theme';

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  content: { padding: 24, alignItems: 'center' },
  icone: { fontSize: 56, marginTop: 16, marginBottom: 8 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: cores.texto },
  subtitulo: { fontSize: 14, color: cores.textoSecundario, marginBottom: 24 },
  linha: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
  campo: { flex: 1, maxWidth: 140 },
  label: { fontSize: 13, color: cores.textoSecundario, marginBottom: 6 },
  input: {
    backgroundColor: cores.card,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 22,
    textAlign: 'center',
    color: cores.texto,
  },
  separador: { fontSize: 24, color: cores.textoSecundario, paddingBottom: 12 },
  botao: {
    backgroundColor: cores.primaria,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 28,
  },
  botaoTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 16 },
  resultado: {
    marginTop: 28,
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    backgroundColor: cores.card,
  },
  resultadoTexto: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  emergenciaBotao: {
    marginTop: 16,
    backgroundColor: cores.erro,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  emergenciaTexto: { color: cores.branco, fontWeight: 'bold' },
});

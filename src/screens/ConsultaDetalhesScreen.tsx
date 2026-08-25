/**
 * ConsultaDetalhesScreen - Detalhes de uma consulta com ações por perfil.
 *
 * - Verifica permissão via consultasService.obterConsulta (admin/médico/paciente).
 * - Paciente/Médico: podem confirmar/cancelar quando o status permite.
 * - Admin: pode marcar como realizada e deletar.
 */

import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import consultasService from '../services/consultasService';
import { Consulta } from '../interfaces/consulta';
import { Loading } from '../components';
import { cores, coresStatus } from '../theme';
import { dataParaBR } from '../utils/masks';

type ConsultaDetalhesScreenProps = {
  navigation: any;
  route: { params: { consultaId: number } };
};

const rotuloStatus: Record<string, string> = {
  agendada: 'Agendada',
  confirmada: 'Confirmada',
  cancelada: 'Cancelada',
  realizada: 'Realizada',
};

export default function ConsultaDetalhesScreen({
  navigation,
  route,
}: ConsultaDetalhesScreenProps) {
  const { consultaId } = route.params;
  const { usuario, isAdmin, isMedico } = useAuth();
  const [consulta, setConsulta] = useState<Consulta | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [consultaId]),
  );

  async function carregar() {
    setLoading(true);
    try {
      const dados = await consultasService.obterConsulta(
        consultaId,
        usuario?.id,
        isAdmin(),
        isMedico(),
        usuario?.medicoId,
      );
      setConsulta(dados);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível carregar a consulta', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function executar(acao: () => Promise<unknown>, sucesso: string) {
    try {
      await acao();
      Alert.alert('Sucesso', sucesso);
      carregar();
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Operação não permitida');
    }
  }

  function handleConfirmar() {
    executar(
      () =>
        consultasService.confirmarConsulta(
          consultaId,
          usuario?.id,
          isAdmin(),
          isMedico(),
          usuario?.medicoId,
        ),
      'Consulta confirmada!',
    );
  }

  function handleCancelar() {
    Alert.alert('Cancelar Consulta', 'Deseja realmente cancelar?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim, cancelar',
        style: 'destructive',
        onPress: () =>
          executar(
            () =>
              consultasService.cancelarConsulta(
                consultaId,
                usuario?.id,
                isAdmin(),
                isMedico(),
                usuario?.medicoId,
              ),
            'Consulta cancelada',
          ),
      },
    ]);
  }

  function handleRealizar() {
    executar(
      () => consultasService.realizarConsulta(consultaId, isAdmin()),
      'Consulta marcada como realizada',
    );
  }

  function handleDeletar() {
    Alert.alert('Deletar Consulta', 'Esta ação não pode ser desfeita.', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Deletar',
        style: 'destructive',
        onPress: async () => {
          try {
            await consultasService.deletarConsulta(consultaId, isAdmin());
            Alert.alert('Sucesso', 'Consulta deletada', [
              { text: 'OK', onPress: () => navigation.goBack() },
            ]);
          } catch (error: any) {
            Alert.alert('Erro', error.message || 'Não foi possível deletar');
          }
        },
      },
    ]);
  }

  if (loading || !consulta) {
    return <Loading mensagem="Carregando detalhes..." />;
  }

  const corStatus = coresStatus[consulta.status] ?? cores.textoSecundario;
  const podeConfirmar = consulta.status === 'agendada';
  const podeCancelar =
    consulta.status === 'agendada' || consulta.status === 'confirmada';
  const podeRealizar = isAdmin() && consulta.status === 'confirmada';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {consulta.emergencia && (
        <View style={styles.emergenciaBanner}>
          <Text style={styles.emergenciaTexto}>🚨 Consulta de emergência</Text>
        </View>
      )}

      <View style={styles.card}>
        <View style={[styles.badge, { backgroundColor: corStatus }]}>
          <Text style={styles.badgeTexto}>
            {rotuloStatus[consulta.status] ?? consulta.status}
          </Text>
        </View>

        <Linha rotulo="Médico" valor={consulta.medicoNome} />
        <Linha rotulo="Especialidade" valor={consulta.especialidade} />
        <Linha rotulo="Paciente" valor={consulta.pacienteNome} />
        <Linha rotulo="Data" valor={dataParaBR(consulta.data)} />
        <Linha rotulo="Horário" valor={consulta.horario} />
        {consulta.valor != null && (
          <Linha rotulo="Valor" valor={`R$ ${consulta.valor.toFixed(2)}`} />
        )}
        {consulta.observacoes ? (
          <Linha rotulo="Observações" valor={consulta.observacoes} />
        ) : null}
      </View>

      <View style={styles.acoes}>
        {podeConfirmar && (
          <TouchableOpacity
            style={[styles.botao, { backgroundColor: cores.sucesso }]}
            onPress={handleConfirmar}
          >
            <Text style={styles.botaoTexto}>Confirmar</Text>
          </TouchableOpacity>
        )}
        {podeCancelar && (
          <TouchableOpacity
            style={[styles.botao, { backgroundColor: cores.erro }]}
            onPress={handleCancelar}
          >
            <Text style={styles.botaoTexto}>Cancelar</Text>
          </TouchableOpacity>
        )}
        {podeRealizar && (
          <TouchableOpacity
            style={[styles.botao, { backgroundColor: cores.primaria }]}
            onPress={handleRealizar}
          >
            <Text style={styles.botaoTexto}>Marcar como realizada</Text>
          </TouchableOpacity>
        )}
        {isAdmin() && (
          <TouchableOpacity
            style={[styles.botao, styles.botaoDeletar]}
            onPress={handleDeletar}
          >
            <Text style={styles.botaoTexto}>Deletar</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View style={styles.linha}>
      <Text style={styles.linhaRotulo}>{rotulo}</Text>
      <Text style={styles.linhaValor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  content: { padding: 16 },
  emergenciaBanner: {
    backgroundColor: cores.erro,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  emergenciaTexto: { color: cores.branco, fontWeight: 'bold' },
  card: {
    backgroundColor: cores.card,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 16,
  },
  badgeTexto: { color: cores.branco, fontWeight: '600', fontSize: 13 },
  linha: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 12,
  },
  linhaRotulo: { fontSize: 13, color: cores.textoSecundario, marginBottom: 2 },
  linhaValor: { fontSize: 16, color: cores.texto, fontWeight: '500' },
  acoes: { marginTop: 20, gap: 10 },
  botao: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoDeletar: {
    backgroundColor: '#8b0000',
  },
  botaoTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 15 },
});

/**
 * MinhasConsultasScreen - Lista de consultas do paciente logado.
 *
 * Filtra por usuarioId via consultasService e permite agendar uma nova consulta.
 * Recarrega ao ganhar foco (useFocusEffect), então uma nova consulta aparece
 * automaticamente ao voltar do agendamento.
 */

import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import consultasService from '../services/consultasService';
import { Consulta } from '../interfaces/consulta';
import { ConsultaCard, Loading, EmptyState } from '../components';
import { cores } from '../theme';

type MinhasConsultasScreenProps = {
  navigation: any;
};

export default function MinhasConsultasScreen({
  navigation,
}: MinhasConsultasScreenProps) {
  const { usuario } = useAuth();
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [usuario?.id]),
  );

  async function carregar() {
    setLoading(true);
    try {
      const dados = await consultasService.listarConsultas(usuario?.id);
      setConsultas(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as consultas');
    } finally {
      setLoading(false);
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    await carregar();
    setRefreshing(false);
  }

  async function handleCancelar(id: number) {
    Alert.alert('Cancelar Consulta', 'Deseja realmente cancelar?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim, cancelar',
        style: 'destructive',
        onPress: async () => {
          try {
            await consultasService.cancelarConsulta(id, usuario?.id);
            carregar();
          } catch (error: any) {
            Alert.alert('Erro', error.message || 'Erro ao cancelar');
          }
        },
      },
    ]);
  }

  if (loading) {
    return <Loading mensagem="Carregando suas consultas..." />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.novaButton}
        onPress={() => navigation.navigate('NovaConsulta')}
      >
        <Text style={styles.novaButtonTexto}>＋ Nova Consulta</Text>
      </TouchableOpacity>

      {consultas.length === 0 ? (
        <EmptyState
          icone="📭"
          mensagem="Você ainda não tem consultas. Toque em “Nova Consulta” para agendar."
        />
      ) : (
        <FlatList
          data={consultas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ConsultaCard
              consulta={item}
              onCancelar={() => handleCancelar(item.id)}
              onDetalhes={() =>
                navigation.navigate('ConsultaDetalhes', { consultaId: item.id })
              }
            />
          )}
          contentContainerStyle={styles.lista}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  novaButton: {
    backgroundColor: cores.primaria,
    margin: 16,
    marginBottom: 0,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  novaButtonTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 16 },
  lista: { padding: 16 },
});

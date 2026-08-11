/**
 * Tela de Lista de Consultas.
 *
 * Melhoria da aula de 05/05/2026: a lista é recarregada automaticamente
 * sempre que a tela ganha foco (useFocusEffect), e não apenas na montagem.
 * Assim, ao agendar uma nova consulta e voltar, a lista já aparece atualizada
 * sem precisar reiniciar o app.
 *
 * O carregamento usa useCallback com dependência de `usuario?.id`.
 */

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import type { ConsultasStackParamList } from '../navigation/types';
import { listarConsultas, type Consulta } from '../services/consultasService';
import { cores } from '../theme';
import { dataParaBR } from '../utils/masks';

type Navegacao = NativeStackNavigationProp<
  ConsultasStackParamList,
  'ConsultasList'
>;

export default function ConsultasListScreen() {
  const navigation = useNavigation<Navegacao>();
  const { usuario } = useAuth();

  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Carrega as consultas do usuário logado. Depende de usuario?.id: se o
  // usuário mudar, a função é recriada e o efeito recarrega os dados corretos.
  const carregarConsultas = useCallback(async () => {
    try {
      setCarregando(true);
      const lista = await listarConsultas(usuario?.id);
      setConsultas(lista);
    } finally {
      setCarregando(false);
    }
  }, [usuario?.id]);

  // useFocusEffect: dispara toda vez que a tela ganha foco (inclusive ao
  // voltar da tela de Nova Consulta), mantendo a lista sempre atualizada.
  useFocusEffect(
    useCallback(() => {
      carregarConsultas();
    }, [carregarConsultas]),
  );

  function renderItem({ item }: { item: Consulta }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardCabecalho}>
          <Text style={styles.cardEspecialidade}>{item.especialidade}</Text>
          <Text style={styles.cardHorario}>{item.horario}</Text>
        </View>
        <Text style={styles.cardMedico}>{item.medico}</Text>
        <Text style={styles.cardData}>{dataParaBR(item.data)}</Text>
        {item.observacoes ? (
          <Text style={styles.cardObservacoes}>{item.observacoes}</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.flex}>
      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>Minhas Consultas</Text>
          <Text style={styles.subtitulo}>
            {consultas.length}{' '}
            {consultas.length === 1 ? 'consulta agendada' : 'consultas agendadas'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.botaoNova}
          onPress={() => navigation.navigate('NovaConsulta')}
        >
          <Text style={styles.botaoNovaTexto}>+ Nova</Text>
        </TouchableOpacity>
      </View>

      {carregando ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color={cores.primaria} />
        </View>
      ) : (
        <FlatList
          data={consultas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <View style={styles.centro}>
              <Text style={styles.vazioTitulo}>Nenhuma consulta agendada</Text>
              <Text style={styles.vazioTexto}>
                Toque em “+ Nova” para agendar sua primeira consulta.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: cores.texto,
  },
  subtitulo: {
    fontSize: 14,
    color: cores.textoSecundario,
    marginTop: 4,
  },
  botaoNova: {
    backgroundColor: cores.primaria,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  botaoNovaTexto: {
    color: cores.branco,
    fontWeight: '700',
    fontSize: 14,
  },
  lista: {
    padding: 20,
    paddingTop: 8,
    flexGrow: 1,
  },
  card: {
    backgroundColor: cores.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  cardCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardEspecialidade: {
    fontSize: 16,
    fontWeight: '700',
    color: cores.primariaEscura,
  },
  cardHorario: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.primaria,
  },
  cardMedico: {
    fontSize: 15,
    color: cores.texto,
    marginTop: 6,
  },
  cardData: {
    fontSize: 14,
    color: cores.textoSecundario,
    marginTop: 2,
  },
  cardObservacoes: {
    fontSize: 13,
    color: cores.textoSecundario,
    marginTop: 8,
    fontStyle: 'italic',
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  vazioTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: cores.texto,
  },
  vazioTexto: {
    fontSize: 14,
    color: cores.textoSecundario,
    textAlign: 'center',
    marginTop: 6,
  },
});

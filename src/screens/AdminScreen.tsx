/**
 * AdminScreen - Painel Administrativo.
 *
 * Mostra um resumo (contadores por status) de TODAS as consultas e dá acesso
 * à lista completa. Só é acessível ao perfil "admin".
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
import { cores } from '../theme';

type AdminScreenProps = {
  navigation: any;
};

export default function AdminScreen({ navigation }: AdminScreenProps) {
  const { usuario, isAdmin, logout } = useAuth();
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, []),
  );

  async function carregar() {
    try {
      const dados = await consultasService.listarConsultas(usuario?.id, isAdmin());
      setConsultas(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o resumo');
    }
  }

  const total = consultas.length;
  const porStatus = (status: string) =>
    consultas.filter((c) => c.status === status).length;

  const cards = [
    { rotulo: 'Total', valor: total, cor: cores.primaria },
    { rotulo: 'Agendadas', valor: porStatus('agendada'), cor: '#2563eb' },
    { rotulo: 'Confirmadas', valor: porStatus('confirmada'), cor: cores.sucesso },
    { rotulo: 'Realizadas', valor: porStatus('realizada'), cor: '#6b7280' },
    { rotulo: 'Canceladas', valor: porStatus('cancelada'), cor: cores.erro },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>👑 Painel Administrativo</Text>
      <Text style={styles.subtitulo}>Olá, {usuario?.nome}</Text>

      <View style={styles.grid}>
        {cards.map((c) => (
          <View key={c.rotulo} style={[styles.statCard, { borderTopColor: c.cor }]}>
            <Text style={[styles.statValor, { color: c.cor }]}>{c.valor}</Text>
            <Text style={styles.statRotulo}>{c.rotulo}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('ConsultasList')}
      >
        <Text style={styles.botaoTexto}>📋 Ver todas as consultas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutTexto}>🚪 Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  content: { padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: cores.texto, marginTop: 8 },
  subtitulo: { fontSize: 15, color: cores.textoSecundario, marginTop: 4, marginBottom: 20 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: cores.card,
    borderRadius: 12,
    borderTopWidth: 4,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statValor: { fontSize: 30, fontWeight: 'bold' },
  statRotulo: { fontSize: 13, color: cores.textoSecundario, marginTop: 4 },
  botao: {
    backgroundColor: cores.primaria,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 16 },
  logout: {
    marginTop: 12,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.erro,
  },
  logoutTexto: { color: cores.erro, fontWeight: 'bold', fontSize: 16 },
});

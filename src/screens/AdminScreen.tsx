/**
 * AdminScreen - Painel Administrativo.
 *
 * Mostra um resumo (contadores por status) de TODAS as consultas e dá acesso
 * à lista completa. Só é acessível ao perfil "admin".
 *
 * Estilos em src/styles/admin.styles.ts.
 */

import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import consultasService from '../services/consultasService';
import { Consulta } from '../interfaces/consulta';
import { cores } from '../theme';
import { styles } from '../styles/admin.styles';

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

/**
 * HomeScreen - Tela inicial do Paciente.
 * Hub com acesso às consultas, agendamento e monitor de pressão arterial (IoT).
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

type HomeScreenProps = {
  navigation: any;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { usuario, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair da conta.');
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.icone}>🧑</Text>
          <Text style={styles.titulo}>Olá, {usuario?.nome}!</Text>
          <Text style={styles.subtitulo}>O que você deseja fazer hoje?</Text>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity
            style={[styles.card, styles.cardPrimario]}
            onPress={() => navigation.navigate('MinhasConsultas')}
          >
            <Text style={styles.cardIcone}>📋</Text>
            <Text style={styles.cardTitulo}>Minhas Consultas</Text>
            <Text style={styles.cardDescricao}>Ver e gerenciar seus agendamentos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('NovaConsulta')}
          >
            <Text style={styles.cardIcone}>➕</Text>
            <Text style={styles.cardTitulo}>Agendar Consulta</Text>
            <Text style={styles.cardDescricao}>Marque uma nova consulta médica</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PressaoArterial')}
          >
            <Text style={styles.cardIcone}>🩺</Text>
            <Text style={styles.cardTitulo}>Pressão Arterial</Text>
            <Text style={styles.cardDescricao}>
              Registrar medição e detectar emergências
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 Sair da Conta</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Sistema de Consultas Médicas</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 32, paddingTop: 20 },
  icone: { fontSize: 64, marginBottom: 12 },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitulo: { fontSize: 16, color: '#666', textAlign: 'center' },
  menu: { gap: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardPrimario: { borderLeftWidth: 5, borderLeftColor: '#79059C' },
  cardIcone: { fontSize: 40, marginBottom: 12 },
  cardTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescricao: { fontSize: 14, color: '#666', lineHeight: 20 },
  logoutButton: {
    marginTop: 32,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F44336',
  },
  logoutText: { color: '#F44336', fontWeight: 'bold', fontSize: 16 },
  footer: { marginTop: 24, alignItems: 'center' },
  footerText: { color: '#999', fontSize: 12 },
});

/**
 * HomeScreen - Tela inicial do Paciente.
 * Hub com acesso às consultas, agendamento e monitor de pressão arterial (IoT).
 *
 * Estilos em src/styles/homeScreen.styles.ts.
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { styles } from '../styles/homeScreen.styles';

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

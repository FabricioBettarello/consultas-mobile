/**
 * MedicoHomeScreen - Tela Principal do Médico
 * Exibe resumo da agenda e acesso às consultas do médico logado.
 *
 * Estilos em src/styles/medicoHome.styles.ts.
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
import { styles } from '../styles/medicoHome.styles';

type MedicoHomeScreenProps = {
  navigation: any;
};

export default function MedicoHomeScreen({ navigation }: MedicoHomeScreenProps) {
  const { usuario, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error('Erro no logout:', error);
      Alert.alert('Erro', 'Não foi possível sair da conta. Tente novamente.');
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.icone}>👨‍⚕️</Text>
          <Text style={styles.titulo}>Olá, {usuario?.nome}!</Text>
          <Text style={styles.subtitulo}>
            {usuario?.especialidade
              ? `Especialidade: ${usuario.especialidade}`
              : 'Área do médico'}
          </Text>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity
            style={[styles.card, styles.cardPrimario]}
            onPress={() => navigation.navigate('ConsultasList')}
          >
            <Text style={styles.cardIcone}>📋</Text>
            <Text style={styles.cardTitulo}>Minha Agenda</Text>
            <Text style={styles.cardDescricao}>
              Ver consultas e pacientes relacionados a você
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

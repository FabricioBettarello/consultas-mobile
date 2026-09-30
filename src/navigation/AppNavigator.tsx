/**
 * Navegação da aplicação.
 *
 * - Aba "Consultas": pilha com a lista de consultas e a tela de nova consulta.
 * - Aba "Cadastro": tela de cadastro de paciente.
 *
 * Estilos em src/styles/navigation.styles.ts.
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';

import CadastroPaciente from '../screens/CadastroPaciente';
import ConsultasListScreen from '../screens/ConsultasListScreen';
import NovaConsultaScreen from '../screens/NovaConsultaScreen';
import { cores } from '../theme';
import { styles } from '../styles/navigation.styles';
import type { ConsultasStackParamList, RootTabParamList } from './types';

const Stack = createNativeStackNavigator<ConsultasStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function ConsultasStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: cores.primaria },
        headerTintColor: cores.branco,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="ConsultasList"
        component={ConsultasListScreen}
        options={{ title: 'Consultas' }}
      />
      <Stack.Screen
        name="NovaConsulta"
        component={NovaConsultaScreen}
        options={{ title: 'Nova Consulta' }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: cores.primaria,
        tabBarInactiveTintColor: cores.textoSecundario,
        tabBarStyle: { paddingBottom: 6, height: 60 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="Consultas"
        component={ConsultasStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={[styles.tabIcone, { color }]}>🗓️</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Cadastro"
        component={CadastroPaciente}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={[styles.tabIcone, { color }]}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

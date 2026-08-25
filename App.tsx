/**
 * Ponto de entrada da aplicação.
 *
 * - Inicializa os dados simulados (usuários e consultas) no AsyncStorage.
 * - Envolve a navegação com o provedor de autenticação e a área segura.
 *
 * A navegação por perfil (admin/medico/paciente) e o seu NavigationContainer
 * ficam em `src/navigation`.
 */

import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './src/contexts/AuthContext';
import Navigation from './src/navigation';
import { inicializarUsuarios } from './src/services/authService';
import { inicializarConsultas } from './src/services/consultasService';

export default function App() {
  useEffect(() => {
    async function inicializar() {
      await inicializarUsuarios();
      await inicializarConsultas();
    }
    inicializar();
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="light" />
        <Navigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

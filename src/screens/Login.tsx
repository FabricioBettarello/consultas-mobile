/**
 * Login Screen - Tela de Autenticação
 * Permite login com email e senha.
 *
 * Estilos em src/styles/login.styles.ts.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../contexts/AuthContext';
import {
  obterCredenciaisTeste,
  forcarLogoutCompleto,
  limparTudoDoAsyncStorage,
} from '../services/authService';
import { styles } from '../styles/login.styles';

type LoginProps = {
  navigation: any;
};

export default function Login({ navigation }: LoginProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarCredenciais, setMostrarCredenciais] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const sucesso = await login(email.trim(), senha);

      if (!sucesso) {
        Alert.alert('Erro', 'Email ou senha inválidos');
      }
      // Se login bem-sucedido, a navegação será feita pelo Navigation baseado no contexto
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login');
    } finally {
      setLoading(false);
    }
  }

  function preencherCredenciais(emailPreencher: string, senhaPreencher: string) {
    setEmail(emailPreencher);
    setSenha(senhaPreencher);
    setMostrarCredenciais(false);
  }

  async function handleForcarLogout() {
    try {
      console.log('DEBUG: Forçando logout completo...');
      await forcarLogoutCompleto();
      Alert.alert('Debug', 'Logout forçado! Verifique o console.', [
        { text: 'OK', onPress: () => console.log('Debug concluído') },
      ]);
    } catch (error) {
      console.error('Erro ao forçar logout:', error);
      Alert.alert('Erro', 'Não foi possível forçar logout');
    }
  }

  async function handleLimparTudo() {
    Alert.alert(
      'CUIDADO!',
      'Isso vai limpar TODOS os dados do AsyncStorage (usuários, consultas, tudo)!\n\nTem certeza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'SIM, LIMPAR TUDO',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('LIMPANDO TUDO...');
              await limparTudoDoAsyncStorage();
              Alert.alert('Concluído', 'AsyncStorage limpo! RECARREGUE O APP (R+R).', [
                { text: 'OK' },
              ]);
            } catch (error) {
              console.error('Erro ao limpar:', error);
              Alert.alert('Erro', 'Não foi possível limpar');
            }
          },
        },
      ],
    );
  }

  const credenciais = obterCredenciaisTeste();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.icone}>🔑</Text>
        <Text style={styles.titulo}>Sistema de Consultas</Text>
        <Text style={styles.subtitulo}>Faça login para continuar</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.botao, styles.botaoPrimario]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#79059C" />
            ) : (
              <Text style={styles.botaoTexto}>Entrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, styles.botaoSecundario]}
            onPress={() => navigation.navigate('CadastroPaciente')}
            disabled={loading}
          >
            <Text style={styles.botaoTextoSecundario}>Criar Conta</Text>
          </TouchableOpacity>
        </View>

        {/* Credenciais de Teste (apenas desenvolvimento) */}
        <View style={styles.credenciaisContainer}>
          <TouchableOpacity
            onPress={() => setMostrarCredenciais(!mostrarCredenciais)}
          >
            <Text style={styles.credenciaisTitulo}>
              📋 {mostrarCredenciais ? 'Ocultar' : 'Ver'} Credenciais de Teste
            </Text>
          </TouchableOpacity>

          {mostrarCredenciais && (
            <View style={styles.credenciaisLista}>
              <TouchableOpacity
                style={styles.credencialItem}
                onPress={() =>
                  preencherCredenciais(
                    credenciais.admin.email,
                    credenciais.admin.senha,
                  )
                }
              >
                <Text style={styles.credencialTipo}>👑 ADMIN</Text>
                <Text style={styles.credencialTexto}>{credenciais.admin.email}</Text>
                <Text style={styles.credencialTexto}>{credenciais.admin.senha}</Text>
              </TouchableOpacity>

              {credenciais.pacientes.map((paciente, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.credencialItem}
                  onPress={() =>
                    preencherCredenciais(paciente.email, paciente.senha)
                  }
                >
                  <Text style={styles.credencialTipo}>🧑 {paciente.nome}</Text>
                  <Text style={styles.credencialTexto}>{paciente.email}</Text>
                  <Text style={styles.credencialTexto}>{paciente.senha}</Text>
                </TouchableOpacity>
              ))}

              {credenciais.medicos.map((medico, index) => (
                <TouchableOpacity
                  key={`medico-${index}`}
                  style={styles.credencialItem}
                  onPress={() => preencherCredenciais(medico.email, medico.senha)}
                >
                  <Text style={styles.credencialTipo}>👨‍⚕️ {medico.nome}</Text>
                  <Text style={styles.credencialTexto}>{medico.especialidade}</Text>
                  <Text style={styles.credencialTexto}>{medico.email}</Text>
                  <Text style={styles.credencialTexto}>{medico.senha}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Botões de Debug - Forçar Logout */}
          {mostrarCredenciais && (
            <>
              <TouchableOpacity
                style={styles.botaoDebug}
                onPress={handleForcarLogout}
              >
                <Text style={styles.botaoDebugTexto}>
                  🔧 DEBUG: Forçar Logout Completo
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoDebugPerigoso}
                onPress={handleLimparTudo}
              >
                <Text style={styles.botaoDebugTexto}>
                  🚨 EMERGÊNCIA: Limpar TUDO do AsyncStorage
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

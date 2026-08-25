/**
 * CadastroPacienteScreen - Criação de conta (novo paciente).
 *
 * Reusa as máscaras/validações do Checkpoint 1 e persiste via authService.
 * Novos usuários são sempre criados com perfil "paciente".
 */

import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import { cores } from '../theme';
import { maskCPF, maskTelefone } from '../utils/masks';
import { validarCPF, validarEmail, validarTelefone } from '../utils/validation';
import { cadastrarUsuario } from '../services/authService';

type CadastroPacienteScreenProps = {
  navigation: any;
};

export default function CadastroPacienteScreen({
  navigation,
}: CadastroPacienteScreenProps) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const [erroCpf, setErroCpf] = useState('');
  const [erroTelefone, setErroTelefone] = useState('');
  const [erroEmail, setErroEmail] = useState('');

  function handleCpfChange(texto: string) {
    setCpf(maskCPF(texto));
    if (erroCpf) setErroCpf('');
  }

  function handleTelefoneChange(texto: string) {
    setTelefone(maskTelefone(texto));
    if (erroTelefone) setErroTelefone('');
  }

  function handleEmailChange(texto: string) {
    setEmail(texto);
    if (erroEmail) setErroEmail('');
  }

  async function handleCadastrar() {
    const problemas: string[] = [];

    if (nome.trim().length < 3) {
      problemas.push('Informe o nome completo.');
    }
    if (!validarCPF(cpf)) {
      setErroCpf('CPF inválido. Confira os números digitados.');
      problemas.push('CPF inválido.');
    }
    if (!validarTelefone(telefone)) {
      setErroTelefone('Telefone inválido. Use DDD + número.');
      problemas.push('Telefone inválido.');
    }
    if (!validarEmail(email)) {
      setErroEmail('E-mail inválido. Use o formato nome@dominio.com.');
      problemas.push('E-mail inválido.');
    }
    if (senha.trim().length < 6) {
      problemas.push('A senha deve ter ao menos 6 caracteres.');
    }

    if (problemas.length > 0) {
      Alert.alert('Não foi possível cadastrar', problemas.join('\n'));
      return;
    }

    setLoading(true);
    try {
      await cadastrarUsuario({
        nome: nome.trim(),
        email: email.trim(),
        senha,
        cpf,
        telefone,
      });

      Alert.alert(
        'Conta criada!',
        'Seu cadastro foi realizado. Faça login para continuar.',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível criar a conta.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>Criar Conta</Text>
        <Text style={styles.subtitulo}>
          Preencha os dados para se cadastrar como paciente.
        </Text>

        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Maria da Silva"
          placeholderTextColor={cores.textoSecundario}
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={[styles.input, erroCpf ? styles.inputErro : null]}
          placeholder="000.000.000-00"
          placeholderTextColor={cores.textoSecundario}
          value={cpf}
          onChangeText={handleCpfChange}
          keyboardType="numeric"
          maxLength={14}
        />
        {erroCpf ? <Text style={styles.mensagemErro}>{erroCpf}</Text> : null}

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={[styles.input, erroTelefone ? styles.inputErro : null]}
          placeholder="(11) 99999-9999"
          placeholderTextColor={cores.textoSecundario}
          value={telefone}
          onChangeText={handleTelefoneChange}
          keyboardType="phone-pad"
          maxLength={15}
        />
        {erroTelefone ? (
          <Text style={styles.mensagemErro}>{erroTelefone}</Text>
        ) : null}

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, erroEmail ? styles.inputErro : null]}
          placeholder="nome@dominio.com"
          placeholderTextColor={cores.textoSecundario}
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {erroEmail ? <Text style={styles.mensagemErro}>{erroEmail}</Text> : null}

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo de 6 caracteres"
          placeholderTextColor={cores.textoSecundario}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.botao, loading && styles.botaoDesabilitado]}
          onPress={handleCadastrar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={cores.branco} />
          ) : (
            <Text style={styles.botaoTexto}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.voltar}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.voltarTexto}>Já tenho conta — Voltar ao Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: cores.fundo },
  container: { padding: 20, paddingBottom: 40, paddingTop: 40 },
  titulo: { fontSize: 26, fontWeight: '700', color: cores.texto },
  subtitulo: {
    fontSize: 14,
    color: cores.textoSecundario,
    marginTop: 4,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.texto,
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: cores.card,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: cores.texto,
  },
  inputErro: { borderColor: cores.erro },
  mensagemErro: { color: cores.erro, fontSize: 13, marginTop: 6 },
  botao: {
    backgroundColor: cores.primaria,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  botaoDesabilitado: { opacity: 0.6 },
  botaoTexto: { color: cores.branco, fontSize: 16, fontWeight: '700' },
  voltar: { marginTop: 16, alignItems: 'center' },
  voltarTexto: { color: cores.primaria, fontSize: 14, fontWeight: '600' },
});

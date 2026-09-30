/**
 * Tela de Cadastro de Paciente.
 *
 * Implementa as melhorias da aula de 05/05/2026:
 * - Máscara progressiva de CPF (000.000.000-00) e telefone
 *   ((11) 99999-9999 / (11) 3333-4444).
 * - Validação oficial de CPF (módulo 11) e de e-mail (regex).
 * - Feedback visual inline (onBlur): borda vermelha + mensagem abaixo do campo.
 * - Limpeza da mensagem de erro ao digitar novamente.
 * - Impedimento de cadastro com CPF ou telefone inválidos (Alert).
 *
 * Estilos em src/styles/cadastroPaciente.styles.ts.
 */

import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { cores } from '../theme';
import { maskCPF, maskTelefone } from '../utils/masks';
import { validarCPF, validarEmail, validarTelefone } from '../utils/validation';
import { styles } from '../styles/cadastroPaciente.styles';

export default function CadastroPaciente() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  // Mensagens de erro inline por campo (string vazia = sem erro).
  const [erroCpf, setErroCpf] = useState('');
  const [erroTelefone, setErroTelefone] = useState('');
  const [erroEmail, setErroEmail] = useState('');

  // ----- Handlers de mudança: aplicam máscara e limpam o erro do campo -----

  function handleCpfChange(texto: string) {
    setCpf(maskCPF(texto));
    if (erroCpf) {
      setErroCpf('');
    }
  }

  function handleTelefoneChange(texto: string) {
    setTelefone(maskTelefone(texto));
    if (erroTelefone) {
      setErroTelefone('');
    }
  }

  function handleEmailChange(texto: string) {
    setEmail(texto);
    if (erroEmail) {
      setErroEmail('');
    }
  }

  // ----- Feedback inline no onBlur -----

  function handleCpfBlur() {
    if (cpf.length > 0 && !validarCPF(cpf)) {
      setErroCpf('CPF inválido. Confira os números digitados.');
    }
  }

  function handleTelefoneBlur() {
    if (telefone.length > 0 && !validarTelefone(telefone)) {
      setErroTelefone('Telefone inválido. Use DDD + número.');
    }
  }

  function handleEmailBlur() {
    if (email.length > 0 && !validarEmail(email)) {
      setErroEmail('E-mail inválido. Use o formato nome@dominio.com.');
    }
  }

  // ----- Cadastro -----

  function handleCadastrar() {
    const problemas: string[] = [];

    if (nome.trim().length < 3) {
      problemas.push('Informe o nome completo do paciente.');
    }

    const cpfValido = validarCPF(cpf);
    if (!cpfValido) {
      setErroCpf('CPF inválido. Confira os números digitados.');
      problemas.push('CPF inválido.');
    }

    const telefoneValido = validarTelefone(telefone);
    if (!telefoneValido) {
      setErroTelefone('Telefone inválido. Use DDD + número.');
      problemas.push('Telefone inválido.');
    }

    const emailValido = validarEmail(email);
    if (!emailValido) {
      setErroEmail('E-mail inválido. Use o formato nome@dominio.com.');
      problemas.push('E-mail inválido.');
    }

    // Impede o cadastro caso haja qualquer problema.
    if (problemas.length > 0) {
      Alert.alert('Não foi possível cadastrar', problemas.join('\n'));
      return;
    }

    Alert.alert(
      'Paciente cadastrado!',
      `${nome}\nCPF: ${cpf}\nTelefone: ${telefone}\nE-mail: ${email}`,
    );

    // Limpa o formulário após o sucesso.
    setNome('');
    setCpf('');
    setTelefone('');
    setEmail('');
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
        <Text style={styles.titulo}>Cadastro de Paciente</Text>
        <Text style={styles.subtitulo}>
          Preencha os dados abaixo para cadastrar um novo paciente.
        </Text>

        {/* Nome */}
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Maria da Silva"
          placeholderTextColor={cores.textoSecundario}
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        {/* CPF */}
        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={[styles.input, erroCpf ? styles.inputErro : null]}
          placeholder="000.000.000-00"
          placeholderTextColor={cores.textoSecundario}
          value={cpf}
          onChangeText={handleCpfChange}
          onBlur={handleCpfBlur}
          keyboardType="numeric"
          maxLength={14}
        />
        {erroCpf ? <Text style={styles.mensagemErro}>{erroCpf}</Text> : null}

        {/* Telefone */}
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={[styles.input, erroTelefone ? styles.inputErro : null]}
          placeholder="(11) 99999-9999"
          placeholderTextColor={cores.textoSecundario}
          value={telefone}
          onChangeText={handleTelefoneChange}
          onBlur={handleTelefoneBlur}
          keyboardType="phone-pad"
          maxLength={15}
        />
        {erroTelefone ? (
          <Text style={styles.mensagemErro}>{erroTelefone}</Text>
        ) : null}

        {/* E-mail */}
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, erroEmail ? styles.inputErro : null]}
          placeholder="nome@dominio.com"
          placeholderTextColor={cores.textoSecundario}
          value={email}
          onChangeText={handleEmailChange}
          onBlur={handleEmailBlur}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {erroEmail ? <Text style={styles.mensagemErro}>{erroEmail}</Text> : null}

        <TouchableOpacity style={styles.botao} onPress={handleCadastrar}>
          <Text style={styles.botaoTexto}>Cadastrar paciente</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

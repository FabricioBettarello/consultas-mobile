/**
 * AuthContext - Contexto de Autenticação
 * Gerencia o estado de autenticação do usuário em todo o app.
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from '../types/usuario';

type AuthContextData = {
  usuario: Usuario | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  isMedico: () => boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega usuário salvo ao iniciar o app
  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    try {
      const usuarioSalvo = await AsyncStorage.getItem('@usuario');
      if (usuarioSalvo) {
        const usuarioParseado = JSON.parse(usuarioSalvo);
        setUsuario(usuarioParseado);
        console.log('Usuário carregado:', usuarioParseado.nome);
      } else {
        console.log('Nenhum usuário salvo encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, senha: string): Promise<boolean> {
    try {
      console.log('Tentando login com email:', email);

      // Busca usuários cadastrados
      const usuariosJSON = await AsyncStorage.getItem('@usuarios');
      const usuarios: Usuario[] = usuariosJSON ? JSON.parse(usuariosJSON) : [];
      console.log(`${usuarios.length} usuários encontrados no sistema`);

      // Busca usuário por email e senha
      const usuarioEncontrado = usuarios.find(
        (u) => u.email === email && u.senha === senha,
      );

      if (usuarioEncontrado) {
        console.log('Credenciais válidas para:', usuarioEncontrado.nome);

        // Remove senha antes de salvar no contexto (segurança)
        const { senha: _, ...usuarioSemSenha } = usuarioEncontrado;
        const usuarioParaSalvar = usuarioSemSenha as Usuario;

        // Salva no AsyncStorage PRIMEIRO
        await AsyncStorage.setItem('@usuario', JSON.stringify(usuarioParaSalvar));

        // Atualiza estado do contexto
        setUsuario(usuarioParaSalvar);
        console.log('Login concluído com sucesso!');
        return true;
      }

      console.log('Credenciais inválidas');
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  }

  async function logout() {
    try {
      console.log('Iniciando logout...');

      await AsyncStorage.removeItem('@usuario');
      await new Promise((resolve) => setTimeout(resolve, 100));

      const usuarioDepois = await AsyncStorage.getItem('@usuario');
      if (usuarioDepois) {
        await AsyncStorage.removeItem('@usuario');
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // Limpa estado do contexto
      setUsuario(null);
      console.log('Logout concluído!');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo com erro, tenta limpar o estado
      setUsuario(null);
    }
  }

  function isAdmin(): boolean {
    return usuario?.perfil === 'admin';
  }

  function isMedico(): boolean {
    return usuario?.perfil === 'medico';
  }

  return (
    <AuthContext.Provider
      value={{ usuario, loading, login, logout, isAdmin, isMedico }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}

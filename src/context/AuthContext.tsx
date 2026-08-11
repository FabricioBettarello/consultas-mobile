/**
 * Contexto de autenticação simples.
 *
 * Fornece o `usuario` logado para toda a aplicação. Aqui já iniciamos com um
 * usuário de teste para que o fluxo de consultas funcione sem uma tela de
 * login. O `usuario?.id` é usado para filtrar as consultas por paciente.
 */

import React, { createContext, useContext, useMemo, useState } from 'react';

export interface Usuario {
  id: string;
  nome: string;
  email?: string;
}

interface AuthContextData {
  usuario: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

const USUARIO_PADRAO: Usuario = {
  id: '1',
  nome: 'Paciente Teste',
  email: 'paciente@teste.com',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(USUARIO_PADRAO);

  const value = useMemo<AuthContextData>(
    () => ({
      usuario,
      login: (novoUsuario: Usuario) => setUsuario(novoUsuario),
      logout: () => setUsuario(null),
    }),
    [usuario],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

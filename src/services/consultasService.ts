/**
 * Serviço de consultas — camada de persistência usando AsyncStorage.
 *
 * Responsável por criar e listar consultas. As telas nunca falam diretamente
 * com o AsyncStorage: sempre passam por aqui.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Consulta {
  id: string;
  usuarioId: string;
  especialidade: string;
  medico: string;
  /** Data no formato de armazenamento AAAA-MM-DD. */
  data: string;
  horario: string;
  observacoes?: string;
  criadaEm: string;
}

const STORAGE_KEY = '@consultas';

/** Lê todas as consultas persistidas (sem filtro). */
async function lerTodas(): Promise<Consulta[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Consulta[]) : [];
}

/**
 * Lista as consultas de um usuário, ordenadas da mais recente para a mais
 * antiga. Se `usuarioId` não for informado, retorna todas.
 */
export async function listarConsultas(usuarioId?: string): Promise<Consulta[]> {
  const todas = await lerTodas();
  const filtradas = usuarioId
    ? todas.filter((consulta) => consulta.usuarioId === usuarioId)
    : todas;

  return filtradas.sort(
    (a, b) => new Date(b.criadaEm).getTime() - new Date(a.criadaEm).getTime(),
  );
}

/**
 * Cria e persiste uma nova consulta.
 * A `data` já deve chegar no formato AAAA-MM-DD.
 */
export async function criarConsulta(
  nova: Omit<Consulta, 'id' | 'criadaEm'>,
): Promise<Consulta> {
  const todas = await lerTodas();

  const consulta: Consulta = {
    ...nova,
    id: Date.now().toString(),
    criadaEm: new Date().toISOString(),
  };

  todas.push(consulta);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todas));

  return consulta;
}

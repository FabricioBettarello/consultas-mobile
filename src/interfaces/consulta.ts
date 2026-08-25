/**
 * Interface de Consulta.
 *
 * Campos de negócio:
 * - pacienteId / pacienteNome: quem marcou (para exibição do admin/médico).
 * - usuarioId: id do usuário logado dono da consulta (usado no filtro do paciente).
 * - medicoId / medicoNome: médico responsável (usado no filtro da agenda do médico).
 * - prioridade / emergencia: usados para ordenar consultas críticas no topo
 *   (ex.: emergência de pressão arterial - continuidade IoT).
 */

import { StatusConsulta } from '../types/statusConsulta';

export interface Consulta {
  id: number;
  pacienteId: number;
  pacienteNome: string;
  medicoId: number;
  medicoNome: string;
  especialidade: string;
  usuarioId: number;
  /** Data no formato de armazenamento AAAA-MM-DD. */
  data: string;
  horario: string;
  status: StatusConsulta;
  observacoes?: string;
  valor?: number;
  /** Marca consultas prioritárias (ficam no topo da lista). */
  prioridade?: boolean;
  /** Marca consultas geradas por emergência (ex.: PA Estágio 3). */
  emergencia?: boolean;
}

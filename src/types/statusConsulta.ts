/**
 * Status possíveis de uma consulta ao longo do seu ciclo de vida.
 *
 * - agendada:   criada pelo paciente, aguardando confirmação.
 * - confirmada: confirmada pelo médico/paciente.
 * - cancelada:  cancelada por qualquer um dos lados.
 * - realizada:  finalizada (apenas admin marca).
 */
export type StatusConsulta =
  | 'agendada'
  | 'confirmada'
  | 'cancelada'
  | 'realizada';

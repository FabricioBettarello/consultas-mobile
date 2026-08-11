/**
 * Dados de referência da aplicação (especialidades, médicos e horários).
 *
 * Em um app real viriam de uma API; aqui ficam mockados para o fluxo de
 * agendamento funcionar de ponta a ponta.
 */

export interface Especialidade {
  id: string;
  nome: string;
}

export interface Medico {
  id: string;
  nome: string;
  especialidadeId: string;
}

export const ESPECIALIDADES: Especialidade[] = [
  { id: '1', nome: 'Clínico Geral' },
  { id: '2', nome: 'Cardiologia' },
  { id: '3', nome: 'Dermatologia' },
  { id: '4', nome: 'Ortopedia' },
  { id: '5', nome: 'Pediatria' },
];

export const MEDICOS: Medico[] = [
  // Clínico Geral
  { id: '1', nome: 'Dra. Ana Souza', especialidadeId: '1' },
  { id: '2', nome: 'Dr. Bruno Lima', especialidadeId: '1' },
  // Cardiologia
  { id: '3', nome: 'Dra. Carla Mendes', especialidadeId: '2' },
  { id: '4', nome: 'Dr. Daniel Rocha', especialidadeId: '2' },
  // Dermatologia
  { id: '5', nome: 'Dra. Elisa Prado', especialidadeId: '3' },
  // Ortopedia
  { id: '6', nome: 'Dr. Fábio Nunes', especialidadeId: '4' },
  { id: '7', nome: 'Dra. Gabriela Reis', especialidadeId: '4' },
  // Pediatria
  { id: '8', nome: 'Dr. Henrique Alves', especialidadeId: '5' },
];

export const HORARIOS: string[] = [
  '08:00', '08:30', '09:00',
  '09:30', '10:00', '10:30',
  '11:00', '13:30', '14:00',
  '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00',
];

/** Retorna apenas os médicos da especialidade informada. */
export function medicosPorEspecialidade(especialidadeId: string): Medico[] {
  return MEDICOS.filter((medico) => medico.especialidadeId === especialidadeId);
}

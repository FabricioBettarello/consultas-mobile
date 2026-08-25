/**
 * Interface e tipos relacionados a Médicos.
 */

/** União de especialidades atendidas pela clínica. */
export type Especialidade =
  | 'Cardiologia'
  | 'Dermatologia'
  | 'Ortopedia'
  | 'Clínica Geral'
  | 'Psiquiatria'
  | 'Pediatria';

export interface Medico {
  id: number;
  nome: string;
  crm: string;
  especialidade: Especialidade;
  ativo: boolean;
}

/** Versão enxuta usada em selects (id, nome, especialidade). */
export interface MedicoSelect {
  id: number;
  nome: string;
  especialidade: Especialidade;
}

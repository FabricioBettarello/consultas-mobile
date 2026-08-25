/**
 * Barrel de tipos compartilhados.
 *
 * Permite importar `Consulta`, `Especialidade` e afins a partir de "../types",
 * como usado nos serviços de mock.
 */

export * from './usuario';
export * from './statusConsulta';
export type { Consulta } from '../interfaces/consulta';
export type { Especialidade, Medico, MedicoSelect } from '../interfaces/medico';

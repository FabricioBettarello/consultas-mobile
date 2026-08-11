/**
 * Máscaras progressivas de entrada.
 *
 * Todas as funções recebem o texto atual do campo, extraem apenas os dígitos
 * e reaplicam a formatação. Isso permite que a máscara funcione tanto ao
 * digitar quanto ao apagar caracteres.
 */

/** Aplica a máscara de CPF no formato 000.000.000-00. */
export function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length > 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  }
  if (digits.length > 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  }
  if (digits.length > 3) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  }
  return digits;
}

/**
 * Aplica a máscara de telefone.
 * - Celular (11 dígitos): (11) 99999-9999
 * - Fixo (10 dígitos):    (11) 3333-4444
 */
export function maskTelefone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length === 0) {
    return '';
  }
  if (digits.length <= 2) {
    return `(${digits}`;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    // Fixo: 4 dígitos + 4 dígitos
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  // Celular: 5 dígitos + 4 dígitos
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** Aplica a máscara de data no formato DD/MM/AAAA. */
export function maskData(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

/**
 * Converte uma data de DD/MM/AAAA para AAAA-MM-DD (formato de armazenamento).
 * Ex.: "04/08/2026" -> "2026-08-04".
 */
export function dataParaISO(dataBR: string): string {
  const [dia, mes, ano] = dataBR.split('/');
  return `${ano}-${mes}-${dia}`;
}

/**
 * Converte uma data de AAAA-MM-DD de volta para DD/MM/AAAA (exibição).
 * Ex.: "2026-08-04" -> "04/08/2026".
 */
export function dataParaBR(dataISO: string): string {
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}

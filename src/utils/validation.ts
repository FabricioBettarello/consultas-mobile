/**
 * Validações de CPF, e-mail, telefone e data.
 */

/**
 * Valida um CPF usando o algoritmo oficial (módulo 11 da Receita Federal).
 *
 * Regras:
 * - Deve conter exatamente 11 dígitos.
 * - CPFs com todos os dígitos iguais (ex.: 111.111.111-11) são inválidos.
 * - Os dois dígitos verificadores devem conferir.
 *
 * Aceita a entrada com ou sem pontuação.
 */
export function validarCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '');

  if (digits.length !== 11) {
    return false;
  }

  // Rejeita sequências com todos os dígitos iguais (000..., 111..., etc.).
  if (/^(\d)\1{10}$/.test(digits)) {
    return false;
  }

  const numeros = digits.split('').map(Number);

  // Primeiro dígito verificador.
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += numeros[i] * (10 - i);
  }
  let dv1 = (soma * 10) % 11;
  if (dv1 === 10) {
    dv1 = 0;
  }
  if (dv1 !== numeros[9]) {
    return false;
  }

  // Segundo dígito verificador.
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += numeros[i] * (11 - i);
  }
  let dv2 = (soma * 10) % 11;
  if (dv2 === 10) {
    dv2 = 0;
  }
  if (dv2 !== numeros[10]) {
    return false;
  }

  return true;
}

/** Valida um e-mail no formato texto@dominio.extensao. */
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

/** Valida um telefone: precisa ter 10 (fixo) ou 11 (celular) dígitos. */
export function validarTelefone(telefone: string): boolean {
  const digits = telefone.replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
}

/** Valida uma data no formato DD/MM/AAAA (existência real do dia/mês/ano). */
export function validarData(data: string): boolean {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(data);
  if (!match) {
    return false;
  }

  const dia = Number(match[1]);
  const mes = Number(match[2]);
  const ano = Number(match[3]);

  if (mes < 1 || mes > 12) {
    return false;
  }

  const diasNoMes = new Date(ano, mes, 0).getDate();
  if (dia < 1 || dia > diasNoMes) {
    return false;
  }

  return true;
}

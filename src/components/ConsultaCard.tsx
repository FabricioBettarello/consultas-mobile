/**
 * ConsultaCard - cartão de uma consulta na lista.
 *
 * Mostra médico, especialidade, data/horário e um badge de status.
 * As ações (confirmar/cancelar/detalhes) só aparecem quando o callback é passado
 * e fazem sentido para o status atual da consulta.
 *
 * Estilos em src/styles/consultaCard.styles.ts.
 */

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Consulta } from '../interfaces/consulta';
import { cores, coresStatus } from '../theme';
import { dataParaBR } from '../utils/masks';
import { styles } from '../styles/consultaCard.styles';

type ConsultaCardProps = {
  consulta: Consulta;
  onConfirmar?: () => void;
  onCancelar?: () => void;
  onDetalhes?: () => void;
};

const rotuloStatus: Record<string, string> = {
  agendada: 'Agendada',
  confirmada: 'Confirmada',
  cancelada: 'Cancelada',
  realizada: 'Realizada',
};

export default function ConsultaCard({
  consulta,
  onConfirmar,
  onCancelar,
  onDetalhes,
}: ConsultaCardProps) {
  const corStatus = coresStatus[consulta.status] ?? cores.textoSecundario;
  const podeConfirmar = consulta.status === 'agendada';
  const podeCancelar =
    consulta.status === 'agendada' || consulta.status === 'confirmada';

  return (
    <TouchableOpacity
      style={[styles.card, consulta.emergencia && styles.cardEmergencia]}
      activeOpacity={onDetalhes ? 0.7 : 1}
      onPress={onDetalhes}
    >
      <View style={styles.topo}>
        <Text style={styles.medico}>{consulta.medicoNome}</Text>
        <View style={[styles.badge, { backgroundColor: corStatus }]}>
          <Text style={styles.badgeTexto}>
            {rotuloStatus[consulta.status] ?? consulta.status}
          </Text>
        </View>
      </View>

      <Text style={styles.especialidade}>{consulta.especialidade}</Text>

      {(consulta.emergencia || consulta.prioridade) && (
        <Text style={styles.prioridade}>
          {consulta.emergencia ? '🚨 Emergência' : '⭐ Prioritária'}
        </Text>
      )}

      <View style={styles.dataLinha}>
        <Text style={styles.dataTexto}>📅 {dataParaBR(consulta.data)}</Text>
        <Text style={styles.dataTexto}>🕐 {consulta.horario}</Text>
      </View>

      {consulta.observacoes ? (
        <Text style={styles.obs} numberOfLines={2}>
          {consulta.observacoes}
        </Text>
      ) : null}

      {(onConfirmar || onCancelar || onDetalhes) && (
        <View style={styles.acoes}>
          {onConfirmar && podeConfirmar && (
            <TouchableOpacity
              style={[styles.botao, styles.botaoConfirmar]}
              onPress={onConfirmar}
            >
              <Text style={styles.botaoTexto}>Confirmar</Text>
            </TouchableOpacity>
          )}
          {onCancelar && podeCancelar && (
            <TouchableOpacity
              style={[styles.botao, styles.botaoCancelar]}
              onPress={onCancelar}
            >
              <Text style={styles.botaoTexto}>Cancelar</Text>
            </TouchableOpacity>
          )}
          {onDetalhes && (
            <TouchableOpacity
              style={[styles.botao, styles.botaoDetalhes]}
              onPress={onDetalhes}
            >
              <Text style={styles.botaoTextoDetalhes}>Detalhes</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

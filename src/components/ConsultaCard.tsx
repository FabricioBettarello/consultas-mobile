/**
 * ConsultaCard - cartão de uma consulta na lista.
 *
 * Mostra médico, especialidade, data/horário e um badge de status.
 * As ações (confirmar/cancelar/detalhes) só aparecem quando o callback é passado
 * e fazem sentido para o status atual da consulta.
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Consulta } from '../interfaces/consulta';
import { cores, coresStatus } from '../theme';
import { dataParaBR } from '../utils/masks';

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

const styles = StyleSheet.create({
  card: {
    backgroundColor: cores.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardEmergencia: {
    borderLeftWidth: 5,
    borderLeftColor: cores.erro,
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medico: {
    fontSize: 17,
    fontWeight: 'bold',
    color: cores.texto,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeTexto: {
    color: cores.branco,
    fontSize: 12,
    fontWeight: '600',
  },
  especialidade: {
    fontSize: 14,
    color: cores.primaria,
    marginTop: 4,
    fontWeight: '500',
  },
  prioridade: {
    fontSize: 13,
    color: cores.erro,
    fontWeight: '600',
    marginTop: 6,
  },
  dataLinha: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10,
  },
  dataTexto: {
    fontSize: 14,
    color: cores.textoSecundario,
  },
  obs: {
    fontSize: 13,
    color: cores.textoSecundario,
    marginTop: 8,
    fontStyle: 'italic',
  },
  acoes: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  botao: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  botaoConfirmar: {
    backgroundColor: cores.sucesso,
  },
  botaoCancelar: {
    backgroundColor: cores.erro,
  },
  botaoDetalhes: {
    backgroundColor: '#f0f0f0',
    marginLeft: 'auto',
  },
  botaoTexto: {
    color: cores.branco,
    fontWeight: '600',
    fontSize: 13,
  },
  botaoTextoDetalhes: {
    color: cores.texto,
    fontWeight: '600',
    fontSize: 13,
  },
});

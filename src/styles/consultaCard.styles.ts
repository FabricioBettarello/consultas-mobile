import { StyleSheet } from 'react-native';
import { cores } from '../theme';

/**
 * Estilos do componente ConsultaCard.
 * Separados da lógica para facilitar manutenção e reuso.
 */
export const styles = StyleSheet.create({
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

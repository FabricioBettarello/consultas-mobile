import { StyleSheet } from 'react-native';
import { cores } from '../theme';

/**
 * Estilos da tela ConsultaDetalhesScreen.
 * Separados da lógica para facilitar manutenção e reuso.
 */
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  content: { padding: 16 },
  emergenciaBanner: {
    backgroundColor: cores.erro,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  emergenciaTexto: { color: cores.branco, fontWeight: 'bold' },
  card: {
    backgroundColor: cores.card,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 16,
  },
  badgeTexto: { color: cores.branco, fontWeight: '600', fontSize: 13 },
  linha: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 12,
  },
  linhaRotulo: { fontSize: 13, color: cores.textoSecundario, marginBottom: 2 },
  linhaValor: { fontSize: 16, color: cores.texto, fontWeight: '500' },
  acoes: { marginTop: 20, gap: 10 },
  botao: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoConfirmar: { backgroundColor: cores.sucesso },
  botaoCancelar: { backgroundColor: cores.erro },
  botaoRealizar: { backgroundColor: cores.primaria },
  botaoDeletar: {
    backgroundColor: '#8b0000',
  },
  botaoTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 15 },
});

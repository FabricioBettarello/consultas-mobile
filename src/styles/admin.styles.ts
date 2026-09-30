import { StyleSheet } from 'react-native';
import { cores } from '../theme';

/**
 * Estilos da tela AdminScreen (painel administrativo).
 * Separados da lógica para facilitar manutenção e reuso.
 */
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  content: { padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: cores.texto, marginTop: 8 },
  subtitulo: { fontSize: 15, color: cores.textoSecundario, marginTop: 4, marginBottom: 20 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: cores.card,
    borderRadius: 12,
    borderTopWidth: 4,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statValor: { fontSize: 30, fontWeight: 'bold' },
  statRotulo: { fontSize: 13, color: cores.textoSecundario, marginTop: 4 },
  botao: {
    backgroundColor: cores.primaria,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 16 },
  logout: {
    marginTop: 12,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.erro,
  },
  logoutTexto: { color: cores.erro, fontWeight: 'bold', fontSize: 16 },
});

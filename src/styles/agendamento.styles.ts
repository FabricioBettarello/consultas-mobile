import { StyleSheet } from 'react-native';
import { cores } from '../theme';

/**
 * Estilos da tela AgendamentoScreen.
 * Separados da lógica para facilitar manutenção e reuso.
 */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  icone: { fontSize: 64, marginBottom: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: cores.texto, marginBottom: 8 },
  texto: {
    fontSize: 15,
    color: cores.textoSecundario,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  botao: {
    backgroundColor: cores.primaria,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  botaoTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 16 },
});

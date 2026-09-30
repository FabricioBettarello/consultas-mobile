import { StyleSheet } from 'react-native';
import { cores } from '../theme';

/**
 * Estilos da tela MinhasConsultasScreen.
 * Separados da lógica para facilitar manutenção e reuso.
 */
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  novaButton: {
    backgroundColor: cores.primaria,
    margin: 16,
    marginBottom: 0,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  novaButtonTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 16 },
  lista: { padding: 16 },
});

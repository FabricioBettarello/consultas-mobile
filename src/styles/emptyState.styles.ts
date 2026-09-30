import { StyleSheet } from 'react-native';
import { cores } from '../theme';

/**
 * Estilos do componente EmptyState.
 * Separados da lógica para facilitar manutenção e reuso.
 */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  icone: {
    fontSize: 56,
    marginBottom: 16,
  },
  mensagem: {
    fontSize: 16,
    color: cores.textoSecundario,
    textAlign: 'center',
    lineHeight: 22,
  },
});

import { StyleSheet } from 'react-native';
import { cores } from '../theme';

/**
 * Estilos do componente Loading.
 * Separados da lógica para facilitar manutenção e reuso.
 */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cores.fundo,
    padding: 24,
  },
  texto: {
    marginTop: 12,
    fontSize: 15,
    color: cores.textoSecundario,
  },
});

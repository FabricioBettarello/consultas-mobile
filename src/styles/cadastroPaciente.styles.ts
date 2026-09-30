import { StyleSheet } from 'react-native';
import { cores } from '../theme';

/**
 * Estilos da tela CadastroPaciente (aba de cadastro).
 * Separados da lógica para facilitar manutenção e reuso.
 */
export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: cores.texto,
  },
  subtitulo: {
    fontSize: 14,
    color: cores.textoSecundario,
    marginTop: 4,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.texto,
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: cores.card,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: cores.texto,
  },
  inputErro: {
    borderColor: cores.erro,
  },
  mensagemErro: {
    color: cores.erro,
    fontSize: 13,
    marginTop: 6,
  },
  botao: {
    backgroundColor: cores.primaria,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  botaoTexto: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: '700',
  },
});

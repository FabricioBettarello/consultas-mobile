import { StyleSheet } from 'react-native';
import { cores } from '../theme';

/**
 * Estilos da tela PressaoArterialScreen.
 * Separados da lógica para facilitar manutenção e reuso.
 */
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  content: { padding: 24, alignItems: 'center' },
  icone: { fontSize: 56, marginTop: 16, marginBottom: 8 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: cores.texto },
  subtitulo: { fontSize: 14, color: cores.textoSecundario, marginBottom: 24 },
  linha: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
  campo: { flex: 1, maxWidth: 140 },
  label: { fontSize: 13, color: cores.textoSecundario, marginBottom: 6 },
  input: {
    backgroundColor: cores.card,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 22,
    textAlign: 'center',
    color: cores.texto,
  },
  separador: { fontSize: 24, color: cores.textoSecundario, paddingBottom: 12 },
  botao: {
    backgroundColor: cores.primaria,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 28,
  },
  botaoTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 16 },
  resultado: {
    marginTop: 28,
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    backgroundColor: cores.card,
  },
  resultadoTexto: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  emergenciaBotao: {
    marginTop: 16,
    backgroundColor: cores.erro,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  emergenciaTexto: { color: cores.branco, fontWeight: 'bold' },
});

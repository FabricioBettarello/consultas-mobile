import { StyleSheet } from 'react-native';

/**
 * Estilos da tela NovaConsultaScreen.
 * Separados da lógica para facilitar manutenção e reuso.
 */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#79059C',
    padding: 20,
    paddingTop: 24,
  },
  headerTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitulo: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  inputMultiline: {
    height: 100,
    paddingTop: 14,
  },
  selector: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorDesabilitado: {
    backgroundColor: '#f0f0f0',
    borderColor: '#e0e0e0',
  },
  selectorTexto: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectorPlaceholder: {
    fontSize: 16,
    color: '#aaa',
    flex: 1,
  },
  selectorIcone: {
    fontSize: 12,
    color: '#79059C',
    marginLeft: 8,
  },
  botaoAgendar: {
    backgroundColor: '#79059C',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  botaoAgendarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoCancelar: {
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoCancelarTexto: {
    color: '#666',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  modalItemSelecionado: {
    backgroundColor: '#f3e5f5',
  },
  modalItemTexto: {
    fontSize: 16,
    color: '#333',
  },
  modalItemTextoSelecionado: {
    color: '#79059C',
    fontWeight: '600',
  },
  modalFechar: {
    marginTop: 16,
    backgroundColor: '#79059C',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalFecharTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // ── Horários ──
  horariosGrid: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  horarioItem: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  horarioItemSelecionado: {
    backgroundColor: '#79059C',
    borderColor: '#79059C',
  },
  horarioItemTexto: {
    fontSize: 15,
    color: '#333',
  },
  horarioItemTextoSelecionado: {
    color: '#fff',
    fontWeight: '600',
  },
});

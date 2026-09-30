import { StyleSheet } from 'react-native';

/**
 * Estilos da tela HomeScreen (home do paciente).
 * Separados da lógica para facilitar manutenção e reuso.
 */
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 32, paddingTop: 20 },
  icone: { fontSize: 64, marginBottom: 12 },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitulo: { fontSize: 16, color: '#666', textAlign: 'center' },
  menu: { gap: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardPrimario: { borderLeftWidth: 5, borderLeftColor: '#79059C' },
  cardIcone: { fontSize: 40, marginBottom: 12 },
  cardTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescricao: { fontSize: 14, color: '#666', lineHeight: 20 },
  logoutButton: {
    marginTop: 32,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F44336',
  },
  logoutText: { color: '#F44336', fontWeight: 'bold', fontSize: 16 },
  footer: { marginTop: 24, alignItems: 'center' },
  footerText: { color: '#999', fontSize: 12 },
});

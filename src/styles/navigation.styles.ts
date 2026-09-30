import { StyleSheet } from 'react-native';

/**
 * Estilos da navegação (loading, badge do usuário no header e ícones das abas).
 * Separados da lógica para facilitar manutenção e reuso.
 */
export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerRight: {
    marginRight: 10,
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'flex-end',
  },
  userName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Ícone das abas do AppNavigator (a cor vem do tabBarIcon)
  tabIcone: {
    fontSize: 20,
  },
});

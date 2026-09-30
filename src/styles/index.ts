/**
 * Exportação centralizada dos estilos.
 *
 * Cada tela/componente importa o seu próprio arquivo (`../styles/<nome>.styles`);
 * este barrel existe para quem preferir importar vários estilos de uma vez.
 */

// Componentes
export { styles as inputStyles } from './input.styles';
export { styles as consultaCardStyles } from './consultaCard.styles';
export { styles as loadingStyles } from './loading.styles';
export { styles as emptyStateStyles } from './emptyState.styles';

// Telas
export { styles as loginStyles } from './login.styles';
export { styles as homeScreenStyles } from './homeScreen.styles';
export { styles as medicoHomeStyles } from './medicoHome.styles';
export { styles as adminStyles } from './admin.styles';
export { styles as consultasListStyles } from './consultasList.styles';
export { styles as minhasConsultasStyles } from './minhasConsultas.styles';
export { styles as consultaDetalhesStyles } from './consultaDetalhes.styles';
export { styles as novaConsultaStyles } from './novaConsulta.styles';
export { styles as agendamentoStyles } from './agendamento.styles';
export { styles as pressaoArterialStyles } from './pressaoArterial.styles';
export { styles as cadastroPacienteStyles } from './cadastroPaciente.styles';
export { styles as cadastroPacienteScreenStyles } from './cadastroPacienteScreen.styles';

// Navegação
export { styles as navigationStyles } from './navigation.styles';

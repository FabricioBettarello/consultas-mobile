/**
 * Tela de Nova Consulta (agendamento).
 *
 * Fluxo completo pedido na aula de 05/05/2026:
 * especialidade (modal) -> médico (filtrado pela especialidade) ->
 * data (máscara DD/MM/AAAA) -> horário (grid de 3 colunas) -> observações.
 *
 * Regras principais:
 * - Ao trocar a especialidade, o médico selecionado é limpo.
 * - Validação dos campos obrigatórios.
 * - Persistência via criarConsulta.
 * - Conversão da data de DD/MM/AAAA para AAAA-MM-DD antes de salvar.
 */

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import type { ConsultasStackParamList } from '../navigation/types';
import { criarConsulta } from '../services/consultasService';
import {
  ESPECIALIDADES,
  medicosPorEspecialidade,
  type Especialidade,
  type Medico,
  HORARIOS,
} from '../services/dados';
import { cores } from '../theme';
import { dataParaISO, maskData } from '../utils/masks';
import { validarData } from '../utils/validation';

type Navegacao = NativeStackNavigationProp<
  ConsultasStackParamList,
  'NovaConsulta'
>;

export default function NovaConsultaScreen() {
  const navigation = useNavigation<Navegacao>();
  const { usuario } = useAuth();

  const [especialidade, setEspecialidade] = useState<Especialidade | null>(null);
  const [medico, setMedico] = useState<Medico | null>(null);
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [modalEspecialidade, setModalEspecialidade] = useState(false);
  const [modalMedico, setModalMedico] = useState(false);
  const [salvando, setSalvando] = useState(false);

  // Médicos disponíveis dependem da especialidade escolhida.
  const medicosDisponiveis = useMemo(
    () => (especialidade ? medicosPorEspecialidade(especialidade.id) : []),
    [especialidade],
  );

  function selecionarEspecialidade(item: Especialidade) {
    setEspecialidade(item);
    // Ao trocar a especialidade, o médico anterior deixa de fazer sentido.
    setMedico(null);
    setModalEspecialidade(false);
  }

  function selecionarMedico(item: Medico) {
    setMedico(item);
    setModalMedico(false);
  }

  function abrirModalMedico() {
    if (!especialidade) {
      Alert.alert('Selecione a especialidade', 'Escolha a especialidade primeiro.');
      return;
    }
    setModalMedico(true);
  }

  async function handleSalvar() {
    const problemas: string[] = [];

    if (!especialidade) {
      problemas.push('Selecione a especialidade.');
    }
    if (!medico) {
      problemas.push('Selecione o médico.');
    }
    if (!validarData(data)) {
      problemas.push('Informe uma data válida (DD/MM/AAAA).');
    }
    if (!horario) {
      problemas.push('Selecione um horário.');
    }

    if (problemas.length > 0) {
      Alert.alert('Campos obrigatórios', problemas.join('\n'));
      return;
    }

    try {
      setSalvando(true);
      await criarConsulta({
        usuarioId: usuario?.id ?? '',
        especialidade: especialidade!.nome,
        medico: medico!.nome,
        // Converte DD/MM/AAAA -> AAAA-MM-DD antes de salvar.
        data: dataParaISO(data),
        horario,
        observacoes: observacoes.trim() ? observacoes.trim() : undefined,
      });

      Alert.alert('Consulta agendada!', 'Sua consulta foi registrada com sucesso.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível salvar a consulta. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>Nova Consulta</Text>
      <Text style={styles.subtitulo}>Agende uma nova consulta médica.</Text>

      {/* Especialidade */}
      <Text style={styles.label}>Especialidade</Text>
      <TouchableOpacity
        style={styles.seletor}
        onPress={() => setModalEspecialidade(true)}
      >
        <Text style={especialidade ? styles.seletorTexto : styles.seletorPlaceholder}>
          {especialidade ? especialidade.nome : 'Selecione a especialidade'}
        </Text>
        <Text style={styles.seletorSeta}>▾</Text>
      </TouchableOpacity>

      {/* Médico (filtrado pela especialidade) */}
      <Text style={styles.label}>Médico</Text>
      <TouchableOpacity
        style={[styles.seletor, !especialidade ? styles.seletorDesabilitado : null]}
        onPress={abrirModalMedico}
      >
        <Text style={medico ? styles.seletorTexto : styles.seletorPlaceholder}>
          {medico ? medico.nome : 'Selecione o médico'}
        </Text>
        <Text style={styles.seletorSeta}>▾</Text>
      </TouchableOpacity>

      {/* Data */}
      <Text style={styles.label}>Data</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        placeholderTextColor={cores.textoSecundario}
        value={data}
        onChangeText={(texto) => setData(maskData(texto))}
        keyboardType="numeric"
        maxLength={10}
      />

      {/* Horário em grid de 3 colunas */}
      <Text style={styles.label}>Horário</Text>
      <View style={styles.grid}>
        {HORARIOS.map((hora) => {
          const selecionado = hora === horario;
          return (
            <TouchableOpacity
              key={hora}
              style={[styles.horario, selecionado ? styles.horarioSelecionado : null]}
              onPress={() => setHorario(hora)}
            >
              <Text
                style={[
                  styles.horarioTexto,
                  selecionado ? styles.horarioTextoSelecionado : null,
                ]}
              >
                {hora}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Observações (opcional) */}
      <Text style={styles.label}>Observações (opcional)</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Ex.: Retorno, encaminhamento, sintomas..."
        placeholderTextColor={cores.textoSecundario}
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <TouchableOpacity
        style={[styles.botao, salvando ? styles.botaoDesabilitado : null]}
        onPress={handleSalvar}
        disabled={salvando}
      >
        <Text style={styles.botaoTexto}>
          {salvando ? 'Salvando...' : 'Agendar consulta'}
        </Text>
      </TouchableOpacity>

      {/* Modal de especialidade */}
      <ModalSelecao
        visivel={modalEspecialidade}
        titulo="Escolha a especialidade"
        dados={ESPECIALIDADES}
        onFechar={() => setModalEspecialidade(false)}
        onSelecionar={selecionarEspecialidade}
        rotulo={(item) => item.nome}
      />

      {/* Modal de médico */}
      <ModalSelecao
        visivel={modalMedico}
        titulo="Escolha o médico"
        dados={medicosDisponiveis}
        onFechar={() => setModalMedico(false)}
        onSelecionar={selecionarMedico}
        rotulo={(item) => item.nome}
      />
    </ScrollView>
  );
}

/** Modal genérico de seleção reutilizado por especialidade e médico. */
interface ModalSelecaoProps<T> {
  visivel: boolean;
  titulo: string;
  dados: T[];
  onFechar: () => void;
  onSelecionar: (item: T) => void;
  rotulo: (item: T) => string;
}

function ModalSelecao<T extends { id: string }>({
  visivel,
  titulo,
  dados,
  onFechar,
  onSelecionar,
  rotulo,
}: ModalSelecaoProps<T>) {
  return (
    <Modal
      visible={visivel}
      transparent
      animationType="slide"
      onRequestClose={onFechar}
    >
      <View style={styles.modalFundo}>
        <View style={styles.modalConteudo}>
          <Text style={styles.modalTitulo}>{titulo}</Text>
          <FlatList
            data={dados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => onSelecionar(item)}
              >
                <Text style={styles.modalItemTexto}>{rotulo(item)}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.modalVazio}>Nenhuma opção disponível.</Text>
            }
          />
          <TouchableOpacity style={styles.modalFechar} onPress={onFechar}>
            <Text style={styles.modalFecharTexto}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.texto,
    marginTop: 16,
    marginBottom: 6,
  },
  seletor: {
    backgroundColor: cores.card,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seletorDesabilitado: {
    backgroundColor: '#e2e8f0',
  },
  seletorTexto: {
    fontSize: 16,
    color: cores.texto,
  },
  seletorPlaceholder: {
    fontSize: 16,
    color: cores.textoSecundario,
  },
  seletorSeta: {
    fontSize: 16,
    color: cores.textoSecundario,
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
  textarea: {
    minHeight: 96,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  horario: {
    width: '31.5%',
    backgroundColor: cores.card,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  horarioSelecionado: {
    backgroundColor: cores.primaria,
    borderColor: cores.primaria,
  },
  horarioTexto: {
    fontSize: 15,
    color: cores.texto,
  },
  horarioTextoSelecionado: {
    color: cores.branco,
    fontWeight: '700',
  },
  botao: {
    backgroundColor: cores.primaria,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  botaoTexto: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: '700',
  },
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  modalConteudo: {
    backgroundColor: cores.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: cores.texto,
    marginBottom: 12,
  },
  modalItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: cores.fundo,
  },
  modalItemTexto: {
    fontSize: 16,
    color: cores.texto,
  },
  modalVazio: {
    fontSize: 14,
    color: cores.textoSecundario,
    paddingVertical: 16,
    textAlign: 'center',
  },
  modalFechar: {
    marginTop: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalFecharTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: cores.primaria,
  },
});

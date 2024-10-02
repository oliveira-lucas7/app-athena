import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, parse } from 'date-fns';

const subjectOptions = [
  { value: 'Língua Portuguesa', label: 'Língua Portuguesa' },
  { value: 'Matemática', label: 'Matemática' },
  { value: 'Biologia', label: 'Biologia' },
  { value: 'Física', label: 'Física' },
  { value: 'Química', label: 'Química' },
  { value: 'História', label: 'História' },
  { value: 'Geografia', label: 'Geografia' },
  { value: 'Inglês', label: 'Língua Inglesa' },
  { value: 'Educação_Física', label: 'Educação Física' },
  { value: 'Artes', label: 'Artes' }
];

const recipientsOptions = [
  { value: '1ano', label: '1º Ano' },
  { value: '2ano', label: '2º Ano' },
  { value: '3ano', label: '3º Ano' },
  { value: '4ano', label: '4º Ano' },
  { value: '5ano', label: '5º Ano' },
  { value: '6ano', label: '6º Ano' },
  { value: '7ano', label: '7º Ano' },
  { value: '8ano', label: '8º Ano' },
  { value: '9ano', label: '9º Ano' },
  { value: '1medio', label: '1º Médio' },
  { value: '2medio', label: '2º Médio' },
  { value: '3medio', label: '3º Médio' },
];

const CadastroTarefas = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [content, setContent] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [IdProfessor, setIdProfessor] = useState('');
  const [schoolProfessor, setSchoolProfessor] = useState('');
  const [tipoQuestao, setTipoQuestao] = useState('');
  const [alternativas, setAlternativas] = useState([{ text: '', isCorrect: false }]);

  const handleTipoQuestaoChange = (value) => {
    setTipoQuestao(value);
    if (value === 'dissertativa') {
      setAlternativas([{ text: '', isCorrect: false }]);
    }
  };

  const handleAlternativaChange = (index, value) => {
    const novasAlternativas = [...alternativas];
    novasAlternativas[index].text = value;
    setAlternativas(novasAlternativas);
  };

  const handleCorrectChange = (index) => {
    const novasAlternativas = alternativas.map((alt, i) => ({
      ...alt,
      isCorrect: i === index
    }));
    setAlternativas(novasAlternativas);
  };

  const adicionarAlternativa = () => {
    setAlternativas([...alternativas, { text: '', isCorrect: false }]);
  };

  useEffect(() => {
    const fetchProfessorData = async () => {
      try {
        const token = await AsyncStorage.getItem('userId');
        if (!token) {
          console.error('Token não encontrado');
          return;
        }

        const response = await fetch("http://192.168.56.1:/user", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        const json = await response.json();
        setIdProfessor(json.message._id);
        setSchoolProfessor(json.message.Idschool);
      } catch (error) {
        console.error("Erro ao buscar professor:", error);
      }
    };

    fetchProfessorData();
  }, []);

  const CadastrarTarefa = async () => {
    try {
      const token = await AsyncStorage.getItem('userId');
      if (!token) {
        console.error('Token não encontrado');
        return;
      }
  
      console.log("selectedSubject:", selectedSubject);
      console.log("content:", content);
      console.log("dueDate:", selectedDate);
      console.log("tipoQuestao:", tipoQuestao);
      console.log("selectedRecipients:", selectedRecipients);
      console.log("alternativas:", alternativas);
  
      // Validação de campos obrigatórios
      if (!selectedSubject || !content || !selectedDate || !tipoQuestao) {
        console.error('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
  
      if (tipoQuestao === 'alternativa' && !alternativas.some(alt => alt.isCorrect)) {
        console.error('Pelo menos uma alternativa deve ser marcada como correta.');
        return;
      }
  
      // Convertendo a data para o formato ISO
      const parsedDate = parse(selectedDate, 'dd/MM/yyyy', new Date());
      const formattedDate = format(parsedDate, 'yyyy-MM-dd');
  
      const response = await fetch("http://192.168.56.1:3030/tasks/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          subject: selectedSubject,
          content: content,
          dueDate: formattedDate, // Usando a data formatada
          recipients: selectedRecipients,
          attachment: 20,
          professorId: IdProfessor,
          status: "em andamento",
          class: '66fc22f1c3fbe6f5be1b366f',
          school: '66fbfd0f80c681d1d2970824',
          alternatives: tipoQuestao === 'alternativa' ? alternativas : [],
        })
      });
  
      const json = await response.json();
      console.log("Tarefa cadastrada com sucesso:", json);
    } catch (error) {
      console.error("Erro ao cadastrar tarefa:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastre uma Tarefa</Text>

      <Text style={styles.label}>Selecione a Disciplina:</Text>
      <Picker
        selectedValue={selectedSubject}
        onValueChange={(itemValue) => setSelectedSubject(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma disciplina" value="" />
        {subjectOptions.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Digite a data"
        value={selectedDate}
        onChangeText={setSelectedDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite a pergunta da tarefa"
        value={content}
        onChangeText={setContent}
      />

      <View style={styles.radioContainer}>
        <RadioButton.Group onValueChange={handleTipoQuestaoChange} value={tipoQuestao}>
          <View style={styles.radioOption}>
            <RadioButton value="alternativa" />
            <Text style={styles.radioText}>Questão Alternativa</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="dissertativa" />
            <Text style={styles.radioText}>Questão Dissertativa</Text>
          </View>
        </RadioButton.Group>
      </View>

      {tipoQuestao === 'alternativa' && (
        <View style={styles.alternativasContainer}>
          <Text style={styles.label}>Alternativas:</Text>
          {alternativas.map((alternativa, index) => (
            <View key={index} style={styles.alternativaContainer}>
              <TextInput
                style={styles.inputAlternativa}
                placeholder={`Alternativa ${index + 1}`}
                value={alternativa.text}
                onChangeText={(value) => handleAlternativaChange(index, value)}
              />
              <RadioButton
                value={index.toString()}
                status={alternativa.isCorrect ? 'checked' : 'unchecked'}
                onPress={() => handleCorrectChange(index)}
              />
              <Text style={styles.radioText}>Certa</Text>
            </View>
          ))}
          <Button title="Adicionar Alternativa" onPress={adicionarAlternativa} />
        </View>
      )}

      <Text style={styles.label}>Selecione o Destinatário:</Text>
      <Picker
        selectedValue={selectedRecipients.length > 0 ? selectedRecipients[selectedRecipients.length - 1].value : ''}
        onValueChange={(itemValue, itemIndex) => {
          const foundRecipient = recipientsOptions[itemIndex];
          if (foundRecipient && !selectedRecipients.includes(foundRecipient)) {
            setSelectedRecipients(prev => [...prev, foundRecipient]);
          }
        }}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um destinatário" value="" />
        {recipientsOptions.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>

      <Button title="Cadastrar Tarefa" onPress={CadastrarTarefa} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#000', // Fundo preto
    justifyContent: 'center', // Centraliza verticalmente
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E9CFA', // Azul
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#1E9CFA', // Azul
    marginBottom: 20,
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  inputAlternativa: {
    borderBottomWidth: 1,
    borderColor: '#1E9CFA', // Azul
    marginBottom: 20,
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: "80%"
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center', // Centraliza horizontalmente
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  alternativasContainer: {
    marginBottom: 20,
  },
  alternativaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E9CFA', // Azul
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderColor: '#1E9CFA', // Azul
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  radioText: {
    color: '#1E9CFA', // Azul
  },
});

export default CadastroTarefas;

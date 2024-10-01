import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";
import { AuthContext } from "../context/AuthContext";
import { Picker } from '@react-native-picker/picker';
import { fetchSchools, fetchClasses } from "../data/index"; // Ajuste o caminho conforme necessário

export default function CadastroUsuario() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState({
    street: "",
    cep: "",
    state: "",
    city: "",
  });
  const [role, setRole] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [classId, setClassId] = useState("");
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const { RealizaCadastro, error, successCadastro, resetError, cadastro } =
    useContext(AuthContext);

  useEffect(() => {
    resetError();
    loadSchools();
    loadClasses();
  }, []);

  useEffect(() => {
    if (error) {
      setAlertVisible(true);
      setAlertMessage("Erro ao cadastrar. Tente novamente.");
      setAlertType("error");
    } else if (successCadastro) {
      setAlertVisible(true);
      setAlertMessage("Cadastro realizado com sucesso!");
      setAlertType("success");
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
    }
  }, [error, cadastro, successCadastro]);


  const closeAlert = () => {
    setAlertVisible(false);
  };


  const loadSchools = async () => {
    try {
      const data = await fetchSchools();

      if (Array.isArray(data)) {
        setSchools(data);
      } else {
        setSchools([]);
        setAlertVisible(true);
        setAlertMessage("Dados de escolas inválidos.");
        setAlertType("error");
      }
    } catch (error) {
      setAlertVisible(true);
      setAlertMessage("Erro ao carregar escolas.");
      setAlertType("error");
    }
  };

  const loadClasses = async () => {
    try {
      const data = await fetchClasses(); // Carregue todas as classes

      if (Array.isArray(data)) {
        setClasses(data);
      } else {
        setClasses([]);
        setAlertVisible(true);
        setAlertMessage("Dados de classe inválidos.");
        setAlertType("error");
      }
    } catch (error) {
      setAlertVisible(true);
      setAlertMessage("Erro ao carregar classes.");
      setAlertType("error");
    }
  };

  const handleCadastro = () => {
    if (password !== confirmPassword) {
      setAlertVisible(true);
      setAlertMessage("As senhas não coincidem.");
      setAlertType("error");
      return;
    }

    const userData = {
      name,
      email,
      phone,
      password,
      cpf,
      address,
      role,
      IdSchool: schoolId,
      IdClass: classId,
    };    
    RealizaCadastro(userData);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      <View style={styles.section}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Nome"
            placeholderTextColor="#fff"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#fff"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Telefone"
            placeholderTextColor="#fff"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Senha"
            secureTextEntry
            placeholderTextColor="#fff"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Confirme a Senha"
            secureTextEntry
            placeholderTextColor="#fff"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="CPF"
            placeholderTextColor="#fff"
            value={cpf}
            onChangeText={(text) => setCpf(text)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Rua"
            placeholderTextColor="#fff"
            value={address.street}
            onChangeText={(text) => setAddress({ ...address, street: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="CEP"
            placeholderTextColor="#fff"
            value={address.cep}
            onChangeText={(text) => setAddress({ ...address, cep: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Estado"
            placeholderTextColor="#fff"
            value={address.state}
            onChangeText={(text) => setAddress({ ...address, state: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Cidade"
            placeholderTextColor="#fff"
            value={address.city}
            onChangeText={(text) => setAddress({ ...address, city: text })}
          />
        </View>

        <View style={styles.inputView}>
          <Picker
            selectedValue={schoolId}
            onValueChange={(itemValue) => setSchoolId(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione a Escola" value="" />
            {schools.map((school) => (
              <Picker.Item key={school._id} label={school.name} value={school._id} />
            ))}
          </Picker>
        </View>

        <View style={styles.inputView}>
          <Picker
            selectedValue={classId}
            onValueChange={(itemValue) => setClassId(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione a Classe" value="" />
            {classes.map((classItem) => (
              <Picker.Item key={classItem._id} label={classItem.name} value={classItem._id} />
            ))}
          </Picker>
        </View>

        <View style={styles.inputView}>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione o Cargo" value="" />
            <Picker.Item label="Diretor" value="diretor" />
            <Picker.Item label="Professor" value="professor" />
            <Picker.Item label="Estudante" value="estudante" />
            <Picker.Item label="Coordenador" value="coordenador" />
            <Picker.Item label="Inspetor" value="inspetor" />
            <Picker.Item label="Limpeza" value="limpeza" />
            <Picker.Item label="Cozinha" value="cozinha" />
            <Picker.Item label="Outro" value="outro" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleCadastro}>
          <Text style={styles.loginText}>CADASTRAR</Text>
        </TouchableOpacity>

        <Modal
          visible={alertVisible}
          transparent
          animationType="fade"
          onRequestClose={closeAlert}
        >
          <TouchableWithoutFeedback onPress={closeAlert}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <CustomAlert
            message={alertMessage}
            type={alertType}
            onClose={closeAlert}
          />
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 15,
    paddingVertical: 100,
  },
  section: {
    width: "100%",
    alignItems: "center",
  },
  inputView: {
    width: "85%",
    backgroundColor: "#696969",
    borderRadius: 5,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 65,
    color: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#fff",
  },
  loginBtn: {
    width: "85%",
    backgroundColor: "#32CD32",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    margin: 10,
    fontSize: 40,
    fontWeight: "500",
    color: "white"
  }
});

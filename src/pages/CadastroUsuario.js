import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";
import { AuthContext } from "../context/AuthContext";

export default function CadastroUsuario() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const { RealizaCadastro, error, successCadastro, resetError, cadastro } =
    useContext(AuthContext);

  useEffect(() => {
    resetError();
  }, [])

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

  function closeAlert() {
    setAlertVisible(false);
  }

  function Cadastro() {
    RealizaCadastro(email, username, password, phone);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      <View style={styles.section}>
        <View style={styles.inputView}>
          <TextInput
            inputMode="text"
            style={styles.inputText}
            placeholder="Nome de usuário"
            placeholderTextColor="#fff"
            value={username}
            onChangeText={(digitado) => setUsername(digitado)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            inputMode="email"
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#fff"
            value={email}
            onChangeText={(digitado) => setEmail(digitado)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            inputMode="numeric"
            style={styles.inputText}
            placeholder="Telefone"
            placeholderTextColor="#fff"
            value={phone}
            onChangeText={(digitado) => setPhone(digitado)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            inputMode="text"
            secureTextEntry
            style={styles.inputText}
            placeholder="Senha"
            placeholderTextColor="#fff"
            value={password}
            onChangeText={(digitado) => setPassword(digitado)}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={Cadastro}>
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
  img: {
    width: "95%",
    height: "20%",
    marginTop: 25,
  },
  title: {
    margin: 10,
    fontSize: 40,
    fontWeight: "500",
    color: "white"
  }
});

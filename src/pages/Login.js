import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CustomAlert from "../components/CustomAlert";
import { Modal } from "react-native";

export default function Login() {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const { Login, error, logado, successLogin, resetError } = useContext(AuthContext);

  function RealizaLogin() {
    Login(email, senha);
  }

  useEffect(()=> {
    resetError();
  }, [])

  useEffect(() => {
    if (error) {
      setAlertVisible(true);
      setAlertMessage("Erro ao fazer login. Tente novamente.");
      setAlertType("error");
    } else if (successLogin) {
      setAlertVisible(true);
      setAlertMessage("Login realizado com sucesso!");
      setAlertType("success");
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
    }
  }, [error, logado, Login]);

  function closeAlert() {
    setAlertVisible(false);
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerImage}>
        <Image style={styles.Image}
            source={require('../images/logo-athena.png')}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          inputMode="email"
          style={styles.inputText}
          placeholder="Email do usuário"
          placeholderTextColor="#161616"
          value={email}
          onChangeText={(digitado) => setEmail(digitado)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          inputMode="text"
          secureTextEntry
          style={styles.inputText}
          placeholder="Senha"
          placeholderTextColor="#161616"
          value={senha}
          onChangeText={(digitado) => setSenha(digitado)}
        />
      </View>
      <TouchableOpacity style={styles.forgotBtn}>
        <Text style={styles.forgotText}>Esqueceu a senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={RealizaLogin}>
        <Text style={styles.loginText}>ENTRAR</Text>
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
  },
  inputView: {
    width: "95%",
    backgroundColor: "#BCC7CF",
    borderRadius: 5,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 65,
    color: "#161616",
  },
  loginBtn: {
    width: "95%",
    backgroundColor: "#1E9CFA",
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
  forgotBtn: {
    width: "95%",
    alignItems: "flex-end",
    marginBottom: 30,
  },
  forgotText: {
    color: "#fff",
    fontSize: 15,
    color: "#1E9CFA",
  },
  errorContainer: {
    marginTop: 10,
  },
  errorText: {
    color: "red",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  img: {
    width: "95%",
    height: "20%",
  },
  containerImage: {
    width: "85%",
    display: "flex",
    alignItems: "center",
    marginBottom: 60
  },

});

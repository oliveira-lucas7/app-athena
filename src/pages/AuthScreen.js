import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import Login from "./Login";
import CadastroUsuario from "./CadastroUsuario";
import { AuthContext } from "../context/AuthContext";

export default function AuthScreen() {
  const { showCadastro, toggleScreen } = useContext(AuthContext);

  return (
    <>
      {showCadastro ? <CadastroUsuario /> : <Login />}
      <TouchableHighlight
        style={styles.button}
        onPress={toggleScreen}
      >
        <Text style={styles.buttonText}>
          {showCadastro
            ? "Já tem uma conta? Faça login"
            : "Não tem uma conta? Cadastre-se"}
        </Text>
      </TouchableHighlight>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#32CD32',
    padding: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

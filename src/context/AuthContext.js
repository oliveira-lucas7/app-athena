import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext(0);

function AuthProvider({ children }) {
  const [logado, setLogado] = useState(false);
  const [successLogin, setSuccessLogin] = useState(null);
  const [successCadastro, setSuccessCadastro] = useState(false);
  const [userInfos, setUserInfos] = useState([]);
  const [error, setError] = useState(false);
  const [realizouLogout, setRealizouLogout] = useState(false);
  const [cadastro, setCadastro] = useState(false);

  const [showCadastro, setShowCadastro] = useState(false); 
  
  async function RealizaCadastro(email, username, password, phone) {
    await fetch("http://10.139.75.37:5251/api/Usuario/CreateUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        usuarioEmail: email,
        usuarioNome: username,
        usuarioSenha: password,
        usuarioTelefone: phone,
      }),
    })
      .then((res) => {
        if (res.status == 200) {
          setError(false);
          setSuccessCadastro(true);
          setTimeout(() => {
            setSuccessCadastro(false);
            setShowCadastro(false);
          }, 2000);
        } else {
          setError(true);
        }
      })
      .catch((err) => setError(true));
  }

  async function Login(email, senha) {
    await fetch("http://10.139.75.37:5251/api/Usuario/Login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        UsuarioEmail: email,
        UsuarioSenha: senha,
      }),
    })
      .then((res) => res.json())
      .then(async (json) => {
        if (json.success) {
          try {
            await AsyncStorage.setItem(
              "userId",
              json.user.usuarioId.toString()
            );
          } catch (err) {
            setError(true);
          }
          setError(false)
          setSuccessLogin(true);
          setTimeout(() => {
            setLogado(true);
            setRealizouLogout(false);
            setSuccessLogin(false);
          }, 2000);
        } else {
          setError(true);
        }
      })
      .catch((err) => setError(true));
  }

  async function getUserDetails(){
    const userId = await AsyncStorage.getItem("userId");
    await fetch ( "http://10.139.75.37:5251/api/Usuario/GetUserId/" + userId, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
    .then((res) => res.json())
      .then((json) => {
        setUserInfos(json)
      })
      .catch((err) => setError(true));
  }

  async function Logout()
  {
    removeUserFromStorage();
    setLogado(false);
    setRealizouLogout(true)
  }

  const removeUserFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      console.log('Usuário removido do AsyncStorage');
    } catch (e) {
      console.error('Erro ao remover usuário do AsyncStorage:', e);
    }
  };
  function toggleScreen() {
    setError(false)
    setShowCadastro(!showCadastro);
  }

  function resetError() {
    setError(false);
  }

  return (
    <AuthContext.Provider
      value={{
        logado,
        Login,
        resetError,
        error,
        cadastro,
        RealizaCadastro,
        showCadastro,
        toggleScreen,
        successCadastro,
        successLogin,
        userInfos,
        getUserDetails,
        Logout,
        realizouLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

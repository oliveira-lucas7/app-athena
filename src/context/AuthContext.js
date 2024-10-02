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
  
  async function RealizaCadastro(userData) {
    console.log(userData)
      await fetch("http://192.168.56.1:3030/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
      .then((res) => res.json())
      .then( async (json) => {
        if (json.token) {
          try {
            await AsyncStorage.setItem(
              "userId",
              json.token.toString()
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
      } ) 
      .catch((err) => {setError(true)
        console.log(err)
      });
    
  }
  
  async function Login(email, senha) {

    console.log(email, senha)
    await fetch("http://192.168.56.1:3030/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: senha,
      }),
    })
      .then((res) => res.json())
      .then(async (json) => {
        if (json.token) {
          try {
            await AsyncStorage.setItem(
              "userId",
              json.token.toString()
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
      .catch((err) => {setError(true)
        console.log(err)
      });
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

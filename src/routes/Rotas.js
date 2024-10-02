import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext, useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

import Home from "../pages/Home";
import CadastroTarefas from "../pages/CadastroTarefa";
import AuthScreen from "../pages/AuthScreen";

export default function Rotas() {
  const { logado, realizouLogout } = useContext(AuthContext);
  const [usuarioSalvoNoAsyncS, setUsuarioSalvoNoAsyncS] = useState(false);

  const verificarUsuarioAsyncStorage = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId !== null) {
      setUsuarioSalvoNoAsyncS(true);
    }
  };
  useEffect(() => {
    verificarUsuarioAsyncStorage();
  }, []);

  useEffect(() => {
    verificarUsuarioAsyncStorage();
  }, [logado])

  if(realizouLogout)
    {
      return(
        <AuthScreen/>
      )
    }

  return (
    <NavigationContainer>
      {logado || usuarioSalvoNoAsyncS ? (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#32CD32",
            tabBarInactiveTintColor: "white",
            tabBarStyle: { backgroundColor: "black", height: 60 },
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="home-circle-outline"
                  color={color}
                  size={40}
                />
              ),
            }}
          />
           <Tab.Screen
            name="Cadastrar Tarefa"
            component={CadastroTarefas}
            options={{
              tabBarLabel: "Obs",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="plus-circle-outline"
                  color={color}
                  size={40}
                />
              ),
            }}
          />
                    {/*
          <Tab.Screen
            name="Buscar pessoa"
            component={Busca}
            options={{
              tabBarLabel: "Busca",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="card-search-outline" color={color} size={40} />
              ),
            }}
          />
          <Tab.Screen
            name="User"
            component={User}
            options={{
              tabBarLabel: "User",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account-cog-outline" color={color} size={40} />
              ),
            }}
          /> */}
        </Tab.Navigator>
      ) : (
        <AuthScreen />
      )}
    </NavigationContainer>
  );
}

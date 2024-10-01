import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Animated,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function Home() {
  const fade = useRef(new Animated.Value(0)).current;
  const [onDetails, setOnDetails] = useState(false);


  useFocusEffect(
    React.useCallback(() => {
      fade.setValue(0);
      Animated.timing(fade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, [])
  );

  // const [objetos, setObjetos] = useState([]);
  // const [error, setError] = useState(false);

  // async function getObjetos() {
  //   await fetch("http://10.139.75.37:5251/api/Objeto/GetAllMissingObj", {
  //     method: "GET",
  //     headers: { "content-type": "application/json" },
  //   })
  //     .then((res) => (res.status == 200 ? res.json() : false))
  //     .then((json) => setObjetos(json))
  //     .catch((err) => setError(true));
  // }
  // useEffect(() => {
  //   setOnNovaObservacao(false);
  //   setOnDetails(false);
  //   getObjetos();
  // }, []);
  // const handleDetails = (objeto) => {
  //   setSelectedObjeto(objeto);
  //   setOnDetails(true);
  //   setOnNovaObservacao(false);
  // };

  // const handleNovaObservacao = () => {
  //   setOnNovaObservacao(true);
  //   setOnDetails(false);
  // };
  // const handleHome = () => {
  //   setOnNovaObservacao(false);
  //   setOnDetails(false);
  // };

  // if (onNovaObservacao) {
  //   return (
  //     <>
  //       <CriarObservacao
  //         objetoId={selectedObjeto.objetoId}
  //         usuarioId={selectedObjeto.usuarioId}
  //         backToHome={() => handleHome()}
  //       />
  //     </>
  //   );
  // }

  // if (onDetails) {
  //   return (
  //     <>
  //       <Detalhes
  //         objeto={selectedObjeto}
  //         setOnDetails={setOnDetails}
  //         onNovaObs={() => handleNovaObservacao()}
  //       />
  //     </>
  //   );
  // }
  return (
    <View style={styles.container}>
      <StatusBar/>
      <Animated.View style={{ height: "100%", width: "100%", opacity: fade }}>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 30,
    marginLeft: 10,
    fontWeight: "bold",
    color: "white",
  },
  lista: {
    width: "100%",
    display: "flex",
  },
  img: {
    width: "95%",
    height: "20%",
    marginTop: 25,
  },
});

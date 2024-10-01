import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const CustomAlert = ({ message, type, onClose }) => {
  const backgroundColor = type === "success" ? "#32CD32" : "#FF0000";
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeButton}>Fechar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  message: {
    color: "white",
    flex: 1,
  },
  closeButton: {
    color: "white",
    marginLeft: 10,
  },
});

export default CustomAlert;

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const VotingCard = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text>Vote now</Text>
    </TouchableOpacity>
  );
};

export default VotingCard;

const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: "limegreen",
    alignItems: "center",
    alignSelf: "center",
    width: "60%",
    borderRadius: 100,
  },
});

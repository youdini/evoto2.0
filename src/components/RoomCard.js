import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RoomCard = ({ roomName, roomId }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        elevation: 2,
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 40,
        marginTop: 20,
      }}
      onPress={() =>
        navigation.navigate("RoomScreen", {
          roomName: roomName,
        })
      }
    >
      <Text>{roomName}</Text>
      <Text>{roomId}</Text>
    </TouchableOpacity>
  );
};

export default RoomCard;

const styles = StyleSheet.create({});

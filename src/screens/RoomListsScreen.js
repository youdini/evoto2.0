import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const RoomListsScreen = ({ route, navigation: { navigate } }) => {
  const [rooms, setRooms] = React.useState([]);

  const user = auth().currentUser;
  const roomRef = firestore()
    .collection("rooms")
    .where("members", "array-contains", user.uid);

  useEffect(() => {
    const subscriber = roomRef.onSnapshot((querySnapshot) => {
      const roomData = [];
      querySnapshot.forEach((doc) => {
        roomData.push({ ...doc.data(), key: doc.id });
      });
      setRooms(roomData);
    });
    return () => subscriber();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        // style={{ backgroundColor: "pink" }}
        data={rooms}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              elevation: 2,
              paddingVertical: 30,
              paddingHorizontal: 20,
              borderRadius: 20,
              marginHorizontal: 40,
              margin: 10,
            }}
            onPress={() =>
              navigate("RoomScreen", {
                title: item.roomName,
                room: item,
              })
            }
          >
            <Text>{item.roomName}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={{ padding: 10 }} />
    </View>
  );
};

export default RoomListsScreen;

const styles = StyleSheet.create({});

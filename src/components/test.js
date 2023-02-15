import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import * as firebase from "firebase";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState("");

  const handleCreateRoom = () => {
    firebase
      .database()
      .ref("rooms")
      .push({
        roomName,
        members: [firebase.auth().currentUser.uid]
      })
      .then(ref => {
        setRoomName("");
        setRooms([...rooms, { roomName, roomId: ref.key }]);
      });
  };

  const handleJoinRoom = () => {
    firebase
      .database()
      .ref(rooms/${roomId}/members)
      .once("value")
      .then(snapshot => {
        if (snapshot.exists()) {
          const members = snapshot.val();
          members.push(firebase.auth().currentUser.uid);
          firebase
            .database()
            .ref(rooms/${roomId})
            .update({ members })
            .then(() => {
              setRooms([...rooms, { roomName }]);
            });
        }
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Enter room name"
        value={roomName}
        onChangeText={setRoomName}
      />
      <TouchableOpacity onPress={handleCreateRoom}>
        <Text>Create Room</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Enter room ID"
        value={roomId}
        onChangeText={setRoomId}
      />
      <TouchableOpacity onPress={handleJoinRoom}>
        <Text>Join Room</Text>
      </TouchableOpacity>
      <FlatList
        data={rooms.filter(room =>
          room.members.includes(firebase.auth().currentUser.uid)
        )}
        keyExtractor={item => item.roomName}
        renderItem={({ item }) => <Text>{item.roomName}</Text>}
      />
    </View>
  );
};

export default CreateRoom;
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Modal, Card, Input, Text } from "@ui-kitten/components";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { OptionIcon } from "../../assets/OptionIcon";

const RoomScreen = ({ route, navigation: { navigate } }) => {
  const [description, setDescription] = useState("");
  const [pollName, setPollName] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [polls, setPolls] = useState([]);
  // admin data
  const [admins, setAdmins] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const { room } = route.params;
  const user = auth().currentUser;
  // roomref
  const roomRef = firestore().collection("rooms").doc(room.key);

  const pollRef = firestore().collection("polls");
  const pollItems = pollRef.where("roomId", "==", room.key);

  useEffect(() => {
    const unsubscribe = roomRef.onSnapshot((doc) => {
      setAdmins(doc.data().admins);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const subscriber = roomRef.onSnapshot((snapshot) => {
      setDescription(snapshot.data().description);
    });
    return () => subscriber();
  }, []);

  useEffect(() => {
    setIsAdmin(admins.includes(user.uid));
  });

  useEffect(() => {
    const subscriber = pollItems.onSnapshot((snapshot) => {
      const pollsData = [];
      snapshot.forEach((doc) => {
        pollsData.push({ ...doc.data(), key: doc.id });
      });
      setPolls(pollsData);
    });
    return () => subscriber();
  }, []);

  const data = {
    createdBy: user.uid,
    pollName: pollName,
    createdAt: firestore.FieldValue.serverTimestamp(),
    roomId: room.key,
  };

  const createPoll = () => {
    try {
      pollRef.add(data);
      console.log(pollRef.doc().id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.iconContainer}>
              <Text
                category="h6"
                style={{
                  margin: 10,
                  alignSelf: "flex-start",
                  position: "absolute",
                }}
              >
                Description
              </Text>
              <TouchableOpacity
                style={styles.icon}
                onPress={() =>
                  navigate("RoomSettingScreen", {
                    id: room.key,
                    name: room.roomName,
                    desc: room.description,
                  })
                }
              >
                <OptionIcon />
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text>{description}</Text>
            </View>
            <Text category="h6" style={{ margin: 10 }}>
              Voting Rooms
            </Text>
          </>
        }
        ListHeaderComponentStyle={{}}
        data={polls}
        renderItem={({ item }) => (
          <View style={{ flexGrow: 1, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.vrButton}
              onPress={() =>
                navigate(isAdmin ? "VotingScreen" : "VotingScreenUser", {
                  title: item.pollName,
                  poll: item,
                })
              }
            >
              <Text>{item.pollName}</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={<View style={{ height: 100 }} />}
        bounces={true}
      />

      {isAdmin ? (
        <View>
          <Button style={styles.button} onPress={() => setModalVisible(true)}>
            Create a poll
          </Button>
        </View>
      ) : null}

      <Modal
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setModalVisible(false)}
        style={{ width: "80%" }}
      >
        <Card disabled={true}>
          <Input
            placeholder="Poll Name"
            value={pollName}
            onChangeText={(text) => setPollName(text)}
          />
          <Button onPress={createPoll}>Publish</Button>
        </Card>
      </Modal>
    </View>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "flex-end",
  },
  icon: {
    padding: 5,
    borderRadius: 100,
    backgroundColor: "#fff",
    elevation: 2,
    margin: 5,
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    alignSelf: "center",
  },
  button: {
    borderRadius: 50,
    width: "60%",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  backdrop: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  vrButton: {
    backgroundColor: "#fff",
    paddingVertical: 30,
    marginHorizontal: 20,
    width: "60%",
    alignItems: "center",
    borderRadius: 15,
    elevation: 3,
    margin: 10,
  },
});

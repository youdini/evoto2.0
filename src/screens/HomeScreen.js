import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Input,
  Modal,
  Spinner,
  Divider,
  Text,
} from "@ui-kitten/components";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import ProfileContainer from "../components/ProfileContainer";

const HomeScreen = ({ navigation: { navigate } }) => {
  // modal state variables
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [roomExist, setroomExist] = useState(false);
  const [correctRoom, setcorrectRoom] = useState(false);
  const [incorrectRoom, setincorrectRoom] = useState(false);

  // input state variables
  const [value, setValue] = useState("");

  const user = auth().currentUser;
  const userCollection = firestore().collection("users").doc(user.uid);

  const data = {
    name: user.displayName,
    id: user.uid,
    email: user.email,
    photoURL: user.photoURL,
    course: "",
    yrandsec: "",
    address: "",
    description: "",
  };

  // make a document if user does not exist
  useEffect(() => {
    const fetch = async () => {
      try {
        const exist = (await userCollection.get()).exists;
        if (!exist) userCollection.set(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, [user.uid]);

  const handleJoinRoom = async () => {
    const roomId = value;
    const roomCollection = firestore().collection("rooms").doc(roomId);
    const exist = (await roomCollection.get()).exists;
    console.log(exist);
    setLoading(true);
    if (!exist) {
      setTimeout(() => {
        setLoading(false);
        setroomExist(false);
        setincorrectRoom(true);
      }, 2000);
    } else {
      roomCollection.update({
        members: firestore.FieldValue.arrayUnion(user.uid),
      });
      setTimeout(() => {
        setLoading(false);
        setroomExist(true);
        setcorrectRoom(true);
      }, 2000);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* modal if room exist or not */}

      {roomExist ? (
        <Modal
          visible={correctRoom}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => {
            setValue("");
            setcorrectRoom(false);
          }}
          style={styles.modal}
        >
          <Card disabled={true} style={styles.cardModal}>
            <Text
              style={{ marginBottom: 30, alignSelf: "center" }}
              category="s1"
            >
              You have joined the room.
            </Text>
            <Divider />
            <Button
              onPress={() => {
                setValue("");
                setcorrectRoom(false);
              }}
              style={{ alignSelf: "flex-end", marginTop: 10 }}
              size="small"
            >
              OK
            </Button>
          </Card>
        </Modal>
      ) : (
        <Modal
          visible={incorrectRoom}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setincorrectRoom(false)}
          style={styles.modal}
        >
          <Card disabled={true} style={styles.cardModal}>
            <Text
              style={{ marginBottom: 30, alignSelf: "center" }}
              category="s1"
            >
              Sorry, room code does not exist.
            </Text>
            <Divider />
            <Button
              onPress={() => {
                setValue("");
                setincorrectRoom(false);
              }}
              style={{ alignSelf: "flex-end", marginTop: 10 }}
              size="small"
            >
              OK
            </Button>
          </Card>
        </Modal>
      )}

      {/* loading splash screen */}
      <Modal visible={loading} backdropStyle={styles.backdrop}>
        <Spinner />
      </Modal>

      {/* modal for inputting the room code */}
      <Modal
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => {
          setValue("");
          setModalVisible(false);
        }}
        style={styles.modal}
      >
        <Card disabled={true} style={styles.cardModal}>
          <Input
            placeholder="Enter a the room code"
            value={value}
            onChangeText={(text) => setValue(text)}
            style={{ borderRadius: 10 }}
          />
          <Button style={styles.modalButton} onPress={handleJoinRoom}>
            Join Room
          </Button>
        </Card>
      </Modal>

      <ProfileContainer />
      <View style={styles.mainCard}>
        <Button
          style={styles.button}
          size="large"
          onPress={() => setModalVisible(true)}
        >
          Join Room
        </Button>
        <Text style={{ marginVertical: 20 }}>or</Text>
        <Button
          style={styles.button}
          size="large"
          onPress={() => navigate("CreateRoomScreen")}
        >
          Create Room
        </Button>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 50,
    borderRadius: 20,
    elevation: 2,
    marginHorizontal: "10%",
  },
  button: {
    width: 200,
    borderRadius: 100,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalButton: {
    marginTop: 10,
    borderRadius: 10,
  },
  cardModal: {
    padding: 10,
    borderRadius: 15,
  },
  modal: {
    width: "80%",
  },
  card: {
    flex: 1,
    margin: 2,
    borderRadius: 20,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
});

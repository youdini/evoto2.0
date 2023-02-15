import { Keyboard, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Input,
  Modal,
  Spinner,
  Text,
} from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const CreateRoomScreen = () => {
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");

  const user = auth().currentUser;
  const roomCollection = firestore().collection("rooms");

  const data = {
    roomName: roomName,
    description: description,
    createdBy: user.displayName,
    members: [user.uid],
    admins: [user.uid],
    blockedUsers: [],
  };

  const handleCreateRoom = () => {
    try {
      Keyboard.dismiss();
      roomCollection.add(data);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setAlertVisible(true);
        setRoomName("");
        setDescription("");
      }, 2000);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => Keyboard.dismiss()}
      >
        {loading ? (
          <Modal visible={loading} backdropStyle={styles.backdrop}>
            <Spinner />
          </Modal>
        ) : (
          <Modal
            visible={alertVisible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setAlertVisible(false)}
            style={{ width: "70%" }}
          >
            <Card disabled={true} style={{ borderRadius: 15 }}>
              <Text
                style={{ marginBottom: 30, alignSelf: "center" }}
                category="s1"
              >
                Room Created Successfully!
              </Text>
              <Divider />
              <Button
                onPress={() => {
                  setAlertVisible(false);
                }}
                style={{ alignSelf: "flex-end", marginTop: 10 }}
                size="small"
              >
                OK
              </Button>
            </Card>
          </Modal>
        )}
        <Input
          placeholder="Enter the room name"
          style={styles.input}
          size="large"
          value={roomName}
          onChangeText={setRoomName}
        />
        <Input
          multiline={true}
          placeholder="Description"
          style={styles.multiline}
          size={"large"}
          textStyle={{ height: 100, textAlignVertical: "top" }}
          value={description}
          onChangeText={setDescription}
        />
        <KeyboardAvoidingView
          style={{
            flexGrow: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            style={styles.button}
            size={"large"}
            onPress={handleCreateRoom}
          >
            Create Room
          </Button>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CreateRoomScreen;

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  multiline: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    textAlignVertical: "top",
  },
  button: {
    marginBottom: 20,
    borderRadius: 50,
    width: "50%",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

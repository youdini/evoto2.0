import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  KeyboardAvoidingView,
} from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import React, { useState } from "react";
import { Modal, Card, Input, Button } from "@ui-kitten/components";
import firestore from "@react-native-firebase/firestore";

import {
  UpdateRoomIcon,
  AdminIcon,
  BlockIcon,
  CopyIcon,
  DeleteRoomIcon,
  MembersIcon,
} from "../../assets/RoomSettingIcon";

const RoomSettingScreen = ({ route, navigation: { navigate, goBack } }) => {
  // id of the room or the code of the room
  const { id, name, desc } = route.params;
  // update state input
  const [roomName, setRoomName] = useState(name);
  const [description, setDescription] = useState(desc);

  // modal visibility
  const [update, setUpdate] = useState(false);
  const [visible, setVisible] = useState(false);

  // room reference
  const roomRef = firestore().collection("rooms").doc(id);

  // copy code to clipboard
  const copyToClipboard = () => {
    Clipboard.setString(id);
    ToastAndroid.show("Text copied to clipboard", ToastAndroid.SHORT);
  };

  const handleUpdate = () => {
    console.log(roomName, description);
    roomRef.update({
      roomName: roomName,
      description: description,
    });
    goBack();
  };

  // handle delete room
  const deleteRoom = async () => {
    await roomRef.delete();
    navigate("TabNavigator", {
      screen: "RoomListScreen",
    });
  };

  // footer
  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size="small"
        onPress={deleteRoom}
        status={"danger"}
      >
        Delete
      </Button>
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TouchableOpacity style={styles.button} onPress={() => setUpdate(true)}>
        <Text>Update Room Info</Text>
        <View style={{ alignItems: "flex-end", flexGrow: 1 }}>
          <UpdateRoomIcon />
        </View>
      </TouchableOpacity>

      {/* update modal */}

      <Modal
        visible={update}
        onBackdropPress={() => setUpdate(false)}
        backdropStyle={styles.backdrop}
        style={styles.modal}
      >
        <Card disabled={true} style={styles.card}>
          <Input
            placeholder="Update Room Name"
            style={styles.input}
            value={roomName}
            onChangeText={(text) => setRoomName(text)}
          />
          <Input
            placeholder="Room Description"
            multiline={true}
            style={styles.input}
            textStyle={{ maxHeight: 100 }}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <Button style={styles.btn} onPress={handleUpdate}>
            Update
          </Button>
        </Card>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
        <Text>Copy room code</Text>
        <View style={{ alignItems: "flex-end", flexGrow: 1 }}>
          <CopyIcon />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Admins</Text>
        <View style={{ alignItems: "flex-end", flexGrow: 1 }}>
          <AdminIcon />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Members</Text>
        <View style={{ alignItems: "flex-end", flexGrow: 1 }}>
          <MembersIcon />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Blocked Users</Text>
        <View style={{ alignItems: "flex-end", flexGrow: 1 }}>
          <BlockIcon />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.delete]}
        onPress={() => setVisible(true)}
      >
        <Text style={{ color: "red" }}>Delete Room</Text>
        <View
          style={{
            alignItems: "flex-end",
            flexGrow: 1,
          }}
        >
          <DeleteRoomIcon />
        </View>
      </TouchableOpacity>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card style={styles.cardModal} footer={Footer}>
          <Text
            style={{
              marginVertical: 20,
              marginHorizontal: 20,
            }}
          >
            Are you sure you want to log out?
          </Text>
        </Card>
      </Modal>
    </View>
  );
};

export default RoomSettingScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  delete: {
    borderColor: "red",
    borderWidth: 1,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    width: "80%",
  },
  card: {
    borderRadius: 15,
  },
  input: {
    borderRadius: 10,
    marginBottom: 10,
  },
  btn: {
    borderRadius: 10,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  cardModal: {
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

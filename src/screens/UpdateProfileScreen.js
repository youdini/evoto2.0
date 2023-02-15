import { Keyboard, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Card, Input, Modal, Text } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const UpdateProfileScreen = ({ navigation: { navigate } }) => {
  // input state variables
  const [course, setCourse] = React.useState("");
  const [yrandsec, setYrandSec] = React.useState("");
  const [add, setAdd] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const [update, setUpdate] = React.useState(false);

  // modal visibility state variables

  const [isModalVisible, setIsModalVisible] = useState(false);

  // constant variables for database
  const currentUser = auth().currentUser;
  const userCollection = firestore().collection("users").doc(currentUser.uid);

  const data = {
    course: course,
    yrandsec: yrandsec,
    address: add,
    description: desc,
  };

  // function to create a document inside the database
  const createUserProfile = async () => {
    try {
      await userCollection.set(data, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button status="danger" onPress={() => setIsModalVisible(false)}>
        Cancel
      </Button>
      <Button
        style={styles.footerControl}
        size="small"
        onPress={() => {
          createUserProfile();
          setUpdate(!update);
          navigate("TabNavigator", {
            screen: "ProfileScreen",
            params: {
              udpate: update,
            },
          });
        }}
      >
        Confirm
      </Button>
    </View>
  );

  const openModal = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => Keyboard.dismiss()}
      >
        {/* course input field */}
        <Input
          placeholder={"Course"}
          style={styles.input}
          size={"large"}
          value={course}
          onChangeText={(text) => setCourse(text)}
        />

        {/* year and section input field */}

        <Input
          placeholder={"Year and Section"}
          style={styles.input}
          size={"large"}
          value={yrandsec}
          onChangeText={(text) => setYrandSec(text)}
        />

        {/* address input field */}

        <Input
          placeholder={"Address"}
          style={styles.input}
          size={"large"}
          value={add}
          onChangeText={(text) => setAdd(text)}
        />
        <KeyboardAvoidingView style={{ flex: 1 }}>
          {/* description input field */}

          <Input
            placeholder={"Description"}
            multiline={true}
            style={styles.multiline}
            textStyle={{ height: 150, textAlignVertical: "top" }}
            value={desc}
            onChangeText={(text) => setDesc(text)}
          />
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {add != "" || course != "" || yrandsec != "" || desc != "" ? (
              <Button
                style={{
                  width: "70%",
                  borderRadius: 50,
                  marginBottom: 20,
                }}
                size={"large"}
                onPress={openModal}
              >
                Update
              </Button>
            ) : (
              <Button
                style={{
                  width: "70%",
                  borderRadius: 50,
                  marginBottom: 20,
                }}
                size={"large"}
                onPress={openModal}
                disabled={true}
              >
                Update
              </Button>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <Modal
        visible={isModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <Card style={styles.card} footer={Footer}>
          <Text
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
            }}
          >
            Are you sure you want to update your profile?
          </Text>
        </Card>
      </Modal>
    </View>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  multiline: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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

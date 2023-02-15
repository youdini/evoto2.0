import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { Button, Card, Modal, Text } from "@ui-kitten/components";

import { AuthContext } from "../auth/AuthProvider";
import {
  UpdateProfileIcon,
  InfoIcon,
  LogoutIcon,
} from "../../assets/SettingIcon";

const SettingScreen = ({ navigation: { navigate } }) => {
  const { onLogOut } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button style={styles.footerControl} size="small" onPress={onLogOut}>
        LOG OUT
      </Button>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* update profile button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate("UpdateProfileScreen")}
      >
        <Text>Update Profile</Text>
        <View style={styles.icon}>
          <UpdateProfileIcon />
        </View>
      </TouchableOpacity>

      {/* About us button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate("AboutUsScreen")}
      >
        <Text>About Us</Text>
        <View style={styles.icon}>
          <InfoIcon />
        </View>
      </TouchableOpacity>

      {/* Log out button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsModalVisible(true)}
      >
        <Text>Log Out</Text>
        <View style={styles.icon}>
          <LogoutIcon />
        </View>
      </TouchableOpacity>

      {/* modal to confirm the logout */}

      <Modal
        visible={isModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <Card style={styles.card} footer={Footer}>
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

export default SettingScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 15,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    flexGrow: 1,
    alignItems: "flex-end",
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

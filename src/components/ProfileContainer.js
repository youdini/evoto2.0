import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { OptionIcon } from "../../assets/OptionIcon";
import { Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

const ProfileContainer = () => {
  const user = auth().currentUser;
  const navigation = useNavigation();
  const photo = require("../../assets/favicon.png");

  return (
    <View
      style={{
        position: "relative",
        height: 400,
        width: "100%",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          width: 40,
          height: 40,
          position: "absolute",
          top: 10,
          right: 10,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
          elevation: 3,
        }}
        onPress={() => navigation.navigate("SettingScreen")}
      >
        <OptionIcon />
      </TouchableOpacity>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
        }}
      >
        <Image
          source={{ uri: user.photoURL }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
          }}
        />
        <Text category="h5" style={styles.name}>
          {user.displayName}
        </Text>
      </View>
    </View>
  );
};

export default ProfileContainer;

const styles = StyleSheet.create({
  name: {
    marginTop: 20,
  },
});

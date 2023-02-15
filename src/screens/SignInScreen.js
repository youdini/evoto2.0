import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

import Logo from "../../assets/Logo";
import GoogleIconColored from "../../assets/GoogleIconColored";
const logo = require("../../assets/logo_ccc.png");

const SignInScreen = () => {
  const { onGoogleSignIn } = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={logo}
        style={{
          width: 120,
          height: 120,
          resizeMode: "contain",
          marginBottom: 50,
        }}
      />
      <View style={styles.card}>
        <Logo />
        <View style={{ marginVertical: 40 }}>
          <GoogleIconColored size={50} />
        </View>

        <TouchableOpacity style={styles.button} onPress={onGoogleSignIn}>
          <Text>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 20,
    elevation: 3,
    paddingHorizontal: 60,
  },
});

import React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "@ui-kitten/components";

export const GoogleIcon = () => (
  <Icon style={styles.icon} fill="white" name="google" />
);

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});

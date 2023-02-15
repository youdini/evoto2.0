import React from "react";
import { StyleSheet } from "react-native";
import { Icon, useTheme } from "@ui-kitten/components";

export const OptionIcon = () => (
  <Icon style={styles.icon} fill="gray" name="settings-2-outline" />
);

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});

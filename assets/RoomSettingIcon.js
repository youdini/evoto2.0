import React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "@ui-kitten/components";

export const UpdateRoomIcon = () => (
  <Icon style={styles.icon} name="edit-outline" fill="black" />
);

export const DeleteRoomIcon = () => (
  <Icon style={styles.icon} name="trash-outline" fill="red" />
);

export const CopyIcon = () => (
  <Icon style={styles.icon} name="copy-outline" fill="black" />
);

export const MembersIcon = () => (
  <Icon style={styles.icon} name="people-outline" fill="black" />
);

export const AdminIcon = () => (
  <Icon style={styles.icon} name="person-outline" fill="black" />
);
export const BlockIcon = () => (
  <Icon style={styles.icon} name="slash-outline" fill="black" />
);

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

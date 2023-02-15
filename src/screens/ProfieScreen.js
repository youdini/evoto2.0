import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Divider, Text } from "@ui-kitten/components";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import ProfileContainer from "../components/ProfileContainer";
// import InfoCard from "../components/InfoCard";

const ProfileScreen = ({ route }) => {
  // state variables
  const [course, setCourse] = useState("");
  const [yrandsection, setYrandSection] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const update = route.params;

  const user = auth().currentUser;
  const userCollection = firestore().collection("users").doc(user.uid);

  useEffect(() => {
    const subscriber = userCollection.onSnapshot((doc) => {
      const course = doc.data().course;
      const yrandsection = doc.data().yrandsec;
      const address = doc.data().address;
      const description = doc.data().description;
      setCourse(course);
      setYrandSection(yrandsection);
      setAddress(address);
      setDescription(description);
    });
    return () => subscriber();
  }, [update]);

  return (
    <View style={{ flex: 1 }}>
      <ProfileContainer />

      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          paddingHorizontal: 20,
          borderRadius: 20,
          marginHorizontal: 40,
          height: "40%",
          elevation: 2,
        }}
      >
        <ScrollView>
          {/* email  */}
          <View style={styles.row}>
            <Text style={styles.label}>Email </Text>
            <Text style={styles.info}>{user.email}</Text>
          </View>
          <Divider />

          {/* course  */}

          <View style={styles.row}>
            <Text style={styles.label}>Course </Text>
            <Text style={styles.info}>{course}</Text>
          </View>
          <Divider />

          {/* year and section  */}

          <View style={styles.row}>
            <Text style={styles.label}>Year & Section </Text>
            <Text style={styles.info}>{yrandsection}</Text>
          </View>
          <Divider />

          {/* address */}
          <View style={styles.row}>
            <Text style={styles.label}>Address </Text>
            <Text style={styles.info}>{address}</Text>
          </View>
          <Divider />

          {/* description  */}

          <View>
            <Text style={styles.row}>Description : </Text>
            <Text style={{ textAlign: "justify" }}>{description}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 10,
  },
  label: {
    width: "50%",
    textAlign: "left",
    flexWrap: "wrap",
  },
  info: {
    width: "50%",
  },
});

import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

import CategoryCardUser from "../components/CategoryCardUser";

const VotingScreenUser = ({ route }) => {
  const { poll } = route.params;

  // category ref
  const categoryRef = firestore()
    .collection("categories")
    .where("pollId", "==", poll.key);

  // admin data
  const [admins, setAdmins] = useState([]);
  // admin state
  const [isAdmin, setIsAdmin] = useState([]);
  //   categories
  const [categories, setCategories] = useState([]);
  // snapshot of the category
  useEffect(() => {
    const subscriber = categoryRef.onSnapshot((snapshot) => {
      const catData = [];
      snapshot.forEach((doc) => {
        catData.push({ ...doc.data(), key: doc.id });
      });
      setCategories(catData);
    });
    return () => subscriber();
  }, []);

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryCardUser
            categoryName={item.categoryName}
            categoryId={item.key}
          />
        )}
      />
    </View>
  );
};

export default VotingScreenUser;

const styles = StyleSheet.create({});

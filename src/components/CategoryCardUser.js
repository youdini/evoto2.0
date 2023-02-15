import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { Button } from "@ui-kitten/components";
import Items from "./Items";

const CategoryCardUser = ({ categoryName, categoryId }) => {
  const user = auth().currentUser;

  const [items, setItems] = useState([]);

  // item reference

  // item ref
  const itemRef = firestore()
    .collection("items")
    .where("categoryId", "==", categoryId);

  // item snapshot
  useEffect(() => {
    const subscriber = itemRef.onSnapshot((snapshot) => {
      const itemData = [];
      snapshot.forEach((doc) => {
        itemData.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemData);
    });
    return () => subscriber();
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.card}>
        <Text style={styles.categoryTitle}>{categoryName}</Text>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Items
              itemId={item.id}
              itemName={item.itemName}
              voteCounts={item.voteCounts}
              categoryId={categoryId}
              userId={user.uid}
            />
          )}
        />
      </View>
    </View>
  );
};

export default CategoryCardUser;

const styles = StyleSheet.create({
  card: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 10,
  },
  categoryTitle: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
  },

  voted: {
    padding: 10,
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 5,
  },
});

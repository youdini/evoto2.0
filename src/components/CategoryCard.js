import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Input, Text, Icon } from "@ui-kitten/components";
import Items from "./Items";
import firestore from "@react-native-firebase/firestore";

const CategoryCard = ({ categoryName, categoryId }) => {
  // set the item name
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState([]);

  //   item collection
  const itemCollection = firestore().collection("items");

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

  // add button
  const AddButton = () => (
    <TouchableOpacity
      style={{ marginEnd: 5 }}
      onPress={addItem}
      disabled={!itemName ? true : false}
    >
      <Text status={!itemName ? "basic" : "primary"} style={styles.addbutton}>
        Add
      </Text>
    </TouchableOpacity>
  );

  //   creating a item
  const addItem = () => {
    itemCollection.add({
      itemName: itemName,
      voteCounts: 0,
      categoryId: categoryId,
      votedUsers: [],
    });
    setItemName("");
  };

  //    delete item
  const deleteItem = ({ itemId }) => {
    itemCollection.doc(itemId).delete();
  };

  //   delete category
  const deleteCategory = ({ categoryId }) => {
    firestore().collection("categories").doc(categoryId).delete();
  };

  function log() {
    console.log(items);
  }

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.categoryTitle}>{categoryName}</Text>
        <TouchableOpacity
          onPress={() => deleteCategory({ categoryId: categoryId })}
        >
          <Text status="danger" style={{ fontWeight: "bold" }}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
      <Input
        value={itemName}
        onChangeText={(text) => setItemName(text)}
        placeholder="Enter the items"
        style={styles.input}
        accessoryRight={AddButton}
      />
      <FlatList
        style={{ width: "100%" }}
        data={items}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemname}>{item.itemName}</Text>
            <TouchableOpacity
              onPress={() => deleteItem({ itemId: item.id })}
              style={styles.delbutton}
            >
              <Icon
                name="close-circle-outline"
                style={styles.icon}
                fill="red"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
    alignSelf: "center",
  },
  input: {
    borderRadius: 50,
  },
  addbutton: {
    fontWeight: "bold",
  },
  categoryTitle: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  icon: {
    width: 25,
    height: 25,
    alignSelf: "flex-end",
  },
  itemname: {
    marginStart: 5,
  },
  delbutton: {
    flexGrow: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginTop: 5,
  },
});

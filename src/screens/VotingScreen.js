import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Input, Text, Icon, Button } from "@ui-kitten/components/ui";
import firestore from "@react-native-firebase/firestore";
import CategoryCard from "../components/CategoryCard";

const VotingScreen = ({ route }) => {
  // category data
  const [categories, setCategories] = useState([]);
  // set the category name
  const [categoryName, setCategoryName] = useState("");

  const { poll } = route.params;

  const categoryCollection = firestore().collection("categories");

  // category ref
  const categoryRef = firestore()
    .collection("categories")
    .where("pollId", "==", poll.key);

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

  // submit button
  const SubmitButton = () => (
    <TouchableOpacity
      style={{ marginEnd: 5 }}
      onPress={submitCategory}
      disabled={!categoryName ? true : false}
    >
      <Text status={!categoryName ? "basic" : "primary"} style={styles.submit}>
        Submit
      </Text>
    </TouchableOpacity>
  );

  // creating a category
  const submitCategory = () => {
    categoryCollection.add({
      categoryName: categoryName,
      pollId: poll.key,
      votedItem: "",
      votedUsers: [],
    });
    setCategoryName("");
  };

  const log = () => {
    console.log(poll);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        inverted={true}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="always"
        style={{}}
        data={categories}
        renderItem={({ item }) => (
          <CategoryCard
            categoryName={item.categoryName}
            categoryId={item.key}
          />
        )}
      />
      <Input
        placeholder="Enter a category"
        style={styles.input}
        size="large"
        accessoryRight={SubmitButton}
        value={categoryName}
        onChangeText={(text) => setCategoryName(text)}
      />
    </View>
  );
};

export default VotingScreen;

const styles = StyleSheet.create({
  input: {
    marginBottom: 5,
    marginHorizontal: 10,
    borderRadius: 50,
    alignSelf: "stretch",
  },
  submit: {
    fontWeight: "bold",
  },
  icon: {
    width: 32,
    height: 32,
  },
  container: {
    padding: 10,
    backgroundColor: "#fff",
    alignSelf: "center",
    width: "80%",
    borderRadius: 15,
  },
  button: {
    borderRadius: 50,
    alignSelf: "stretch",
    marginHorizontal: 10,
  },
});

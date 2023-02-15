import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@ui-kitten/components";
import { Button } from "@ui-kitten/components/ui";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const Items = ({ itemName, itemId, voteCounts, categoryId, userId }) => {
  const [votedUsers, setVotedUsers] = useState([]);
  const [voted, setVoted] = useState(false);
  const [selected, setSelected] = useState(false);

  const user = auth().currentUser;
  //   item collection
  const itemCollection = firestore().collection("items");
  // category collection
  const categoryCollection = firestore().collection("categories");

  useEffect(() => {
    const subscriber = itemCollection.doc(itemId).onSnapshot((doc) => {
      setVotedUsers(doc.data().votedUsers);
    });
    return () => subscriber();
  }, []);

  useEffect(() => {
    setVoted(votedUsers.includes(user.uid));
  });

  const vote = ({ itemId, categoryId, userId }) => {
    try {
      itemCollection.doc(itemId).update({
        voteCounts: firestore.FieldValue.increment(1),
        votedUsers: firestore.FieldValue.arrayUnion(user.uid),
      });
      categoryCollection.doc(categoryId).update({
        votedItem: itemId,
        votedUsers: firestore.FieldValue.arrayUnion(user.uid),
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Button
        style={styles.items}
        // status={voted ? "primary" : "basic"}
        onPress={() =>
          vote({ itemId: itemId, categoryId: categoryId, userId: user.uid })
        }
      >
        <Text>{itemName}</Text>
      </Button>
      <Text>{voteCounts}</Text>
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  items: {
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 5,
  },
});

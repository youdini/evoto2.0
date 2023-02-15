import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

const db = firestore();

const Test = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([
    { text: "", votes: 0 },
    { text: "", votes: 0 },
  ]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const createPoll = () => {
    if (question && answers.length > 0) {
      const data = { question, answers };
      db.collection("polls")
        .add(data)
        .then(() => {
          setQuestion("");
          setAnswers([
            { text: "", votes: 0 },
            { text: "", votes: 0 },
          ]);
        })
        .catch((error) => console.error(error));
    }
  };

  const selectAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const vote = () => {
    if (selectedAnswer !== null) {
      const pollRef = db.collection("polls").doc(poll.id);
      const answer = answers[selectedAnswer];
      pollRef
        .get()
        .then((doc) => {
          const pollData = doc.data();
          pollData.answers[selectedAnswer].votes++;
          return pollRef.update(pollData);
        })
        .catch((error) => console.error(error));
      setSelectedAnswer(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Poll</Text>
      <TextInput
        style={styles.input}
        placeholder="Question"
        value={question}
        onChangeText={setQuestion}
      />
      {answers.map((answer, index) => (
        <View key={index} style={styles.answerContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Answer ${index + 1}`}
            value={answer.text}
            onChangeText={(newText) =>
              setAnswers([
                ...answers.slice(0, index),
                { text: newText, votes: answer.votes },
                ...answers.slice(index + 1),
              ])
            }
          />
          <TouchableOpacity
            style={[
              styles.voteButton,
              selectedAnswer === index && styles.selectedVoteButton,
            ]}
            onPress={() => selectAnswer(index)}
          >
            <Text
              style={[
                styles.voteButtonText,
                selectedAnswer === index && styles.selectedVoteButtonText,
              ]}
            >
              Vote
            </Text>
          </TouchableOpacity>
          <Text style={styles.voteCount}>{answer.votes}</Text>
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Create Poll" onPress={createPoll} />
        <Button title="Vote" onPress={vote} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  answerContainer: {},
  voteButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  selectedVoteButton: {
    backgroundColor: "blue",
  },
  voteButtonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedVoteButtonText: {
    color: "white",
  },
  voteCount: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 20,
  },
});

export default Test;

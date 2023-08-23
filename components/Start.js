import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { ImageBackground, TouchableOpacity } from "react-native";

const Start = ({ navigation }) => {
  const [nameText, setnameText] = useState("");
  const [color, setColor] = useState("gray");

  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require("./images/background.jpg")}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={nameText}
          onChangeText={setnameText}
          placeholder="Enter your name"
        ></TextInput>
        <View style={styles.colorBox}>
          <TouchableOpacity
            style={styles.darkseagreen}
            onPress={() => setColor("darkseagreen")}
          ></TouchableOpacity>
          <TouchableOpacity
            style={styles.thistle}
            onPress={() => setColor("thistle")}
          ></TouchableOpacity>
          <TouchableOpacity
            style={styles.powderblue}
            onPress={() => setColor("powderblue")}
          ></TouchableOpacity>
          <TouchableOpacity
            style={styles.lavender}
            onPress={() => setColor("lavender")}
          ></TouchableOpacity>
        </View>
        <Button
          title="Start Chatting"
          onPress={() =>
            navigation.navigate("Chat", { nameText: nameText, color: color })
          }
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  colorBox: {
    flexDirection: "row",
    padding: 8,
  },
  container: {
    backgroundColor: "gray",
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    padding: 15,
    margin: 4,
    fontSize: 20,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
  },
  darkseagreen: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "darkseagreen",
    margin: 8,
  },
  thistle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "thistle",
    margin: 8,
  },
  powderblue: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "powderblue",
    margin: 8,
  },
  lavender: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "lavender",
    margin: 8,
  },
});

export default Start;

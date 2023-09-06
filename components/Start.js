import { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";

import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [nameText, setnameText] = useState("");
  const [color, setColor] = useState("gray");
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          nameText: nameText,
          color: color,
          userID: result.user.uid,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch(() => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

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
        <Text style={styles.colorPickerText}>Choose background Color</Text>
        <View style={styles.colorBox}>
          <TouchableOpacity
            style={styles.darkseagreen}
            accessible={true}
            accessibilityLabel="choose color"
            accessibilityHint="Use darkseagreen"
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
        <Button title="Start Chatting" onPress={signInUser} />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
        {Platform.OS === "ios" ? (
          <KeyboardAvoidingView behavior="padding" />
        ) : null}
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
    padding: 15,
  },
  textInput: {
    borderWidth: 1,
    padding: 15,
    margin: 4,
    fontSize: 20,
  },
  colorPickerText: { color: "#525354", fontSize: 18, paddingLeft: 10 },
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

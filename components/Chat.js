import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useState, useEffect } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
        },
      },
    ]);
  }, []);
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: route.params.color }}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
});

//to set title in the navigation bar
Chat.navigationOptions = ({ route }) => ({
  title: route.params.nameText,
});

const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "black",
        },
        left: {
          backgroundColor: "white",
        },
      }}
    />
  );
};
export default Chat;

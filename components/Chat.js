import { View, KeyboardAvoidingView, LogBox } from "react-native";
import { useState, useEffect } from "react";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);
const Chat = ({ route, db, navigation, isConnected }) => {
  const { userID, nameText } = route.params;
  const [messages, setMessages] = useState([]);

  const loadCachedLists = async () => {
    const cachedLists = (await AsyncStorage.getItem("messages_lists")) || [];
    setMessages(JSON.parse(cachedLists));
  };

  let unsubMessaginglists;
  useEffect(() => {
    navigation.setOptions({ title: nameText });

    if (isConnected === true) {
      if (unsubMessaginglists) unsubMessaginglists();
      unsubShoppinglists = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessaginglists = onSnapshot(q, async (documentsSnapshot) => {
        let newLists = [];
        documentsSnapshot.forEach((doc) => {
          newLists.push({
            _id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cachedLists(newLists);
        setMessages(newLists);
      });
    } else {
      loadCachedLists();
    }

    return () => {
      if (unsubMessaginglists) unsubMessaginglists();
    };
  }, [isConnected]);

  const cachedLists = async (newLists) => {
    try {
      await AsyncStorage.setItem("messages_lists", JSON.stringify(newLists));
    } catch (error) {
      console.log(error.message);
    }
  };
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };
  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else {
      return null;
    }
  };

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

  return (
    <View style={{ flex: 1, backgroundColor: route.params.color }}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: nameText,
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
export default Chat;

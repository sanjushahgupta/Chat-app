import React, { useState, useEffect } from "react"; // Import React and hooks
import { View, KeyboardAvoidingView, LogBox } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const Chat = ({ route, db, navigation, isConnected, storage }) => {
  const { userID, nameText } = route.params;
  const [messages, setMessages] = useState([]);

  const loadCachedLists = async () => {
    const cachedLists = (await AsyncStorage.getItem("messages_lists")) || [];
    setMessages(JSON.parse(cachedLists));
  };

  let unsubMessaginglists;
  useEffect(() => {
    navigation.setOptions({ title: nameText });
    const cleanup = () => {
      if (unsubMessaginglists) unsubMessaginglists(); // Cleanup unsubMessaginglists
    };
    if (isConnected === true) {
      if (unsubMessaginglists) unsubMessaginglists();

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
    return cleanup;
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

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} userID={userID} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={{ flex: 1, backgroundColor: route.params.color }}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
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

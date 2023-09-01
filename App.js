import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Chat from "./components/Chat";
import Start from "./components/Start";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const Stack = createNativeStackNavigator();

  const firebaseConfig = {
    apiKey: "AIzaSyD-wMSd1mOZJTHTwoGHGEhyNuy8FxKXiFw",
    authDomain: "chat-5902a.firebaseapp.com",
    projectId: "chat-5902a",
    storageBucket: "chat-5902a.appspot.com",
    messagingSenderId: "477835469249",
    appId: "1:477835469249:web:53a320b7123a2c43474f40",
    measurementId: "G-Y161Z8PDDL",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

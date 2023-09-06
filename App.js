import { useEffect } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNetInfo } from "@react-native-community/netinfo";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

import Chat from "./components/Chat";
import Start from "./components/Start";

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

const App = () => {
  const connectionStatus = useNetInfo();
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

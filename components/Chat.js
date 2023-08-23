import { View, Text, StyleSheet } from "react-native";
const Chat = ({ route }) => {
  return (
    <View style={[styles.container, { backgroundColor: route.params.color }]}>
      <Text>Chat App</Text>
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
export default Chat;

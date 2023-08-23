    import { StatusBar } from 'expo-status-bar';
    import React from 'react';
    import { StyleSheet, Text, View } from 'react-native';

    import { NavigationContainer } from '@react-navigation/native';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';

    import Chat from './components/Chat';
    import Start  from './components/Start';

    const App = () => {
      const Stack = createNativeStackNavigator();
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Start">
            <Stack.Screen name="Start" component={Start}/>
            <Stack.Screen name="Chat" component={Chat}
              options={({ route }) => ({ title: route.params.nameText })}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

    export default App;

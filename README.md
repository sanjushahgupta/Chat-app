# Chat App
A chat app using React Native which provides users with a chat interface and options to share images and their location.

## Features
- Chat with friends
- Share pictures, photos, and location
- Store chats locally using asyncStorage so they’re available offline
- Authenticate users and store chat messages in Firestore
- Enter name and choose a background color for the chat screen

## Technologies Used
- React Native
- Expo (toolchain to write native apps in JS)
- React Native Gifted Chat library
- Google Firestore DB
- Google Firebase Authentication
- AsyncStorage caching for offline use
- Firebase cloud storage (for storing images)
- Expo ImagePicker & MediaLibrary for integrating communication features

## Set Up
- Expo: Create an Expo account and install Expo CLI using npm install -g expo-cli.
- Android Studio: If you want to use the app on an Android emulator, set up Android Studio [Expo Android Development Environment](https://docs.expo.dev/workflow/android-studio-emulator/).

## Set Up Database
Database: This app uses Firebase as database
- Go to Firebase Console, make a new project if you don't have one.
- Change the rules to allow reading and writing.
- Set up Firebase Authentication and Firestore Database.
- Get your Firebase configuration and put it in the project.

## Things You Need to Install
Dependencies: Before using the app, install these things using npm or yarn: 
- @react-native-async-storage/async-storage, @react-native-community/netinfo, @react-navigation/native, @react-navigation/native-stack, expo, firebase, react-native, react-native-gifted-chat, react-native-safe-area-context, react-native-screens, expo-image-picker, expo-location, react-native-maps

## Run the App
 After setting up everything and Firebase, run the app using expo start.
Running the App: This command starts the Expo development server, and you can use the app on an emulator or a real device. Use expo start -c to clear cache or expo start --offline for testing without the internet.

## Contributions
Contributions to the chat application are always welcome. 
 
 If you have any suggestions, improvements, or bug fixes, please feel free to submit a pull request

## Feedback ![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)
If you have any feedback, please reach out to me at sanjushahgupta@gmail.com

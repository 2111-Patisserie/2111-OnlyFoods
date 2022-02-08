import React, { useEffect, useState } from "react";
import {
  Button,
  ImageBackground,
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import LoginScreen from "./Screens/Login/LoginScreen";
import SignupScreen from "./Screens/Signup/SignupScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth } from "firebase/auth";
import { firebase } from "./firebase_config";
import Navigator from "./Navigation/Navigator";
import ProfileScreen from "./Screens/ProfileAllPost/ProfileScreen";
import SinglePostScreen from "./Screens/SinglePost/SinglePostScreen";
import HomeScreen from "./Screens/HomeFeed/HomeScreen";
import EditScreen from "./Screens/EditProfile/EditScreen";
// import EditProfileScreen from "./Screens/EditProfile/EditProfileScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignupScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Navigator"
            component={Navigator}
            // name="BottomTabs"
            // component={BottomTabs}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SinglePost"
            component={SinglePostScreen}
            // options={{ headerShown: false }}
            // name="Setting"
            // component={EditProfileScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Setting"
            component={EditScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;

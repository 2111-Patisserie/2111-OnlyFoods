import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import HomeScreen from "../Screens/HomeFeed/HomeScreen";
import BookmarkScreen from "../Screens/Bookmark/BookmarkScreen";
import AddPostScreen from "../Screens/AddPost/AddPostScreen";
import ProfileScreen from "../Screens/ProfileAllPost/ProfileScreen";
import SinglePostScreen from "../Screens/SinglePost/SinglePostScreen";
import EditProfileScreen from "../Screens/EditProfile/EditProfileScreen";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase_config";
import { collection, getDocs, getDoc, addDoc, query, where, doc } from "firebase/firestore";
import Cam from "../Camera";

const Tab = createBottomTabNavigator();

const Navigator = () => {
  const [loggedInUser, setLoggedInUser] = useState({});

  const user = auth.currentUser;

  const usersRef = collection(db, "user");
  const userQuery = query(usersRef, where("Email", "==", user.email));

  const bookmarksRef = collection(db, "bookmarks")

  const [bookmarks, setBookmarks] = useState(null)
  const [userBookmarksRef, setUserBookmarksRef] = useState('')

  if(!bookmarks) {
    getDocs(query(bookmarksRef, where('UserID', '==', user.uid)))
      .then( (snapshot) => {
        if(!snapshot.docs.length) {
          addDoc(bookmarksRef, {
            UserID: user.uid,
            BookmarkedRecipes: []
          })
            .then( (newBookmarkRef) => {
              //setBookmarks(newBookmarkRef)
              getDoc(newBookmarkRef)
                .then(snap => {
                  const ref = doc(db, 'bookmarks', snap.id)
                  setUserBookmarksRef(ref)
                  setBookmarks(snap.data())
                })
            })
        } else {
          snapshot.docs.forEach( (document) => {
            setUserBookmarksRef(document)
            setBookmarks(document.data())
          })
        }
      })
  }

  const refresh = () => {
    getDocs(userQuery)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setLoggedInUser(doc.data());
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => refresh(), []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "black",
          height: 90,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        children={(props) => (
          <HomeScreen {...props} loggedInUser={loggedInUser} bookmarks={bookmarks} userBookmarksRef={userBookmarksRef} />
        )}
        // component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <AntDesign
                name="home"
                size={35}
                color={focused ? "rgb(71, 190, 255)" : "white"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Bookmark"
        children={(props) => (
          <BookmarkScreen {...props} loggedInUser={loggedInUser} bookmarks={bookmarks} userBookmarksRef={userBookmarksRef}/>
        )}
        // component={BookmarkScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="bookmark-outline"
              size={40}
              color={focused ? "rgb(16, 85, 124)" : "#748c94"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add Post"
        children={(props) => (
          <AddPostScreen {...props} loggedInUser={loggedInUser} bookmarks={bookmarks} userBookmarksRef={userBookmarksRef} />
        )}
        // component={AddScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="add-circle-outline"
              size={37}
              color={focused ? "rgb(16, 85, 124)" : "#748c94"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        children={(props) => (
          <ProfileScreen {...props} loggedInUser={loggedInUser} bookmarks={bookmarks} userBookmarksRef={userBookmarksRef}/>
        )}
        // component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={35}
              color={focused ? "rgb(71, 190, 255)" : "white"}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="SinglePost"
        component={SinglePostScreen}
        // children={(props) => (
        //   <SinglePostScreen {...props} loggedInUser={loggedInUser} />
        // )}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="file1"
              size={24}
              color={focused ? "rgb(16, 85, 124)" : "#748c94"}
            />
          ),
        }}
      /> */}
      {/* will have to connect to settings icon when clicked in the profileScreen from navigation */}
      {/* <Tab.Screen
        name="Setting"
        component={EditProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="setting"
              size={24}
              color={focused ? "rgb(16, 85, 124)" : "#748c94"}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default Navigator;

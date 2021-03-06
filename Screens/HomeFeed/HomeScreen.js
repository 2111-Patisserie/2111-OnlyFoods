import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Pressable,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { db } from "../../firebase_config";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  Octicons,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import { BookmarksContext } from "../../Navigation/Navigator";
import RecipeCard from "../RecipeCardForHomeAndBookmarks/RecipeCard";
import { BKRefContext } from "../../Navigation/Navigator";

const HomeScreen = ({
  navigation,
  loggedInUser,
  refresh,
  bookmarkPressed,
  loadMoreRecipes,
}) => {
  const { recipes, setRecipes } = useContext(BKRefContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ marginBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.refresh} onPress={refresh}>
          <MaterialIcons name="refresh" size={30} />
        </TouchableOpacity>
        <View>
          {recipes
            ? recipes.map((recipe, index) => (
                <View key={index}>
                  <RecipeCard
                    navigation={navigation}
                    recipe={recipe}
                    index={index}
                    loggedInUser={loggedInUser}
                    bookmarkPressed={bookmarkPressed}
                  />
                </View>
              ))
            : null}
        </View>
        {recipes.length % 10 === 0 ? (
          <TouchableOpacity style={styles.loadMore} onPress={loadMoreRecipes}>
            <Text style={{ color: "dodgerblue", fontWeight: "bold" }}>
              Load More Posts
            </Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: "#8a5a44",
    backgroundColor: "#fae1dd",
  },
  userinfo: {
    justifyContent: "flex-start",
    flexDirection: "column",
    marginHorizontal: 20,
    marginTop: 20,
  },
  username: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  image: {
    marginLeft: 30,
    width: 330,
    height: 300,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 23,
    marginRight: 30,
    marginTop: 10,
  },
  imageAndEdit: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recipe: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  title: {
    marginHorizontal: 30,
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  recipeInfo: {
    marginTop: 10,
    marginBottom: 10,
  },
  userImg: {
    height: 50,
    width: 50,
    borderRadius: 75,
    backgroundColor: "#fae1dd",
  },

  refresh: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 15,
  },
  loadMore: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});

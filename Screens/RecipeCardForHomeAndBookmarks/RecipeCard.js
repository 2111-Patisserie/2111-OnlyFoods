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
  Ionicons,
  Fontisto,
} from "@expo/vector-icons";
import { BookmarksContext } from "../../App";
import { BKRefContext } from "../../Navigation/Navigator";

const RecipeCard = ({ navigation, recipe, index, loggedInUser }) => {
  const { bookmarks, setBookmarks } = useContext(BookmarksContext);
  const { BKRef, setBKRef } = useContext(BKRefContext);
  const [foodColor, setFoodColor] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [recipeCardBookmarks, setRecipeCardBookmarks] = useState(null);

  const foodPressed = () => {
    setFoodColor(!foodColor);
  };

  const bookmarkPressedRecipeCard = (recipe) => {
    const recipesArrCopy = recipeCardBookmarks.BookmarkedRecipes.slice();

    if (bookmarked) {
      const unBookmark = recipesArrCopy.filter((bookmark) => {
        return (
          bookmark.CreatedAt.nanoseconds !== recipe.CreatedAt.nanoseconds ||
          bookmark.Creator !== recipe.Creator
        );
      });

      updateDoc(BKRef, { BookmarkedRecipes: unBookmark });
      setRecipeCardBookmarks({ ...bookmarks, BookmarkedRecipes: unBookmark });
      setBookmarks({ ...bookmarks, BookmarkedRecipes: unBookmark });
    } else {
      recipesArrCopy.push(recipe);
      updateDoc(BKRef, { BookmarkedRecipes: recipesArrCopy });
      setRecipeCardBookmarks({
        ...bookmarks,
        BookmarkedRecipes: recipesArrCopy,
      });
      setBookmarks({ ...bookmarks, BookmarkedRecipes: recipesArrCopy });
    }

    setBookmarked(!bookmarked);
  };

  useEffect(() => {
    if (bookmarks) {
      setRecipeCardBookmarks(bookmarks);
      const recipesArrCopy = bookmarks.BookmarkedRecipes.slice();

      const hasRecipe = recipesArrCopy.some((bookmark) => {
        return (
          bookmark.CreatedAt.nanoseconds === recipe.CreatedAt.nanoseconds &&
          bookmark.Creator === recipe.Creator
        );
      });

      if (hasRecipe) setBookmarked(true);
    }
  }, [bookmarks]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate("SinglePost", {
                LoggedInUser: loggedInUser.Username,
                RecipeUsername: recipe.CreatorUsername,
                RecipeName: recipe.Name,
                TimeHrs: recipe.Time.Hours,
                TimeMins: recipe.Time.Minutes,
                Description: recipe.Description,
                Ingredients: recipe.Ingredients,
                Instructions: recipe.Instructions,
                ImageURL: recipe.ImageURL,
                bookmarked,
                //bookmarkPressed: bookmarkPressed,
                //updateBookmarks: ()=>bookmarkPressedRecipeCard (recipe),
                recipe,
                bookmarks,
                loggedInUser,
                setRecipeCardBookmark: () => setBookmarked(!bookmarked),
              })
            }
          >
            <View style={styles.userinfo}>
              <Image
                style={styles.userImg}
                source={require("../../Assets/Cook1.png")}
              />
              <View style={styles.username}>
                <Text> {recipe.CreatorUsername} </Text>
              </View>
            </View>

            <View style={styles.imageAndEdit}>
              <Image
                style={styles.image}
                source={{
                  uri: recipe.ImageURL,
                }}
              />
            </View>
            <View style={styles.icons}>
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    fontSize: 20,
                    justifyContent: "center",
                    alignContent: "center",
                    marginLeft: 5,
                  }}
                >
                  {recipe.Name}
                </Text>
              </View>
              <TouchableOpacity onPress={() => foodPressed()}>
                <MaterialCommunityIcons
                  name="food-fork-drink"
                  size={30}
                  color={"rgba(230, 230, 230, 0.716)"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => bookmarkPressedRecipeCard(recipe)}
              >
                <Fontisto
                  name="bookmark-alt"
                  size={35}
                  color={bookmarked ? "red" : "black"}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.recipe}>
              {/* <View style={styles.recipeInfo}></View> */}
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "rgba(230, 230, 230, 0.716)",
  },
  userinfo: {
    backgroundColor: "rgba(230, 230, 230, 0.716)",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginHorizontal: 20,
    marginTop: 10,
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
    height: 200,
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
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    borderBottomColor: "gray",
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
    height: 80,
    width: 80,
    borderRadius: 75,
  },
});
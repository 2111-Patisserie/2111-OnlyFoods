import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
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
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

const HomeScreen = ({ navigation, loggedInUser }) => {
  //const user = auth.currentUser
  const recipesRef = collection(db, "recipes");
  const recipesQuery = query(
    recipesRef,
    where("Public", "==", true),
    orderBy("CreatedAt", "desc")
  );

  const [recipes, setRecipes] = useState([]);

  const refresh = () => {
    getDocs(recipesQuery)
      .then((snapshot) => {
        let snapRecipes = [];
        snapshot.docs.forEach((doc) => {
          snapRecipes.push(doc.data());
        });
        setRecipes(snapRecipes);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => refresh(), []);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>

      {/* Code beloww is purely to check that data is being fetched properly */}
      <TouchableOpacity titleSize={20} style={styles.button} onPress={refresh}>
        <Text style={styles.buttonText}> Refresh Page </Text>
      </TouchableOpacity>
      <View>
        <Text>All Public Recipes:</Text>
        {recipes.map((recipe, index) => (
          <Text key={index}>{recipe["Name"]}</Text>
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#0096F6",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
});
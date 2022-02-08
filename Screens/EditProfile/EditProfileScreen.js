import React, { useState } from "react";
import { auth, db } from "../../firebase_config";
import { getAuth, sendSignInLinkToEmail, signOut, updateEmail, updatePassword, updateUserWithEmailAndPassword } from "firebase/auth";
import { collection, updateDoc, doc, where, onSnapshot } from "firebase/firestore";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
} from "react-native";
import { FontAwesome, Feather, Icons } from "react-native-vector-icons";
import { useTheme } from "react-native-paper";

const EditProfileScreen = ({navigation, route}) => {
  const { colors } = useTheme();

  //route brings in current username and email as placeholders
  console.log(route.params)

  //to get currentUser's email and password

  // const [email, setEmail] = useState("LoggedInEmail");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const handleUpdate = () => {
  //   const user = auth.currentUser;
  //   updateEmail(user, setEmail)
  //     .then(() => {
  //       console.log("Email updated")
  //   })
  // };

    // updateEmail(user, "")
    // .then(()=> {
    //   console.log("email updated")
    // }).catch((error) => {
    //   console.log(error)
    // })

//     updateProfile(auth.currentUser, {
//       Username: "route.params.LoggedInUsername",
//       Email: "route.params.LoggedInEmail",
//       //photoURL: "https://example.com/jane-q-user/profile.jpg"
//     }).then(() => {
//       // userCredentials.user.updateEmail(route.params.LoggedInEmail)
//     })
//     .catch(error)
//   } catch (error) {
//     console.log(error)
//   }
// };

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
    .then(()=> {navigation.replace("Login")
  })
  .catch(error => alert(error.message))
  }

  return (
    <View styles={styles.container}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../Assets/Cook1.png")}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              />
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            {route.params.LoggedInUsername}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Max 8 characters"
            placeholderTextColor="black"
            autoCorrect={false}
            style={
              (styles.textInput,
              {
                color: colors.text,
                marginLeft: 5,
              })
            }
          value={route.params.LoggedInUsername}
          onChangeText={text => setUsername(text)}
          autoCapitalize="none"
          keyboardType="default"
          textContentType="username"
          autoFocus={true}
          maxLength={8}
          />

        </View>
        <Text>
            Username
          </Text>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            placeholder=""
            placeholderTextColor="black"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCorrect={false}
            style={
              (styles.textInput,
              {
                color: colors.text,
                marginLeft: 5,
              })
            }
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <Text>
            Email
          </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Password: Min 6 characters"
            autoCapitalize="none"
            placeholderTextColor="black"
            autoCorrect={false}
            style={
              (styles.textInput,
              {
                color: colors.text,
                marginLeft: 5,
              })
            }
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            textContentType="password"
          />
        </View>
        <Text>
            Password
          </Text>
          {/* onPress={handleUpdate} */}
        <TouchableOpacity style={styles.commandBtn} >
          <Text style={styles.panelBtnTitle}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commandBtn} onPress={handleLogOut}>
          <Text style={styles.panelBtnTitle}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandBtn: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    marginTop: 10,
    // width: 100,
    // height: 40,
  },
  panel: {
    padding: 20,
    backgroundColor: "green",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "orange",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubTitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelBtn: {
    padding: 30,
    borderRadius: 10,
    backgroundColor: "purple",
    alignItems: "center",
    marginVertical: 7,
  },
  panelBtnTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "pink",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "maroon",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 20,
    color: "brown",
  },
});

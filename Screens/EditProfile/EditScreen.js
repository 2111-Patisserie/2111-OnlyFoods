import React, { useState } from "react";
import { auth, db, firebase } from "../../firebase_config";
import { sendSignInLinkToEmail, signOut, updateEmail, updatePassword, reauthenticateWithCredential} from "firebase/auth";
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
  Alert,
} from "react-native";
import { FontAwesome, Feather, Icons } from "react-native-vector-icons";
import { useTheme } from "react-native-paper";
import { onChange } from "react-native-reanimated";

export default class EditScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //currentPassword: "",
      newPassword: "",
      newEmail: "",
    }
    user = auth.currentUser.email
    console.log(user)
  }

  reauthenticate = (currentPassword) => {
    const credential = auth.EmailAuthProvider.credential(this.auth.currentUser.email, currentPassword);
    console.log(credential)
    reauthenticateWithCredential(auth.currentUser, cred)
    .then(()=>{
      console.log("reauthentication done")
    }) .catch((error) => {
      console.log(error)
    })
  }

  handleEmail = () => {
    this.reauthenticate(this.state.currentPassword)
    .then(() => {
      updateEmail(auth.currentUser, newEmail).then(()=> {
        Alert.alert("Email updated: Logout and Login!");
      }) .catch(error => alert(error.message))
    }) .catch(error => alert(error.message))
  }

  handlePassword = () => {
    this.reauthenticate(this.state.currentPassword)
    .then(() => {
      updatePassword(auth.currentUser, newPassword)
        .then(() => {
          Alert.alert("Password updated: Logout and Login!");
      })
      .catch(error => alert(error.message))
    })
    .catch(error => alert(error.message))
  }

  handleLogOut = () => {
    signOut(auth)
    .then(()=> {navigation.replace("Login")
  })
  .catch(error => alert(error.message))
  }

  render() {
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
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            placeholder="Max 8 characters"
            placeholderTextColor="black"
            autoCorrect={false}
            style={
              (styles.textInput,
              {

                marginLeft: 5,
              })
            }
          //value
          //onChangeText={text => setUsername(text)}
          autoCapitalize="none"
          keyboardType="default"
          textContentType="username"
          autoFocus={true}
          maxLength={8}
          />
          <TouchableOpacity style={styles.commandBtn} >
          <Text style={styles.panelBtnTitle}>Update Username</Text>
        </TouchableOpacity>
        </View>
        <Text>
            Username
          </Text>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" size={20} />
          <TextInput
            placeholder=""
            placeholderTextColor="black"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCorrect={false}
            style={
              (styles.textInput,
              {
                marginLeft: 5,
              })
            }
            value={this.state.newEmail}
            onChangeText={(text) => { this.setState({newEmail: text}) }}
          />
          <TouchableOpacity style={styles.commandBtn} onPress={this.handleEmail}>
          <Text style={styles.panelBtnTitle}>Update Email</Text>
        </TouchableOpacity>
        </View>
        <Text>
            Email
          </Text>
        <View style={styles.action}>
          <Feather name="lock" size={20} />
          <TextInput
            placeholder="Current Password" placeholderTextColor="black" autoCapitalize="none" autoCorrect={false} secureTextEntry={true}
            style={
              (styles.textInput,
              {
                marginLeft: 5,
              })
            }
            value={this.state.currentPassword}
            onChangeText={(text) => {this.setState({currentPassword: text})}}
          />
          <TextInput
            placeholder="New Password: Min 6 characters" placeholderTextColor="black" autoCapitalize="none" autoCorrect={false} secureTextEntry={true}
            style={
              (styles.textInput,
              {

                marginLeft: 5,
              })
            }
            value= {this.state.newPassword}
            onChangeText={(text) => {this.setState({newPassword: text})}}
          />
          <TouchableOpacity style={styles.commandBtn} onPress={this.handlePassword} >
          <Text style={styles.panelBtnTitle}>Update Password</Text>
        </TouchableOpacity>
        </View>
        <Text>
            Password
          </Text>
        <TouchableOpacity style={styles.commandBtn} onPress={this.handleLogOut}>
          <Text style={styles.panelBtnTitle}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
};

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

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Logged from "./components/Logged";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Accueil"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.homeTitle}>Bienvenue sur YouLog</Text>
        <View style={styles.btnContainer}>
          <Button
            mode={"contained"}
            labelStyle={{ color: "#fff" }}
            style={styles.btnSignIn}
            onPress={() =>
              this.props.navigation.push("SignIn", {
                home: true
              })
            }
          >
            Connexion
          </Button>
          <Button
            mode={"contained"}
            labelStyle={{ color: "#4834d4" }}
            style={styles.btnSignUp}
            onPress={() => this.props.navigation.push("SignUp")}
          >
            Inscription
          </Button>
        </View>
      </View>
    );
  }
}

const Router = createStackNavigator(
  {
    Home: HomeScreen,
    SignIn: SignIn,
    SignUp: SignUp,
    Logged: Logged
  },
  {
    initialRouteName: "Home"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center'
    
  },
  btnSignIn: {
    backgroundColor: "#4834d4",
    padding: 8,
    paddingLeft: 35,
    paddingRight: 35,
    marginBottom: 25
  },
  btnSignUp: {
    backgroundColor: "#fff",
    padding: 8,
    paddingLeft: 35,
    paddingRight: 35,
    marginBottom: 25
  },
  btnContainer: {
    marginTop: 20
  },
  homeTitle: {
    fontSize: 20
  }
});

export default createAppContainer(Router);

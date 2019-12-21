import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-paper";

class Logged extends React.Component {
  static navigationOptions = {
    title: "YouLog"
  };

  render() {
    const email = JSON.stringify(
      this.props.navigation.state.params.email
    ).replace(/\"/g, "");

    var name = "cher utilisateur";
    if (this.props.navigation.state.params.signup) {
      if (
        JSON.stringify(this.props.navigation.state.params.name).replace(
          /\"/g,
          ""
        ) !== ""
      ) {
        name = JSON.stringify(this.props.navigation.state.params.name).replace(
          /\"/g,
          ""
        );
      }
    }

    return (
      <View style={styles.container}>
        <Image
          style={styles.congratulation}
          source={require("../media/congratulation.png")}
        />
        <Text style={styles.welcomeTitle}>Bienvenue {name} sur YouLog 🎉</Text>
        <Text style={styles.welcomeMail}>
          Vous êtes connecté sous {email} ✉️
        </Text>
        <Button
          mode={"contained"}
          labelStyle={{ color: "#4834d4" }}
          style={styles.btnSignUp}
          onPress={() => this.props.navigation.popToTop()}
        >
          Déconnexion
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  btnSignUp: {
    backgroundColor: "#fff",
    padding: 8,
    paddingLeft: 35,
    paddingRight: 35,
    marginLeft: 50,
    marginRight: 50
  },
  welcomeTitle: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 20
  },
  welcomeMail: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 40,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 14
  },
  congratulation: {
    width: 180,
    height: 180,
    marginBottom: 20
  }
});

export default Logged;

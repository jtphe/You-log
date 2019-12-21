import React from "react";
import { StyleSheet, View, Text, TextInput, Keyboard } from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-root-toast";

class SignIn extends React.Component {
  static navigationOptions = {
    title: "Connexion"
  };

  state = {
    defaultMail: "jphe@atolia.com",
    defaultPassword: "jean",
    email: "",
    password: "",
    name: "",
    signup: false
  };

  componentDidMount() {
    this.setState({
      signup: false
    });

    if (this.props.navigation.state.params.signup) {
      const email = JSON.stringify(
        this.props.navigation.state.params.email
      ).replace(/\"/g, "");
      const password = JSON.stringify(
        this.props.navigation.state.params.password
      ).replace(/\"/g, "");
      const name = JSON.stringify(
        this.props.navigation.state.params.name
      ).replace(/\"/g, "");

      this.setState({
        defaultMail: email,
        defaultPassword: password,
        name: name,
        signup: true
      });
    }
  }

  onChangeEmail = text => {
    this.setState({
      email: text
    });
  };

  onChangePassword = text => {
    this.setState({
      password: text
    });
  };

  checkTextInput = (
    email,
    password,
    name,
    defaultMail,
    defaultPassword,
    signup
  ) => {
    Keyboard.dismiss();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(email) === false && !password.length > 0) {
      Toast.show("Entrez un email valide", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP + 60,
        shadow: false,
        opacity: 1
      });
    } else {
      if (email === defaultMail && password === defaultPassword) {
        if (signup) {
          this.props.navigation.push("Logged", {
            email: email,
            name: name,
            signup: signup
          });
        } else {
          this.props.navigation.push("Logged", {
            email: email,
            signup: signup
          });
        }
      } else {
        Toast.show("Les informations saisies sont incorrectes", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP + 60,
          shadow: false,
          opacity: 1
        });
      }
    }
  };

  render() {
    const {
      email,
      password,
      defaultMail,
      defaultPassword,
      signup,
      name
    } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.signInTitle}>Connectez-vous</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            textContentType="email"
            keyboardType="email-address"
            onChangeText={this.onChangeEmail}
            autoCapitalize="none"
            returnKeyType={"next"}
            onSubmitEditing={() => {
              this.passwordTextInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            ref={input => {
              this.passwordTextInput = input;
            }}
            style={styles.input}
            placeholder="Mot de passe"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={this.onChangePassword}
          />
        </View>
        <Button
          mode={"contained"}
          labelStyle={{ color: "#fff" }}
          style={styles.btnSignIn}
          onPress={() => {
            this.checkTextInput(
              email.trim(),
              password,
              name,
              defaultMail,
              defaultPassword,
              signup
            );
          }}
        >
          Connexion
        </Button>
        <Text style={styles.help}>
          Par défault le mail est : jphe@atolia.com et le mot de passe : jean
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center"
  },
  textInputContainer: {
    marginTop: 20
  },
  input: {
    height: 50,
    marginLeft: 50,
    marginRight: 50,
    paddingLeft: 15,
    borderColor: "#ecf0f1",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 25
  },
  btnSignIn: {
    backgroundColor: "#4834d4",
    padding: 8,
    paddingLeft: 35,
    paddingRight: 35,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 40
  },
  signInTitle: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10
  },
  help: {
    textAlign: "center",
    fontSize: 12,
    marginLeft: 50,
    marginRight: 50,
    padding: 10,
    borderRadius: 10,
    color: "white",
    backgroundColor: "#8270f4",
    overflow: "hidden"
  }
});

export default SignIn;

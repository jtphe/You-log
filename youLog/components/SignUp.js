import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  ScrollView
} from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-root-toast";

class SignUp extends React.Component {
  static navigationOptions = {
    title: "Inscription"
  };

  state = {
    name: "",
    email: "",
    password: ""
  };

  onChangeName = text => {
    this.setState({
      name: text
    });
  };

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

  checkTextInput = (email, password, name) => {
    Keyboard.dismiss();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(email) === false && !email.length > 0 && !password.length > 0) {
      Toast.show("Entrez un email valide", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP + 60,
        shadow: false,
        opacity: 1
      });
    } else {
      this.props.navigation.navigate("SignIn", {
        name: name,
        email: email,
        password: password,
        signup: true
      });
    }
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.signUpTitle}>Créez votre compte</Text>
        <View style={styles.textInputContainer}>
          <ScrollView>
            <TextInput
              style={styles.input}
              placeholder="Nom (optionnel)"
              onChangeText={this.onChangeName}
              autoCapitalize = 'none'
              returnKeyType={"next"}
              onSubmitEditing={() => {
                this.emailTextInput.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              ref={input => {
                this.emailTextInput = input;
              }}
              style={styles.input}
              placeholder="E-mail"
              textContentType="email"
              keyboardType="email-address"
              onChangeText={this.onChangeEmail}
              autoCapitalize = 'none'
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
          </ScrollView>
        </View>
        <Button
          mode={"contained"}
          labelStyle={{ color: "#fff" }}
          style={styles.btnSignIn}
          onPress={() => this.checkTextInput
            (email.trim(), password, name.trim())}
        >
          Valider
        </Button>
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
    padding: 8,
    paddingLeft: 35,
    paddingRight: 35,
    marginLeft: 50,
    marginRight: 50
  },
  signUpTitle: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10
  }
});

export default SignUp;

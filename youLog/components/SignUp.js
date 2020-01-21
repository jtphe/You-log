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

  /**
   * Handle the change of name
   *  @param {string} text - The name to change
   */
  _onChangeName = text => {
    this.setState({
      name: text
    });
  };

  /**
   * Handle the change of email
   *  @param {string} text - The email to change
   */
  _onChangeEmail = text => {
    this.setState({
      email: text
    });
  };

  /**
   * Handle the change of password
   *  @param {string} text - The password to change
   */
  _onChangePassword = text => {
    this.setState({
      password: text
    });
  };

  /**
   * Insert the user in the SQLite DB
   * @param  {string} name - The name of the user
   * @param  {string} email - The email of the user
   * @param  {string} password - The password of the user
   */
  _insert = async (name, email, password) => {
    try {
      var form = new FormData();
      form.append("name", name);
      form.append("mail", email);
      form.append("password", password);
      await fetch(
        "https://www.lmg-graphisme-web-multimedia.fr/api/insertuser.php",
        {
          method: "POST",
          header: {
            Accept: "application/json",
            "Content-Type": "'multipart/form-data"
          },
          body: form
        }
      );
    } catch (error) {
      console.log("Error while inserting user", error);
    }
  };

  /**
   * Check the value in the text input
   * @param  {string} email - Email of the user
   * @param  {string} password - Password of the user
   * @param  {string} name - Name of the user
   */
  _checkTextInput = async (email, password, name) => {
    Keyboard.dismiss();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      reg.test(email) === false &&
      !email.length > 0 &&
      !password.length > 0
    ) {
      Toast.show("Entrez un email valide", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP + 60,
        shadow: false,
        opacity: 1
      });
    } else {
      await this._insert(name, email, password);
      this.props.navigation.navigate("SignIn");
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
              placeholder="Nom"
              onChangeText={this._onChangeName}
              autoCapitalize="none"
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
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={this._onChangeEmail}
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
              onChangeText={this._onChangePassword}
            />
          </ScrollView>
        </View>
        <Button
          mode={"contained"}
          labelStyle={{ color: "#fff" }}
          style={styles.btnSignIn}
          onPress={() =>
            this._checkTextInput(email.trim(), password, name.trim())
          }
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

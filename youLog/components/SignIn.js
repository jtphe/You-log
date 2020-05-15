import React from "react";
import { StyleSheet, View, Text, TextInput, Keyboard } from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-root-toast";
// import * as SQLite from "expo-sqlite";

/**
 * The SignIn class
 */
class SignIn extends React.Component {
  /**
   * Pass the title option to the navigation
   */
  static navigationOptions = {
    title: "Connexion"
  };

  /**
   * email: The user email |
   * password: The user password | 
   * users: Users list
   * @type {{email: string, password: string, users: array}}
   */
  state = {
    email: "",
    password: "",
    users: []
  };

  /**
   * Call the method selectUser to get all the users of the DB
   */
  // componentDidMount() {
  //   this._selectUsers();
  // }

  /**
   * Select all the users from the SQLite DB
   */
  // _selectUsers = () => {
  //   const usersDB = SQLite.openDatabase("users.db");
  //   usersDB.transaction(tx => {
  //     tx.executeSql(
  //       "CREATE TABLE IF NOT EXISTS users (id integer primary key not null, name text, email text, password text);"
  //     );
  //   });

  //   const query = "SELECT * FROM users";
  //   const params = [];
  //   usersDB.transaction(tx => {
  //     tx.executeSql(query, params, (_, { rows }) => {
  //       if (rows.length > 0) {
  //         this.setState({
  //           users: rows._array
  //         });
  //       }
  //     });
  //   });
  // };

  /**
   * Handle the change of email
   * @param {string} text - The email to change
   */
  _onChangeEmail = text => {
    this.setState({
      email: text
    });
  };

  /**
   * Handle the change of password
   * @param {string} text - The password to change
   */
  _onChangePassword = text => {
    this.setState({
      password: text
    });
  };

  /**
   * Check if the informations put by the user are equivalent to a user from the SQLite DB
   * @param {} email - The email put by the user
   * @param {} password - The password put by the user
   */
  _checkUser = (email, password) => {
    const { users } = this.state;
    for (let i = 0; i < users.length; i++) {
      const element = users[i];
      if (email === element.email && password === element.password) {
        this.props.navigation.push("Logged", {
          name: element.name,
          email: element.email,
          password: element.password,
          id: element.id
        });
        break;
      } else {
        Toast.show("Le mail ou le mot de passe est incorrect", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP + 60,
          shadow: false,
          opacity: 1
        });
      }
    }
  };

  /**
   * Check if the email and password put by the user are correct
   * @param {} email - The email put by the user
   * @param {} password - The password put by the user
   */
  _checkTextInput = (email, password) => {
    Keyboard.dismiss();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(email) === false || !password.length > 0) {
      Toast.show("Les informations saisies sont incorrectes", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP + 60,
        shadow: false,
        opacity: 1
      });
    } else {
      this._checkUser(email, password);
    }
  };

  /**
   * Render the sign in screen
   * @returns {React.Component} - SignIn Component
   */
  render() {
    const { email, password } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.signInTitle}>Connectez-vous</Text>
        <View style={styles.textInputContainer}>
          <TextInput
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
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={this._onChangePassword}
          />
        </View>
        <Button
          mode={"contained"}
          labelStyle={{ color: "#fff" }}
          style={styles.btnSignIn}
          onPress={() => {
            this._checkTextInput(email.trim(), password);
          }}
        >
          Connexion
        </Button>
      </View>
    );
  }
}

/**
 * Styles of the SignIn Component
 */
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
  }
});

export default SignIn;

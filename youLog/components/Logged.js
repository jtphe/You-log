import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import ModalPassword from "./ModalPassword";
// import * as SQLite from "expo-sqlite";

/**
 * The Logged class
 * @reactProps {object} navigation - Navigation props
 */
class Logged extends React.Component {
  /**
   * Pass the title option to the navigation
   */
  static navigationOptions = {
    title: "YouLog"
  };

  /**
   * visibility : The visibility of the update password button | 
   * password:  The user password |
   * canUpdatePassword: If the user can update the password or not
   * @type {{visible: boolean, password: string, id: string, canUpdatePassword: boolean}}
   */
  state = {
    visible: false,
    password: '',
    id: null,
    canUpdatePassword: true,
    email: '',
    name: ''
  };

  UNSAFE_componentWillReceiveProps(){
    if(this.props.navigation.state.params.id){
      this.setState({
        password: JSON.stringify(
          this.props.navigation.state.params.password
        ).replace(/\"/g, "")
      });
    }
    if(this.props.navigation.state.params.id){
      this.setState({
        id: JSON.stringify(this.props.navigation.state.params.id).replace(
          /\"/g,
          ""
        )
      })
    }
    if( this.props.navigation.state.params){
      this.setState({
        email: this.props.navigation.state.params.email,
        name: this.props.navigation.state.params.name
      })
    }
  }

  /**
   * Update the password in the SQLite DB
   * @param {string} text - The new password
   */
  _updatePassword = text => {
    if (text !== this.state.password) {
      const usersDB = SQLite.openDatabase("users.db");
      usersDB.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS users (id integer primary key not null, name text, email text, password text);"
        );
      });

      const query = "UPDATE users SET password = ? WHERE id = ?";
      const params = [text, this.state.id];

      usersDB.transaction(tx => {
        tx.executeSql(query, params);
      });
      this.setState({
        visible: false,
        canUpdatePassword: false
      });
    } else {
      this.setState({
        visible: false
      });
    }
  };

  /**
   * Hide the modal to change the password when user click on the cancel button
   */
  _cancel = () => {
    this.setState({
      visible: false
    });
  };

  /**
   * Show the modal to change the password
   */
  _showModal = () => {
    this.setState({
      visible: true
    });
  };

  /**
   * Convert the item from the sign in screen to json object
   * @param {string} params - The item to convert
   */
  _convertToJsObject = params => {
    return JSON.stringify(params).replace(/\"/g, "");
  };

  /**
   * Render the main screen
   * @returns {React.Component} - Logged Component
   */
  render() {
    const { visible, password, canUpdatePassword, email, name } = this.state;
    const EMAIL = this._convertToJsObject(email);
    const NAME = this._convertToJsObject(name);

    return (
      <View style={styles.container}>
        <Image
          style={styles.congratulation}
          source={require("../media/congratulation.png")}
        />
        <Text style={styles.welcomeTitle}>Bienvenue {NAME} sur YouLog 🎉</Text>
        <Text style={styles.welcomeMail}>
          Vous êtes connecté sous {EMAIL} ✉️
        </Text>
        <Button
          mode={"contained"}
          labelStyle={{ color: "#4834d4" }}
          style={styles.btnSignUp}
          onPress={() => this.props.navigation.popToTop()}
        >
          Déconnexion
        </Button>
        {canUpdatePassword ? (
          <TouchableOpacity onPress={this._showModal}>
            <Text style={styles.password}>Changer votre mot de passe</Text>
          </TouchableOpacity>
        ) : null}
        <ModalPassword
          visible={visible}
          updatePassword={text => this._updatePassword(text)}
          cancel={this._cancel}
          password={password}
        />
      </View>
    );
  }
}

/**
 * Styles of the Logged Component
 */
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
  },
  password: {
    marginTop: 20,
    color: "#4834d4",
    textDecorationLine: "underline"
  }
});

export default Logged;

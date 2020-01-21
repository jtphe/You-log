import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Keyboard } from "react-native";
import { Button } from "react-native-paper";
import ModalPassword from "./ModalPassword";

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
    password: this.props.navigation.state.params.password,
    email: this.props.navigation.state.params.email,
    canUpdatePassword: true
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
  _updatePassword = async () => {
    try {
      var form = new FormData();
      form.append("mail", this.state.email);
      form.append("password", this.state.password);
      await fetch("https://www.lmg-graphisme-web-multimedia.fr/api/updateuser.php", {
        method: "POST",
        header: {
          Accept: "application/json",
          "Content-Type": "'multipart/form-data"
        },
        body: form
      });
    } catch (error) {
      console.log("Error while inserting user", error);
    }
    this.setState({
      visible: false,
      canUpdatePassword: false
    });
    Keyboard.dismiss();
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
   * Handle the change of password
   *  @param {string} text - The password to change
   */
  _setPassword = text => {
    this.setState({
      password: text
    });
  };

  /**
   * Render the main screen
   * @returns {React.Component} - Logged Component
   */
  render() {
    const { visible, password, canUpdatePassword } = this.state;
    const { email, name } = this.props.navigation.state.params;

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
        {canUpdatePassword ? (
          <TouchableOpacity onPress={this._showModal}>
            <Text style={styles.password}>Changer votre mot de passe</Text>
          </TouchableOpacity>
        ) : null}
        <ModalPassword
          visible={visible}
          updatePassword={() => this._updatePassword()}
          cancel={this._cancel}
          setPassword={text => this._setPassword(text)}
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

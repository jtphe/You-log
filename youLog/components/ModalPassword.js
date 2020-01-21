import React from "react";
import { Modal, Text, View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

/**
 * The ModalPassword class
 * @reactProps {string} password - User password
 * @reactProps {boolean} visible - The visibility of the update password button
 * @reactProps {function} hide - Hide the modal
 * @reactProps {function} cancel - Cancel the password update 
 * @reactProps {function} updatePassword - Update the user password 
 */
class ModalPassword extends React.Component {
  /**
   * ModalPassword constructor
   * @param {props} props - ModalPassword props
   */
  constructor(props) {
    super(props);
  }
  
  /**
   * password : The user password
   * @type {password: string}
   */
  state = {
    password: this.props.password
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
   * Render the password modal
   * @returns {React.Component} - Password Modal
   */
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {
          this.props.hide;
        }}
      >
        <View style={styles.container}>
          <Text style={styles.passwordTitle}>Modifier votre mot de passe</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={value => {
                this.props.setPassword(value);
              }}
              autoCapitalize="none"
              style={styles.inputPassword}
              value={this.props.password}
            />
          </View>
          <Button
            mode={"contained"}
            labelStyle={{ color: "#fff" }}
            style={styles.btnCancel}
            onPress={() => this.props.cancel()}
          >
            Annuler
          </Button>
          <Button
            mode={"contained"}
            labelStyle={{ color: "#4834d4" }}
            style={styles.btnConfirm}
            onPress={() => this.props.updatePassword()}
          >
            Valider
          </Button>
        </View>
      </Modal>
    );
  }
}

/**
 * Styles of the ModalPassword Component
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
  btnConfirm: {
    backgroundColor: "#fff",
    padding: 8,
    paddingLeft: 35,
    paddingRight: 35,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20
  },
  btnCancel: {
    backgroundColor: "#4834d4",
    padding: 8,
    paddingLeft: 35,
    paddingRight: 35,
    marginLeft: 50,
    marginRight: 50
  },
  inputPassword: {
    height: 50,
    marginLeft: 50,
    marginRight: 50,
    paddingLeft: 15,
    borderColor: "#ecf0f1",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 25
  },
  passwordTitle: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10
  }
});

export default ModalPassword;

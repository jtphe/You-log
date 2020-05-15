global.fetch = require('jest-fetch-mock');
import { Keyboard } from 'react-native';
/**
 * Insert the user in the SQLite DB
 * @param  {string} name - The name of the user
 * @param  {string} email - The email of the user
 * @param  {string} password - The password of the user
 */
export const _insert = async (name, email, password) => {
    try {
        var form = new FormData();
        form.append("name", name);
        form.append("mail", email);
        form.append("password", password);
        await fetch(
            "http://jdevalik.fr/api/insertuser.php",
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
 * Select all the users from the API
 */
export const _loadUsers = async () => {
    try {
        let response = await fetch(
            "http://jdevalik.fr/api/getusers.php",
            {
                method: "GET",
                header: {
                    Accept: "application/json",
                    "Content-Type": "application.json"
                }
            }
        );
        let responseJs = await response.json();
        this.setState({
            users: responseJs
        });
    } catch (error) {
        console.log("Error while loading user", error);
    }
};

/**
* Update the password in the SQLite DB
* @param {string} text - The new password
*/
export const _updatePassword = async () => {
    try {
        var form = new FormData();
        form.append("mail", this.state.email);
        form.append("password", this.state.password);
        await fetch("http://jdevalik.fr/api/updateuser.php", {
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
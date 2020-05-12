function checkPassword(password){
    let upperCase = false;
    let specialCaracter = false;
    let number = false;
    const format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    for (let i = 0; i < password.length; i++) {
        const element = password.charAt(i)
        if(element == element.toUpperCase()){
            upperCase = true
        }
        if(element.match(format)){
            specialCaracter = true
        }
        if(typeof parseInt(element) == "number"){
            number = true
        }
    }
    if(number && specialCaracter && upperCase){
        return true
    } else {
        return false
    }
}

module.exports = checkPassword;
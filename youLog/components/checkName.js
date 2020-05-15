function checkName(name){
    if(typeof name !== "string" || name.length < 4){
        return false
    }else {
        return true
    }
}

module.exports = checkName;
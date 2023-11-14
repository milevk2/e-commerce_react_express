function validateRegister(email, username, password, repassword) {

    if(username.length ==0) return 'The username is required!'
    if (username.length < 3)  return 'The username must be at least 3 characters!'
    if(email.length ==0) return 'The email is required!'
    if (email.length < 10) return 'The email must be at least 10 characters!'
    if(password == undefined || password.length == 0) return 'The password is required!'
    if(password.length < 4) return 'The password must be at least 4 characters!'
    if(repassword.length == 0) return 'The repeatPassword is required!'
    if(repassword !== password) return 'Password and repeatPassword must be the same!'

    return false;
}

function validateLogin(email, password) {
    
    if(email.length ==0) return 'The email is required!'
    if (email.length < 10) return 'The email must be at least 10 characters!'
    if(password == undefined ||password.length == 0 ) return 'The password is required!'
    if(password.length < 4) return 'The password must be at least 4 characters!'
  
    return false;
}

function validateElectronic(name, type, damages,image,description,production,exploitation,price) {

   

    const regExp = /^http:\/\//gm
    const regExp2 = /^https:\/\//gm

    if(name.length ==0) return 'The name is required!'
    if (name.length < 10)  return 'The name must be at least 10 characters!'
    if(type.length ==0) return 'The type is required!'
    if (type.length < 2)  return 'The type must be at least 2 characters!'
    if(damages.length ==0) return 'The damages is required!'
    if(damages.length <=10) return 'The damages must beat least 10 characters!'
    if (regExp.test(image) || regExp2.test(image))  return 'The image must start with http:// or https://.'  
    if(description.length ==0) return 'The description is required'
    if(description.length <=10 || description.length > 200) return 'Description should be between 10 and 200 characters'
    if(Number(production) < 1901 || Number(production) > 2022) return 'The production is required and should be between 1900 and 2023'
    if(Number(exploitation) < 0 ) return 'The exploitation should be a positive number'
    if(Number(price) < 0 ) return 'The price should be a positive number'

    return false;
}

//not enough time to create reusable code :(

module.exports = {validateRegister, validateLogin, validateElectronic}
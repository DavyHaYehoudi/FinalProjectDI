
module.exports.signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: "" };
  
    if (err.message.includes("pseudo"))
      errors.pseudo = "Username incorrect or already taken";
  
    if (err.message.includes("email")) errors.email = "Incorrect email";
  
    if (err.message.includes("password"))
      errors.password = "The password must be 6 characters minimum";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
      errors.pseudo = "This username is already taken";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      errors.email = "This email is already registered";
  
    return errors;
  };
  
  
  module.exports.signInErrors = (err) => {
    let errors = { email: '', password: ''}
  
    if (err.message.includes("email")) 
      errors.email = "Unknown email";
    
    if (err.message.includes('password'))
      errors.password = "Password does not match"
  
    return errors;
  }
  
  module.exports.uploadErrors = (err) => {
      let errors = { format: '', maxSize: ""};
    
      if (err.message.includes('invalid file'))
        errors.format = "Incompatible format";
    
      if (err.message.includes('max size'))
        errors.maxSize = "The file exceeds 500kb";
    
      return errors
    }
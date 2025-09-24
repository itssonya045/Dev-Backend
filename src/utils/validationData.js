const validator = require("validator");



const validData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid.");
  }

  if (!emailId || !validator.isEmail(emailId)) {
    throw new Error("EmailId is not valid.");
  }

 const strongPassword = (password) => {
  return (
    typeof password === "string" &&
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[\W]/.test(password)
  );
};

if (!strongPassword(password)) {
  throw new Error("Password is not strong");
}

};



const validateProfileData = (data = {}) => {
  const allowedEditsFields = ["firstName", "lastName", "age", "gender", "skills", "photoUrl", "about"];

  if (!data || typeof data !== "object") {
    return false;
  }

  return Object.keys(data).every(field => allowedEditsFields.includes(field));
};





module.exports = { validData ,validateProfileData};

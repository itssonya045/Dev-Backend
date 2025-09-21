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

module.exports = { validData };

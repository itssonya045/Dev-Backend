
const jwt = require("jsonwebtoken")
const User = require("../models/user.js")




const userAuth = async(req, res, next) => {

  try{

    const {token} =  req.cookies;

    if(!token){
      throw new Error ("token is not valid")
    }

    const decodedData =  await jwt.verify(token,"devtinder@123")

    const {_id} = decodedData

    const user = await User.findById(_id)

    if(!user){
      throw new Error ("user is not found")
    }

    req.user = user;
    next()
  }catch(err){
    res.status(401).send({ error: err.message });
  }

};





module.exports = { userAuth };


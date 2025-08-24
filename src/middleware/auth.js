

const addmainAuth = (req, res, next) => {
  const token = "xyz";
  const adminToken = "xyz";

  if (token !== adminToken) {
    return res.status(400).send("Admin not available (invalid token)");
  }

  next(); // ✅ continue if valid
};




const userAuth = (req, res, next) => {
  const token = "xyz";
  const adminToken = "xysz";

  if (token !== adminToken) {
    return res.status(400).send("Admin not available (invalid token)");
  }

  next();
};

// ✅ Option A: named export
module.exports = { addmainAuth ,userAuth };


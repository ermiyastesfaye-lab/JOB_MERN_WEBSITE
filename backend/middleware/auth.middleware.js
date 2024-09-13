const jwt = require("jsonwebtoken");
const requireAuth = (req, res, next) => {
  console.log("RequireAuth middleware called");
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "ermiyas tesfaye secret", (err, decodedToken) => {
      if (err) {
        console.log("Token Invalid");
        return err.message;
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(404).json({ message: "No token available" });
  }
};

module.exports = { requireAuth };

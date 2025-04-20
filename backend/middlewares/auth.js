const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  const token = req?.cookies?.token;

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user.user;
    next();
  } catch (error) {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(401).json({ msg: "Invalid token", error });
  }
};

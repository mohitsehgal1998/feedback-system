import jwt from "jsonwebtoken";
import Users from "../models/Users";

const Auth = async (req, res, next) => {
  const token = req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : "";

  console.log(token);

  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Users.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default Auth;
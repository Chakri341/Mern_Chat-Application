import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  // console.log("setting token in res  in genertaed token ", jwtToken);
  res.cookie("jwt", jwtToken, {
   maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

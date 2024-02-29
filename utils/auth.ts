import jwt from "jsonwebtoken";

export const isLogin = () => {
  const token = sessionStorage.getItem("userToken");
  if (token && token.length > 0) {
    try {
      jwt.verify(token, getJWTsecretKey());
      return true;
    } catch (error) {
      console.error("Verify JWT Token failed :", error);
      return false;
    }
  } else {
    console.log("No token");
    return false;
  }
};

export const getJWTsecretKey = () => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey || secretKey.length === 0) {
    throw new Error("No JWT secret");
  }
  return secretKey;
};

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const isLogin = () => {
  const token = cookies().get("userToken");
  if (token && token.value) {
    try {
      jwt.verify(token.value, getJWTsecretKey());
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

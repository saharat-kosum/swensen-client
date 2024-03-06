import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const isLogin = async () => {
  const token = cookies().get("userToken");
  if (token && token.value) {
    try {
      const secretKey = getJwtSecretKeyJose();
      await jwtVerify(token.value, secretKey);
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

export function getJwtSecretKeyJose() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret key is not set");
  }

  const enc: Uint8Array = new TextEncoder().encode(secret);
  return enc;
}

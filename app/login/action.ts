"use server";

import { getJwtSecretKeyJose } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  try {
    const prisma = new PrismaClient();
    const email = formData.get("email")?.toString();
    const password = formData.get("password");

    if (!email || !password) {
      return { message: "Please fill email and password" };
    }

    const user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      return { message: "Please fill email and password" };
    }

    if (user.password === password) {
      const secretKey = getJwtSecretKeyJose();
      const token = await new SignJWT({ id: user.id, email: user.email })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(secretKey);
      cookies().set("userToken", token);
      redirect("/");
    } else {
      return { message: "Invalid password." };
    }
  } catch (err: any) {
    if (isRedirectError(err)) {
      throw err;
    } else {
      console.log(err);
      console.log("ERROR FROM OTHER OPERATIONS");
      throw err;
    }
  }
}

"use server";

import { getJwtSecretKeyJose } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email().min(1, {
    message: "Email is required",
  }),
  password: z.string().trim().min(1, {
    message: "Password is required",
  }),
});

const prisma = new PrismaClient();

export async function loginAction(prevState: any, formData: FormData) {
  try {
    const initialState = {
      email: "",
      password: "",
      message: "",
    };
    const validateData = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validateData.success) {
      for (const issue of validateData.error.issues) {
        const { path, message } = issue;
        switch (path[0]) {
          case "email":
            initialState.email = message;
            break;
          case "password":
            initialState.password = message;
            break;
          default:
            break;
        }
      }
      return initialState;
    }

    const user = await prisma.users.findFirst({
      where: { email: validateData.data.email },
    });

    if (user && user.password === validateData.data.password) {
      const secretKey = getJwtSecretKeyJose();
      const token = await new SignJWT({ id: user.id, email: user.email })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(secretKey);
      cookies().set("userToken", token);
      redirect("/admin");
    } else {
      initialState.message = "Incorrect email or password.";
      return initialState;
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

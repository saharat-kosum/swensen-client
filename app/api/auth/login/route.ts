import { getJWTsecretKey } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      return Response.json(
        { error: "Invalid email or password." },
        { status: 400 }
      );
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        getJWTsecretKey()
      );
      cookies().set("userToken", token);
      return Response.json(token);
    } else {
      return Response.json(
        { error: "Invalid email or password." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Log in failed: ", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

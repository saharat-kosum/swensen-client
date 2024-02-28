import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      return Response.json({ error: "User does not exist." }, { status: 404 });
    }

    if (user.password === password && process.env.JWT_SECRET) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET
      );
      return Response.json(token);
    } else {
      return Response.json({ error: "Invalid password." }, { status: 400 });
    }
  } catch (error) {
    console.error("Log in failed: ", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

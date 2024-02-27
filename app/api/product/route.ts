import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET() {
  try {
    return Response.json(await prisma.products.findMany());
  } catch (error) {
    console.error("Get all products error: ", error);
    return Response.json({ error: "Internal server error" }, {status: 500});
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (authHeader === null) {
      throw new Error("Authorization Header is null");
    }
    if (process.env.JWT_SECRET === undefined) {
      throw new Error("No JWT_SECRET");
    }
    if (request.body === null) {
      throw new Error("Request body is null");
    }
    const token = authHeader.split(" ")[1];
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof jwtPayload === "string") {
      throw new Error("jwt payload type mismatch");
    }
    // const body = request.body as unknown;
    // const { name, price } = body as AddPostPayload
    const { name, price } = await request.json();
    const newProduct = await prisma.products.create({
      data: {
        name,
        price,
        usersId: jwtPayload.id,
      },
    });
    return Response.json(newProduct);
  } catch (error) {
    console.error("Create Product error: ", error);
    Response.json({ error: "Internal server error" }, {status: 500});
  }
}

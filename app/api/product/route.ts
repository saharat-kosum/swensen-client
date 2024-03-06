import { verifyToken } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function GET() {
  try {
    return Response.json(await prisma.products.findMany());
  } catch (error) {
    console.error("Get all products error: ", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const token = await verifyToken();
    if (token && typeof token.id === "string") {
      const { name, price } = await request.json();
      const newProduct = await prisma.products.create({
        data: {
          name,
          price,
          usersId: token.id,
        },
      });
      return Response.json(newProduct, { status: 201 });
    } else {
      return Response.json({ error: "No user id" }, { status: 401 });
    }
  } catch (error) {
    console.error("Create Product error: ", error);
    Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

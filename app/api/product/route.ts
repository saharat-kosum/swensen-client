import { AddPostPayload } from "@/app/type";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    return Response.json(await prisma.products.findMany());
  } catch (error) {
    console.error("Get all products error: ", error);
    return Response.json({ error: "Internal server error" });
  }
}

export async function POST(req: Request) {
  try {
    const id = '1'
      // Check if req.body is null
    if (req.body === null) {
      throw new Error('Request body is null');
    }
    const body = req.body as unknown;
    const { name, price } = body as AddPostPayload
    const newProduct = await prisma.products.create({
      data: {
        name,
        price,
        usersId : id
      },
    });
    return Response.json(newProduct)
  } catch (error) {
    console.error("Create Product error: ", error);
    Response.json({ error: "Internal server error" });
  }
}

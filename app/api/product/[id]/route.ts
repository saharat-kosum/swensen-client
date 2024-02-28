import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    return Response.json(
      await prisma.products.findUnique({
        where: { id: params.id },
      })
    );
  } catch (error) {
    console.error("Get products by id error: ", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, price, usersId } = await request.json();
    const updatedProduct = await prisma.products.update({
      where: { id: params.id },
      data: { name, price, usersId },
    });
    if (!updatedProduct) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }
    return Response.json(updatedProduct);
  } catch (error) {
    console.error("Edit products error: ", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedProduct = await prisma.products.delete({
      where: { id: params.id },
    });
    if (!deletedProduct) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }
    return Response.json(deletedProduct);
  } catch (error) {
    console.error("Delete products error: ", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

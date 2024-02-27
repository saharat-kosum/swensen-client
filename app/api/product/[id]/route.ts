import { ProductType } from "@/app/type";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
  return Response.json(await prisma.products.findUnique({
    where: {id : params.id}
  }))
  } catch (error) {
    console.error("Get products by id error: ", error);
    return Response.json({ error: "Internal server error" }, {status: 500});
  }
}

export async function PUT(request : Request, {params} : {params: {id: string}}) {
    try {
      
    } catch (error) {
    console.error("Get all products error: ", error);
    return Response.json({ error: "Internal server error" }, {status: 500});
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const query = "DELETE FROM products WHERE id = $1 RETURNING *";
    const product: ProductType[] = await db.query(query, [productId]);
    if (product.length > 0) {
      res.status(200).json(product[0]);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.error("Delete Product error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { name, price } = req.body;
    const params = [name, price, productId];
    const query =
      "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *";
    const product: ProductType[] = await db.query(query, params);
    if (product.length > 0) {
      res.status(200).json(product[0]);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.error("Update Product error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

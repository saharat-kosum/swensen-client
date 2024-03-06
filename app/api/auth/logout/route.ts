import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    cookies().delete("userToken");
    return Response.json({ message: "Log out success" });
  } catch (error) {
    console.error("Log out failed: ", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

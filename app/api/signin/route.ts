import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
const prisma = new PrismaClient(); // Adjust the path to your prisma client instance

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email }, // Ensure you're using the email correctly
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    
    if (!user.verified) {
      throw new Error("Email not verified. Please check your inbox.");
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error logging in:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return NextResponse.json(
      { message: "Login failed", error: errorMessage },
      { status: 401 }
    );
  }
}

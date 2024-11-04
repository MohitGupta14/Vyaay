import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { transporter } from "./utils/transporter";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { mail : encodedMail, userId, action, name, password } = await req.json();
    const mail = decodeURIComponent(encodedMail)
    
    // Validate input
    if (!mail || !userId) {
      return NextResponse.json(
        { error: "Mail and userId are required" },
        { status: 400 }
      );
    }

    if (action === "sendMail") {
      await transporter.sendMail({
        from: '"Mohit Gupta 👻" <Vyaay@gmail.com>',
        to: mail,
        subject: `Hello ✔ ${userId}`,
        text: "Hello world?",
        html: "<b>Hello world?</b>",
      });

      return NextResponse.json({ message: "Email sent successfully" });
    }

    if (action === "addFriend") {
        console.log(mail)
      let findUser = await prisma.user.findUnique({
        where: { email: mail },
      });

      // Create a new user if not found
      if (!findUser) {
        const hashedPassword = await bcrypt.hash(password, 10);

        findUser = await prisma.user.create({
          data: {
            name,
            email: mail,
            password: hashedPassword,
          },
        });
      }

      // Helper function to create friendships
      const createFriendship = async (userId: number, friendId: number) => {
        await prisma.friendship.create({
          data: {
            userId,
            friendId,
          },
        });
      };
     
      // Create friendship in both directions
      await createFriendship(parseInt(userId),findUser.id);
      await createFriendship(findUser.id, parseInt(userId));

      return NextResponse.json({
        message: "Friends added successfully",
        findUser,
      },{status : 200});
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

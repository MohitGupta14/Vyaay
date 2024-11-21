import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { transporter } from "./utils/transporter";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {
      mail: encodedMail,
      userId,
      action,
      name,
      password,
    } = await req.json();
    const mail = decodeURIComponent(encodedMail);

    if (action === "sendMail") {
      if (!mail || !userId) {
        return NextResponse.json(
          { error: "Mail and userId are required" },
          { status: 400 }
        );
      }

      await transporter.sendMail({
        from: '"Mohit Gupta 👻" <Vyaay@gmail.com>',
        to: mail,
        subject: `Join Me on Vyaay!`,
        text: `Hi, I'd love for you to join me on Vyaay, a great platform for connecting and sharing. Sign up here: ${process.env.VYAAY_REGISTRATION_LINK}. Looking forward to seeing you there!`,
        html: `
          <p>Hi,</p>
          <p>I'd love for you to join me on Vyaay, a great platform for connecting and sharing.</p>
          <p>Sign up here: <a href="${process.env.NEXTAUTH_URL}/invite/${userId}/${mail}">Link</a>.</p>
          <p>Looking forward to seeing you there!</p>
        `,
      });

      return NextResponse.json({
        message: "Email sent successfully",
        status: 200,
      });
    }

    if (action === "addFriend") {
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
      await createFriendship(parseInt(userId), findUser.id);
      await createFriendship(findUser.id, parseInt(userId));

      return NextResponse.json(
        {
          message: "Friends added successfully",
          findUser,
        },
        { status: 200 }
      );
    }

    if (action === "verifyUsers") {
      const user = await prisma.user.findUnique({
        where: { email: mail },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      await transporter.sendMail({
        from: '"Mohit Gupta 👻" <Vyaay@gmail.com>',
        to: mail,
        subject: `Join Me on Vyaay!`,
        text: `Hi ${name}, I'd love for you to join me on Vyaay, a great platform for connecting and sharing. Sign up here: ${process.env.VYAAY_REGISTRATION_LINK}. Looking forward to seeing you there!`,
        html: `
          <p>Hi,</p>

          <p>Welcome to Vyaay! We're excited to have you on board.</p>

          <p>Before you start managing your finances like a pro, please verify your email address by clicking the link below:</p>

          <p style="margin: 10px;">
            <a href="${process.env.NEXTAUTH_URL}/verify/${mail}" style="background-color: #28a745; color: #fff; padding: 5px 5px; border-radius: 5px; text-decoration: none; font-weight: bold;">
              Verify Your Email
            </a>
          </p>

          <p>Once verified, you'll be able to explore all the features and manage your Vyaay account effortlessly.</p>

          <p>Looking forward to seeing you there!</p>

          <p style="margin-top: 20px;">
            <strong>Best Regards,</strong><br />
            Mohit Gupta<br />
            Creator of Vyaay
          </p>

          <p style="font-size: 12px; color: #888;">
            If you did not sign up for Vyaay, please disregard this email.
          </p>
        `,
      });

      return NextResponse.json({
        message: "Email sent successfully",
        status: 200,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
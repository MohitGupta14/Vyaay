import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId, friendId } = await req.json(); // Extract user ID and friend ID from the request body

  if (!userId || !friendId) {
    return NextResponse.json(
      { error: "userId and friendId are required" },
      { status: 400 }
    );
  }

  try {
    // Create a friendship relationship
    await prisma.friendship.create({
      data: {
        userId: parseInt(userId),
        friendId: parseInt(friendId),
      },
    });

    // Create the reciprocal friendship
    await prisma.friendship.create({
      data: {
        userId: parseInt(friendId),
        friendId: parseInt(userId),
      },
    });

    return NextResponse.json(
      { message: "Friend added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding friend:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Parse the URL and get the query parameters
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    const friendIdParam = searchParams.get("friendId");
    const friendId = friendIdParam ? parseInt(friendIdParam, 10) : null;
    const userId =  searchParams.get("userId");
    // Validate the parameters
    if(action === "getFriendById"){
      if (!friendId) {
        return NextResponse.json(
          { error: "Invalid parameters" },
          { status: 400 }
        );
      }

      // Find the friend by ID
      const findFriends = await prisma.friendship.findUnique({
        where: { id: friendId },
        include: {
          friend: true,
        },
      });

      // If friend is not found, return a 404 error
      if (!findFriends) {
        return NextResponse.json({ error: "Friend not found" }, { status: 404 });
      }

      // Return the found friend
      return NextResponse.json(
        { success: true, data: findFriends },
        { status: 200 }
      );
    }

    if(action === "getFriendByUserId"){

      if(!userId){
        return NextResponse.json(
          { error: "Invalid parameters" },
          { status: 400 }
        );
      }

      const findFriends = await prisma.user.findUnique({
        where: { id: parseInt(userId)},
        include: {
          friendships: {
            include : {
              user : true
            }
          },
        },
      });

      if (!findFriends) {
        return NextResponse.json({ error: "Friend not found" }, { status: 404 });
      }

      return NextResponse.json(
        { success: true, data: findFriends.friendships },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching friend:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { data } = await req.json();

    if (
      !data.splits ||
      !Array.isArray(data.splits) ||
      data.splits.length === 0
    ) {
      return NextResponse.json(
        { error: 'At least one split must be provided in the "splits" array' },
        { status: 400 }
      );
    }

    // Create an array to hold the created splits
    const createdSplits = [];

    // Iterate over the splits array and create each split in the database
    for (const splitData of data.splits) {
      const { userId, shares, transactionId } = splitData;
      // Validate individual split data
      if (!userId || !shares || !transactionId) {
        return NextResponse.json(
          {
            error:
              "userId, shares, and transactionId are required for each split",
          },
          { status: 400 }
        );
      }

      // Create the split in the database
      const split = await prisma.split.create({
        data: {
          userId,
          shares,
          transactionId,
        },
      });

      // Add the created split to the results array
      createdSplits.push(split);
    }

    // Return the created splits with a success status
    return NextResponse.json(createdSplits, { status: 201 });
  } catch (err) {
    console.error("Error creating splits:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Parse URL parameters for a GET request
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    const splitId = searchParams.get("splitId");
    const transactionId = searchParams.get("transactionId");
    // Validate the action and splitId
    if (action == "getSplitById") {
      if (!splitId) {
        return NextResponse.json(
          { error: "splitId is required" },
          { status: 400 }
        );
      }

      // Attempt to find the split by ID
      const split = await prisma.split.findUnique({
        where: { id: Number(splitId) }, // Convert splitId to a number
      });

      // Check if the split exists
      if (!split) {
        return NextResponse.json({ error: "Split not found" }, { status: 404 });
      }

      // Return the found split
      return NextResponse.json(split, { status: 200 });
    }

    if (action == "getSpltByTranactionId") {
      if (!transactionId) {
        return NextResponse.json(
          { error: "splitId is required" },
          { status: 400 }
        );
      }

      const split = await prisma.split.findMany({
        where: { transactionId: Number(transactionId) },
        include : {
          user : {
            select : {
              name : true
            }
          }
        }
      });

      if (!split) {
        return NextResponse.json({ error: "Split not found" }, { status: 404 });
      }

      // Return the found split
      return NextResponse.json(split, { status: 200 });
    }

    if(action == "getSplitByUserAndTransactionId"){
      const {userId, groupId} = await req.json();

      const findSplits =  await prisma.split.findMany({
        where: {
          userId : userId,
          transaction : {groupId : groupId}
        }
      });

      return NextResponse.json(findSplits, {status: 200});
    }
  } catch (error) {
    console.error("Error fetching split:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, res: Response) {
  try {

    const { userId, id ,action } = await req.json();

    if (action === "settled") {
      const split = await prisma.split.findUniqueOrThrow({
        where: {
          id : id,
        },
      });

      if (!split) {
        return NextResponse.json({ message: 'Split not found' }, { status: 404 });
      }

      if (split.userId === userId) {
        const updatedSplit = await prisma.split.update({
          where: {
            id: id,
          },
          data: {
            paid: true,
          },
        });

        return NextResponse.json(updatedSplit, { status: 200 });
      } else {
        return NextResponse.json({ message: 'User ID does not match' }, { status: 403 });
      }
    } else {
      return NextResponse.json({ message: 'Invalid method' }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 400 });
  }
}
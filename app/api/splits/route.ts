import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { action, userId, shares, transactionId } = await req.json();

    // Validate the action and required fields
    if (action !== 'createSplit') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    if (!userId || !shares || !transactionId) {
      return NextResponse.json(
        { error: 'userId, shares, and transactionId are required' },
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

    // Return the created split with a success status
    return NextResponse.json(split, { status: 201 });
  } catch (err) {
    console.error('Error creating split:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // Parse URL parameters for a GET request
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const splitId = searchParams.get('splitId');
    const transactionId = searchParams.get('transactionId');
    // Validate the action and splitId
    if (action == 'getSplitById') {

        if (!splitId) {
        return NextResponse.json({ error: 'splitId is required' }, { status: 400 });
        }

        // Attempt to find the split by ID
        const split = await prisma.split.findUnique({
        where: { id: Number(splitId) }, // Convert splitId to a number
        });

        // Check if the split exists
        if (!split) {
        return NextResponse.json({ error: 'Split not found' }, { status: 404 });
        }

        // Return the found split
        return NextResponse.json(split, { status: 200 });
    }

    if(action == 'getSpltByTranactionId'){
       
      if(!transactionId){
        return NextResponse.json({ error: 'splitId is required' }, { status: 400 });
      }

      const split = await prisma.split.findMany({
        where: { transactionId: Number(transactionId) }, // Convert splitId to a number
        });

      if (!split) {
        return NextResponse.json({ error: 'Split not found' }, { status: 404 });
      }

        // Return the found split
      return NextResponse.json(split, { status: 200 });

    }
  } catch (error) {
    console.error('Error fetching split:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
 
}
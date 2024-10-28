import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request, res: NextResponse){
  try {
    const { action, groupName, adminId, memberId, description, groupId } = await req.json();

    if (action === 'createGroup') {
      // Validate the required field for creating a group
      try {
        // Create a new grcoup with the provided groupName and associate it with members
        const newGroup = await prisma.group.create({
          data: {
            groupName,
            adminId,
            description,
            members: {
                connect: { id: adminId },
            },
          },
        });
  
        return NextResponse.json(newGroup);
      } catch (error) {
        console.error('Error creating group:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
      }
    }

    if (action === 'addMember') {
      // Validate the required fields for adding a member
      if (!groupId || !memberId) {
        return NextResponse.json({ error: 'groupId and memberId are required' }, { status: 400 });
      }

      // Update the group by connecting the new member
      const updatedGroup = await prisma.group.update({
        where: { id: groupId },
        data: {
          members: {
            connect: { id: memberId },
          },
        },
      });

      return NextResponse.json(updatedGroup, { status: 200 });
    }

    // If the action is not recognized, return a 400 Bad Request
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // Parse URL parameters instead of reading JSON for a GET request
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const groupId = searchParams.get('groupId');

    // Validate the input
    if (action !== 'getGroupById') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    if (!groupId) {
      return NextResponse.json({ error: 'groupId is required' }, { status: 400 });
    }

    // Attempt to find the group by ID
    const group = await prisma.group.findUnique({
      where: { id: Number(groupId) }, // Ensure groupId is a number
      include: {
        members: true, // This will include the related User records
        transaction : true
      },
    });

    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

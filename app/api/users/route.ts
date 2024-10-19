// app/api/user/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET requests (Read all users or a specific user)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  }

  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// Handle POST requests (Create a new user)
export async function POST(req: Request) {
  const { name, email,password } = await req.json();
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password
      },
    });
    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user', error: error }, { status: 400 });
  }
}

// Handle PUT requests (Update a user)
export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const { name, email } = await req.json();

  if (!id) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
      },
    });
    return NextResponse.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating user', error: error }, { status: 400 });
  }
}

// Handle DELETE requests (Delete a user)
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting user', error: error }, { status: 400 });
  }
}
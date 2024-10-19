import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response){
  
    const {amount, groupId, description} = await req.json();

    try {
        const createTransaction = await prisma.transaction.create({
            data : {
                amount,
                groupId,
                description
            }
       })

       return NextResponse.json(createTransaction);
    } catch (error) {
        console.error('Error creating Transaction:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}

export async function GET(req: Request, res: Response){
    try {
        // Parse URL parameters instead of reading JSON for a GET request
        const { searchParams } = new URL(req.url);
        const action = searchParams.get('action');
        const tranactionId = searchParams.get('tranactionId');
        const groupId = searchParams.get('groupId'); 
        // Validate the input
        if (action == 'getTranactionById') {
          
            if (!tranactionId) {
            return NextResponse.json({ error: 'tranactionId is required' }, { status: 400 });
            }
        
            // Attempt to find the group by ID
            const transaction = await prisma.transaction.findUnique({
            where: { id: Number(tranactionId) }, 
            });
        
            if (!transaction) {
            return NextResponse.json({ error: 'transaction not found' }, { status: 404 });
            }
        
            return NextResponse.json(transaction, { status: 200 });
        }

        if(action == 'getTranactionByGroupId') {
            if (!groupId) {
                return NextResponse.json({ error: 'groupId is required' }, { status: 400 });
                }
            
            const transactions = await prisma.transaction.findMany({
                where: { groupId: Number(groupId) }, // Ensure groupId is a number
                include: {
                    splits: true, // Include related splits if needed
                    group: true,  // Optionally include the group details
                },
                });
        

            if (!transactions) {
                return NextResponse.json({ error: 'Group not found' }, { status: 404 });
            }

            return NextResponse.json(transactions, { status: 200 });

        }

        return NextResponse.json({ error: 'Invalid parameters' }, { status: 500});
      } catch (error) {
        console.error('Error handling request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
}
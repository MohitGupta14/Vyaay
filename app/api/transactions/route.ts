import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    // Parse the request body
    const { amount, groupId, description, paidByid } = await req.json();
   
    try {
        // Create the transaction and associate with existing group and user
        const createTransaction = await prisma.transaction.create({
            data: {
                amount,
                description,
                group: {
                    connect: { id: groupId },  
                },
                paidBy: {
                    connect: { id: paidByid }, 
                },
            }
        });

        // Return the created transaction as a JSON response
        return NextResponse.json(createTransaction);
    } catch (error: any) {
        // Log the error (optional) and send a response with error details
        console.error('Error creating Transaction:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function GET(req: Request){
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
                include :{
                    splits : true
                }
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
                    paidBy : {
                        select : {
                            name : true
                        }
                    },
                    splits: true, 
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
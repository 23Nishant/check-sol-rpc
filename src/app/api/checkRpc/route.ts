import { NextRequest, NextResponse } from 'next/server';
import { Connection } from '@solana/web3.js';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rpcUrl } = body;

    if (!rpcUrl) {
      return NextResponse.json({ error: 'RPC URL is required' }, { status: 400 });
    }

    try {
      const connection = new Connection(rpcUrl);
      const version = await connection.getVersion();
      const slot = await connection.getSlot();
      const blockHeight = await connection.getBlockHeight();

      return NextResponse.json({
        status: 'RPC is working',
        version,
        currentSlot: slot,
        blockHeight,
      });
    } catch (error) {
      console.error('Error checking RPC:', error);
      return NextResponse.json({
        status: 'RPC is not working',
        error: (error as Error).message,
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error parsing request:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
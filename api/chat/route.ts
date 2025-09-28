import { NextRequest, NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Mock chat AI for demonstration.
 * Replace this with a real AI integration or on-chain logic as needed.
 */
async function generateChatResponse(message: string): Promise<string> {
  // Simple stub logic; in production, call OpenAI or other LLM API
  return `You said: "${message}". This is a Devnet test response.`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json({ error: 'Message is required and must be a string' }, { status: 400 });
    }

    const userMessage = body.message.trim();
    const responseText = await generateChatResponse(userMessage);

    return NextResponse.json({
      success: true,
      message: responseText,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Chat API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ info: 'Chat API is running. Use POST with { "message": "..." }' });
}

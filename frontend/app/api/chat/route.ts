import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY not configured' },
        { status: 500 }
      );
    }

    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using a valid model name
      messages: [
        { role: 'system', content: 'You are a supportive mental coach.' },
        { role: 'user', content: message }
      ],
    });

    return NextResponse.json({
      reply: response.choices[0].message.content
    });
  } catch (error: any) {
    console.error('Error calling OpenAI API:', error);
    return NextResponse.json(
      { error: `Error calling OpenAI API: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}

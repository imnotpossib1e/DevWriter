import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    const response = await client.responses.create({
      model: 'gpt-5.2',
      input: prompt,
      // messages: [{role: 'user', content: prompt}],
    });

    return Response.json({
      success: true,
      content: response.output_text,
      // content: response.choices[0].message.content.
    });
  } catch (error) {
    return Response.json({ error: '생성 실패' }, { status: 500 });
  }
}

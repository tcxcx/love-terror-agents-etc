import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { tools } from '@/components/ai/tools';

export async function POST(request: Request) {
  const { messages, systemPrompt } = await request.json();

  const stream = await streamText({
    model: openai('gpt-4o'),
    system: systemPrompt || process.env.SYSTEM_MESSAGE,    
    messages,
    maxSteps: 5,
    tools,
  });

  return stream.toDataStreamResponse();
}



import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, keyword } = await req.json();

    const systemPrompt = `You are a blog writer for various websites. You create engaging, informative, and helpful content that is relevant to the websites and their audience. You write blogs in the following languages:
- English
- Hindi
- Russian
- Korean
- Japanese
- French
- Italian
- Chinese (zh-cn)

For each language, create a blog post based on the provided keyword while maintaining cultural relevance and natural language usage and each blog must be 250 characters long that include today's date  and author name : Aryan Nagbanshi`;

    const result = await streamText({
      model: openai("gpt-4"),
      messages,
      system: systemPrompt,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error processing blog request:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process blog request",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

import { GoogleGenAI } from "@google/genai";
import { NextResponse } from 'next/server';

// Initialize the client with the API key from the server-side environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function POST(request: Request) {
  try {
    const { base64Image, mimeType, prompt } = await request.json();

    if (!base64Image || !mimeType || !prompt) {
      return NextResponse.json(
        { error: 'Missing required fields: base64Image, mimeType, or prompt' },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    // Iterate through parts to find the image
    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const returnMime = part.inlineData.mimeType || 'image/png';
          const resultImage = `data:${returnMime};base64,${part.inlineData.data}`;
          
          return NextResponse.json({ resultImage });
        }
      }
    }
    
    return NextResponse.json(
      { error: "No image data found in the response." },
      { status: 500 }
    );

  } catch (error: any) {
    console.error("Server API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Edits an image based on a text prompt using Gemini 2.5 Flash Image.
 * 
 * @param base64Image Raw base64 string of the image (no data URI prefix).
 * @param mimeType The MIME type of the image (e.g., 'image/jpeg').
 * @param prompt The text instruction for editing.
 * @returns A promise resolving to the base64 data URI of the generated image.
 */
export const editImage = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  try {
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
      // No specific imageConfig needed for basic editing unless aspect ratio changes are desired
    });

    // Iterate through parts to find the image
    // The response might contain text (reasoning) and/or inlineData (image)
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          // Construct the data URI
          // Note: The API usually returns PNG for generated images, but we check mimeType if provided
          const returnMime = part.inlineData.mimeType || 'image/png';
          return `data:${returnMime};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data found in the response.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

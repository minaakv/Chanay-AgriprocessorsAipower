/**
 * Edits an image based on a text prompt using our internal Next.js API.
 * This keeps the API key hidden on the server.
 */
export const editImage = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64Image,
        mimeType,
        prompt,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate image');
    }

    const data = await response.json();
    return data.resultImage;

  } catch (error) {
    console.error("Error calling Internal API:", error);
    throw error;
  }
};
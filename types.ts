export interface GeneratedImageResult {
  imageUrl: string;
  prompt: string;
  timestamp: number;
}

export interface ImageUploadState {
  file: File | null;
  previewUrl: string | null;
  base64Data: string | null; // Raw base64 without prefix
  mimeType: string | null;
}

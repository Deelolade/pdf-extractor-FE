
export interface UploadedDocument {
  _id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  textExtracted: string;
  createdAt: Date;
  processedAt: string;
  updatedAt: string;
  wordCount: number;
  summary?: string;
  __v?: number;
}
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface DocumentType {
    _id: string;
    fileName: string;
    fileUrl: string;
    processedAt: Date;
    summary: string;
    textExtracted: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    wordCount: number;
    __v?: number;
}
type DocumentStore = {
    documents: DocumentType[];
    setDocuments: (documents: DocumentType[]) => void;
}
export const useDocuments = create<DocumentStore>()(
    persist(
        (set) => ({
            documents: [],
            setDocuments: (documents: DocumentType[]) => set({ documents })
        }),
        {
            name: "document-storage",
            storage: createJSONStorage(() =>
                (typeof window !== 'undefined' ? localStorage : undefined) as Storage
            ),
        }
    )
)
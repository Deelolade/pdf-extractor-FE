import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { UploadedDocument } from '../types/document';

type DocumentStore = {
    documents: UploadedDocument[];
    setDocuments: (documents: UploadedDocument[]) => void;
}
export const useDocumentStore = create<DocumentStore>()(
    persist(
        (set) => ({
            documents: [],
            setDocuments: (documents: UploadedDocument[]) => set({ documents })
        }),
        {
            name: "document-storage",
            storage: createJSONStorage(() =>
                (typeof window !== 'undefined' ? localStorage : undefined) as Storage
            ),
            partialize: (state) => ({
                documents: state.documents.map((d) => {
                    const { textExtracted, ...rest } = d;
                    return rest; // store everything except textExtracted
                })
            })
        }
    )
)
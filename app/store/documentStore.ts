import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { UploadedDocument } from '../types/document';

type DocumentStore = {
    documents: UploadedDocument[];
    setDocuments: (documents: UploadedDocument[]) => void;
    currentDocument: UploadedDocument | null;
    setCurrentDocument: (document: UploadedDocument | null) => void;
}
export const useDocumentStore = create<DocumentStore>()(
    persist(
        (set) => ({
            documents: [],
            setDocuments: (documents: UploadedDocument[]) => set({ documents }),
            
            currentDocument: null,
            setCurrentDocument: (doc) => set({ currentDocument: doc }),
        }),
        {
            name: "document-storage",
            storage: createJSONStorage(() =>
                typeof window !== 'undefined' ? localStorage : (undefined as unknown as Storage)
            ),
            partialize: (state) => ({
                documents: state.documents.map(({ textExtracted, ...rest }) => rest),
            }),
        }
    )
)
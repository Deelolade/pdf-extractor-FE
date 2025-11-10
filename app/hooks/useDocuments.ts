import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UploadedDocument } from "../types/document";
import axios from "axios";
import { API_URL } from "../config/env";
import { toast } from "react-toastify";


// FUNCTIONS
const handleDocument = async (id: string): Promise<UploadedDocument> => {
    const res = await axios.get(`${API_URL}/document/${id}`, { withCredentials: true })
    console.log(res.data.document)
    return res.data.document;
}
const handleDeleteDocument = async (id: string) => {
    const res = await axios.delete(`${API_URL}/document/${id}`, { withCredentials: true })
    return res.data;
}
const handleFetchAllUserDocuments = async (): Promise<UploadedDocument[]> => {
    const res = await axios.get<{ documents: UploadedDocument[] }>(`${API_URL}/document`,
        { withCredentials: true })
    return res.data.documents;
}

const handleSummarizeDocument = async (id: string) => {
    const res = await axios.post(`${API_URL}/document/summarize/${id}`, {}, { withCredentials: true });
    return res.data;
};

// HOOKS
export const useDocumentById = (id?: string) => {
    return useQuery<UploadedDocument>({
        queryKey: ['document', id],
        queryFn: () => handleDocument(id!),
        staleTime: 10 * 60 * 1000,
        refetchOnMount: false,
        enabled: Boolean(id),
    })
}

export const useDeleteDocument = (id?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: handleDeleteDocument,
        onSuccess: (data) => {
            toast.success(data.message || 'Document deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['document', id] });
            queryClient.invalidateQueries({ queryKey: ['documents'] });
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || "Something went wrong while deleting document"
            toast.error(message)
        }
    })
}
export const useDocuments = () => {
    return useQuery<UploadedDocument[]>({
        queryKey: ['documents'],
        queryFn: handleFetchAllUserDocuments,
        staleTime: 5 * 60 * 1000,
        refetchOnMount: false,
    })
}

export const useSummarizeDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: handleSummarizeDocument,
        onSuccess: (data, id) => {
            toast.success(data.message || 'Summary created successfully!');
            queryClient.invalidateQueries({ queryKey: ['document', id] });
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message || 'Something went wrong while summarizing';
            toast.error(message);
        },
    })
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UploadedDocument } from "../types/document";
import axios from "axios";
import { API_URL } from "../config/env";
import { toast } from "react-toastify";


interface updateDocument {
    id: string;
  fileName: string;
}
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
const handleUpdateDocument = async ({id, fileName} : updateDocument) => {
    const res = await axios.put(`${API_URL}/document/update/${id}`,{ fileName }, { withCredentials: true });
    return res.data;
};

// HOOKS
export const useDocumentById = (id?: string) => {
    return useQuery<UploadedDocument>({
        queryKey: ['document', id],
        queryFn: () => handleDocument(id!),
        staleTime: 0,
        refetchOnWindowFocus: true, 
        refetchOnReconnect: true,
        refetchOnMount: true,
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
            queryClient.refetchQueries({ queryKey: ['totalUploads'], exact: true });
            queryClient.invalidateQueries({ queryKey: ['documents'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
            
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
        refetchOnWindowFocus: false
    })
}

export const useSummarizeDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: handleSummarizeDocument,
        onSuccess: (data, id) => {
            toast.success(data.message || 'Summary created successfully!');
            queryClient.invalidateQueries({ queryKey: ['document', id] });
            queryClient.invalidateQueries({ queryKey: ['documents'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });

        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message || 'Something went wrong while summarizing';
            toast.error(message);
        },
    })
}
export const useUpdateDocumentName = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: handleUpdateDocument,
         onSuccess:async (data, id) => {
            console.log(data)
            toast.success(data.message || 'Document name updated successfully!');
            queryClient.refetchQueries({ queryKey: ['document', id], exact: true });
            queryClient.refetchQueries({ queryKey: ['documents',], exact: true });
            queryClient.invalidateQueries({ queryKey: ['user'] });

        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message || 'Something went wrong while updating the name';
            toast.error(message);
        },
    })
}
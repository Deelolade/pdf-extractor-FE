import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../config/env";
import { FolderType } from "../components/FolderList";

const CreateNewFolder = async (name:string)=>{
    const res = await axios.post(`${API_URL}/folders/create`, {name}, { withCredentials: true });
    return res.data;
}

const getAllUserFolders = async () => {
    const res = await axios.get(`${API_URL}/folders/user`, { withCredentials: true });
    return res.data.folders;
}
const deleteFolder =  async (id:string)=>{
    const res = await axios.delete(`${API_URL}/folders/delete/${id}`, { withCredentials: true });
    return res.data;
}

export const useCreateFolder = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (name:string)=> CreateNewFolder (name),
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ['userFolders'] });
                    toast.success(data.message || 'Folder created successfully!');
                },
                onError: (error: any) => {
                    console.log(error?.response)
                    const message =
                        error?.response?.data?.message || 'Failed to create folder. Please try again.';
                    toast.error(message);
                },
    })
}

export const useFetchUserFolders = () =>{
    return useQuery<FolderType[]>({
        queryKey: ['userFolders'],
        queryFn: getAllUserFolders,
        staleTime:5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true, 
        refetchOnReconnect: true,
        refetchOnMount: true,
    })
}

export const useDeleteFolder = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id:string)=> deleteFolder(id),
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ['userFolders'] });
                    toast.success(data.message || 'Folder created successfully!');
                },
                onError: (error: any) => {
                    console.log(error?.response)
                    const message =
                        error?.response?.data?.message || 'Failed to create folder. Please try again.';
                    toast.error(message);
                },
    })
}

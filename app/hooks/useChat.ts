import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { API_URL } from "../config/env"

const getPreviousChats= async(id: string)=>{
    const res = await axios.get(`${API_URL}/document/chat/${id}`, {withCredentials: true})
    console.log(res.data.messages)
    return res.data.messages
}
export const useChats =(id?:string)=>{
    return useQuery({
        queryKey:['chat', id],
        queryFn:()=> getPreviousChats(id!),
        staleTime:0,
        refetchOnWindowFocus: true, 
        refetchOnReconnect: true,
        refetchOnMount: true,
        enabled: Boolean(id),
    })
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { API_URL } from "../config/env"
import { Message } from "../components/ChatPage"

const getPreviousChats = async (id: string) => {
    const res = await axios.get(`${API_URL}/document/chat/${id}`, { withCredentials: true })
    console.log(res.data.messages)
    return res.data.messages
}
const sendMessage = async (id: string, message: string): Promise<Message> => {
    const res = await axios.post(`${API_URL}/document/chat/${id}`, { message: message.trim() }, { withCredentials: true });
    return res.data.message;
}
export const useGetPreviousChats = (id?: string) => {
    return useQuery({
        queryKey: ['chat', id],
        queryFn: () => getPreviousChats(id!),
        staleTime: 0 * 60 * 1000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true,
        enabled: Boolean(id),
    })
}

export const useSendMessage = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<Message, Error, string, { previousMessages: Message[] }>({
        mutationFn: (message: string) => sendMessage(id, message),
        onMutate: async (message: string) => {
            await queryClient.cancelQueries({ queryKey: ['chat', id] });

            const previousMessages = queryClient.getQueryData<Message[]>(['chat', id]) || [];

            queryClient.setQueryData<Message[]>(['chat', id], [...previousMessages, { role: 'user', content: message }]);

            return { previousMessages };
        },
        onSuccess: (assistantMessage) => {
            queryClient.setQueryData<Message[]>(['chat', id], (old = []) => [...old, assistantMessage]);
        },
        onError: (_err, _msg, context) => {
            if (context?.previousMessages) {
                queryClient.setQueryData<Message[]>(['chat', id], context.previousMessages);
            }
        }
    })
}
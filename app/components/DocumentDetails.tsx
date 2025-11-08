"use client"

import { useParams } from 'next/navigation'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UploadedDocument } from "@/app/types/document";
import axios, { AxiosError } from 'axios';
import { API_URL } from '@/app/config/env';
import { useUser } from '../store/userStore';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Loading from './ui/Loading';

const DocumentDetails = () => {
    const { user } = useUser();
    const { id } = useParams() as { id: string }
    const [loading, setLoading] = useState(false)
    const handleDocument = async (id: string): Promise<UploadedDocument> => {
        const res = await axios.get(`${API_URL}/document/${id}`, { withCredentials: true })
        console.log(res.data.document)
        return res.data.document;
    }
    const { data: document, isLoading, isError } = useQuery<UploadedDocument>({
        queryKey: ['document', id],
        queryFn: () => handleDocument(id),
        staleTime: 10 * 60 * 1000,
        refetchOnMount: false,
        enabled: Boolean(id),
    })
    const fetchSummary = async (id: string) => {
        setLoading(true)
        try {
            const res = await axios.post(`${API_URL}/document/summarize/${id}`, { withCredentials: true });
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log('error:', error);
            toast.error(err?.response?.data.message || "Something went wrong");
        } finally {
            setLoading(false)
        }
    }
    console.log("document", document?.summary)
    return (
        <section className='flex-1  min-h-screen py-6 px-8'>
            {loading && <Loading />}
            <div className="flex items-center justify-between">
                <h2 className='text-2xl font-bold bg-blue-100/50 p-2 rounded-lg'>{document?.fileName}</h2>
                <button className='text-lg font-semibold bg-blue-700 hover:bg-blue-800 transition-colors duration-300 text-white px-6 py-2 rounded-lg'>Update</button>
            </div>
            <div className="mt-6">
                <div className=""></div>
                <div className="flex flex-col ">
                    <p className='font-semibold text-sm'> created at: {document?.createdAt
                        ? new Date(document.createdAt).toLocaleDateString()
                        : "—"}</p>
                    <div className=" flex justify-center items-center">
                        <div>{document?.summary ? (document?.summary.split(" ").slice(0, 500)) : (
                            <div className="mt-6 flex flex-col items-center justify-center text-center p-6 bg-slate-100 rounded-lg border border-slate-300">
                                <p className="text-lg font-semibold text-slate-700 mb-1">
                                    No summary available
                                </p>
                                <p className="text-slate-500 mb-4">
                                    It looks like this document hasn’t been summarized yet.
                                </p>
                                <button
                                    onClick={() => fetchSummary(id)}
                                    className="px-5 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900 transition-colors"
                                >
                                    Generate Summary
                                </button>
                            </div>
                        )}</div>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default DocumentDetails

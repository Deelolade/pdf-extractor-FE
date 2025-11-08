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
import { FiCheck, FiCopy, FiMessageSquare, FiTrash2 } from 'react-icons/fi';

const DocumentDetails = () => {
    const { user } = useUser();
    const { id } = useParams() as { id: string }
    const [loading, setLoading] = useState(false)

    const [copied, setCopied] = useState(false);
    const openChatWithAI = (docId: string) => {
        console.log(docId)
    }
    const handleDeleteDocument = async (docId: string) => {
        console.log(docId)
    }
    const handleCopySummary = async () => {
        if (!document?.summary) return;
        await navigator.clipboard.writeText(document.summary);
        setCopied(true);
        toast.success("Summary copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };
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
            const res = await axios.post(`${API_URL}/document/summarize/${id}`, {}, { withCredentials: true });
            console.log(res.data)
            toast.success(res.data.message)
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log('error:', error);
            toast.error(err?.response?.data.message || "Something went wrong");
        } finally {
            setLoading(false)
        }
    }
    return (
        <section className='flex-1 min-h-screen py-6 px-8'>
            {loading && <Loading />}
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-8">
                <div className="flex items-center justify-between">
                    <div className="">
                        <h2 className='text-2xl font-bold text-slate-800 mb-1 p-2 rounded-lg'>{document?.fileName}</h2>
                        <p className="text-sm text-slate-500">Uploaded by {user?.name || "You"}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-end mt-6">
                        <button
                            onClick={() => fetchSummary(id)}
                            className="px-5 py-2 text-sm font-medium bg-blue-700 hover:bg-blue-800 text-white rounded-md"
                        >
                            Regenerate Summary
                        </button>

                        {/* Copy Summary Button */}
                        <button
                            onClick={handleCopySummary}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white transition-colors ${copied ? "bg-green-600 hover:bg-green-700" : "bg-slate-700 hover:bg-slate-800"
                                }`}
                        >
                            {copied ? (
                                <>
                                    <FiCheck className="w-4 h-4" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <FiCopy className="w-4 h-4" />
                                    Copy Summary
                                </>
                            )}
                        </button>
                        
                    </div>
                </div>
                <div className="mt-12">
                    <div className=" flex flex-col mx-auto items-center ">
                        <div className="  flex justify-between items-center w-full ">
                            <div className='space-y-1'>
                                <p className=" text-sm font-medium text-gray-700">
                                    {document?.wordCount?.toLocaleString()} words
                                </p>
                                {document?.fileUrl ? (
                                    <a
                                        href={document.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                                    >
                                        View Original PDF
                                    </a>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">No file link available</p>
                                )}
                            </div>
                            <div className=" flex flex-col  items-end   space-y-1">
                                <p className="font-semibold text-sm text-left break-words">
                                    Created at:{" "}
                                    {document?.createdAt
                                        ? new Date(document.createdAt).toLocaleString()
                                        : "—"}
                                </p>
                                <p className="font-semibold text-sm text-left break-words">
                                    Last Modified:{" "}
                                    {document?.updatedAt
                                        ? new Date(document.updatedAt).toLocaleString()
                                        : "—"}
                                </p>
                            </div>
                        </div>
                        <div className="  ">
                            <div className='mx-auto'>{document?.summary ? (
                                <div className="mt-10  bg-white p-5 shadow-lg rounded-lg">
                                    <div className="text-sm font-semibold text-center text-gray-800 leading-loose break-w ords whitespace-pre-wrap">
                                        {document.summary.split(" ").join(" ")}
                                    </div>
                                </div>) : (
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
                            <div className="flex flex-wrap gap-3 justify-end mt-6">
                                <button
                            onClick={() => openChatWithAI(document?._id || "")}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-purple-600 hover:bg-purple-700 text-white"
                        >
                            <FiMessageSquare className="w-4 h-4" />
                            Chat with AI
                        </button>
                        <button onClick={() => handleDeleteDocument(document?._id || "")} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 text-white">
                            <FiTrash2 className="w-4 h-4" /> Delete
                        </button>
                            </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DocumentDetails

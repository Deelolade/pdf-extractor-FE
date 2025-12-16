"use client"

import { useParams, useRouter } from 'next/navigation'
import { UploadedDocument } from "@/app/types/document";
import { useUserStore } from '../store/userStore';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Loading from './ui/Loading';
import { FiCheck, FiCopy, FiMessageSquare, FiTrash2 } from 'react-icons/fi';
import { useDeleteDocument, useDocumentById, useSummarizeDocument, useUpdateDocumentName } from '@/app/hooks/useDocuments';
import ChangeFileName from './ui/modals/ChangeFileName';
import DeleteModal from './ui/modals/DeleteModalOpen';
import { useDocumentStore } from '../store/documentStore';

const DocumentDetails = () => {
    const { user } = useUserStore();
    const { id } = useParams() as { id: string }
    const router = useRouter()
    const [copied, setCopied] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
    const [changeFileNameModalOpen, setChangeFileNameModalOpen] = useState(false);
    const deleteDocument = useDeleteDocument();
    const summarizeDocument = useSummarizeDocument();
    const updateDocument = useUpdateDocumentName()
    const { setCurrentDocument, currentDocument:document } = useDocumentStore()


    const openChatWithAI = (document: UploadedDocument) => {
        const docId = document._id;
        router.push(`/chats/${docId}`)
        setCurrentDocument(document)
    }
    const handleDeleteButton = async (id: string) => {
        setSelectedDocumentId(id);
        setIsDeleteModalOpen(true);
    }
    const handleDeleteDocument = async (id: string) => {
        deleteDocument.mutate(id, {
            onSuccess: () => {
                router.push('/dashboard')
            }
        })
    }
    const handleCopySummary = async () => {
        if (!document?.summary) return;
        await navigator.clipboard.writeText(document.summary);
        setCopied(true);
        toast.success("Summary copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

   const handleChangeFileName =(newName: string)=>{
    updateDocument.mutate({ id: document?._id ?? ' ', fileName: newName})
   }
    return (
        <section className='flex-1 min-h-screen py-6 px-8'>
            {(summarizeDocument.isPending || updateDocument.isPending || updateDocument.isPending || deleteDocument.isPending) && <Loading/>}
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-8">
                <div className="flex items-center justify-between">
                    <div className="" onClick={()=> setChangeFileNameModalOpen(true)}>
                        <h2 className='text-2xl font-bold text-slate-800 mb-1 p-2 rounded-lg'>{document?.fileName}</h2>
                        <p className="text-sm text-slate-500">Uploaded by {user?.name || "You"}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-end mt-6">
                        <button
                            onClick={() => summarizeDocument.mutate(id)}
                            disabled={summarizeDocument.isPending}
                            className="px-5 py-2 text-sm font-medium bg-blue-700 hover:bg-blue-800 text-white rounded-md"
                        >
                            {document?.summary ? " Regenerate Summary": "Generate Summary"}
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
                                <p className="font-semibold text-sm text-left wrap-break-word">
                                    Created at:{" "}
                                    {document?.createdAt
                                        ? new Date(document.createdAt).toLocaleString()
                                        : "—"}
                                </p>
                                <p className="font-semibold text-sm text-left wrap-break-word">
                                    Last Modified:{" "}
                                    {document?.updatedAt
                                        ? new Date(document.updatedAt).toLocaleString()
                                        : "—"}
                                </p>
                            </div>
                        </div>
                        <div className=" ">
                            <div className='mx-auto  max-h-[60vh] overflow-y-auto'>{document?.summary ? (
                                <div className="mt-10 bg-white p-5 shadow-lg rounded-lg">
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
                                        onClick={() => summarizeDocument.mutate(id)}
                                        disabled={summarizeDocument.isPending}
                                        className="px-5 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900 transition-colors"
                                    >
                                        Generate Summary
                                    </button>
                                </div>
                            )}</div>
                        </div>
                        <div className="flex flex-wrap gap-3 justify-end mt-6">
                            <button
                                onClick={() => openChatWithAI(document!)}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                <FiMessageSquare className="w-4 h-4" />
                                Chat with AI
                            </button>
                            <button onClick={() => handleDeleteButton(document?._id || "")} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 text-white">
                                <FiTrash2 className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {changeFileNameModalOpen && (<ChangeFileName 
            isOpen={changeFileNameModalOpen}
            currentName= {document?.fileName ?? ''}
            onClose={()=> setChangeFileNameModalOpen(false)}
            onConfirm={handleChangeFileName}
            />)}
            {isDeleteModalOpen &&  selectedDocumentId && (
               <DeleteModal 
               selectedDocumentId={selectedDocumentId}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                 handleDeleteDocument={handleDeleteDocument}
               />
            )}

        </section>
    )
}

export default DocumentDetails

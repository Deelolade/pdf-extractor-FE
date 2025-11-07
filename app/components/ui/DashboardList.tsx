"use client"

import { API_URL } from "@/app/config/env"
import { UploadedDocument } from "@/app/types/document"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"

const DashboardList = () => {
    const route = useRouter();
    const fetchAllUserDocuments = async (): Promise<UploadedDocument[]> => {
        const res = await axios.get<{ documents: UploadedDocument[] }>(`${API_URL}/document/`,
            { withCredentials: true })
        console.log(res.data)
        return res.data.documents;

    }

    const { data: documents, isLoading, isError } = useQuery<UploadedDocument[]>({
        queryKey: ['documents'],
        queryFn: fetchAllUserDocuments,
        staleTime: 5 * 60 * 1000,
        refetchOnMount: false,
    })
    const handleRoute =(id: string)=>{
        route.push(`documents/${id}`)
    }
    return (
        <div className="mt-6">
            <h3 className="text-xl font-bold">Uploaded Documents</h3>
            <div className="mt-4 rounded-2xl border border-gray-400 py-2">
                <div className=" grid grid-cols-5 text-center text-lg py-2 font-bold border-b border-gray-400">
                    <p>file name</p>
                    <p>Uploaded</p>
                    <p>Word Count</p>
                    <p>Summary</p>
                    <p>Actions</p>
                </div>
                <div className="h-96 overflow-y-auto">
                    {documents?.map((doc, idx) => {
                        return (
                            <div onClick={()=> handleRoute(doc._id)} className="grid grid-cols-5 h-32 py-4 text-center font-semibold hover:bg-slate-300 transition-colors duration-200 place-content-center items-center" key={idx}>
                                <p>{doc.fileName}</p>
                                <p>{new Date(doc.createdAt).toLocaleDateString()}</p>
                                <p className="text-center">{doc.wordCount}</p>
                                <p>{doc?.summary
                                    ? doc.summary.split(" ").slice(0, 20).join(" ") + (doc.summary.split(" ").length > 30 ? "..." : "")
                                    : "No summary yet"}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default DashboardList

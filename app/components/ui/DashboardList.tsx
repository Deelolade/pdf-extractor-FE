"use client"

import { API_URL } from "@/app/config/env"
import { UploadedDocument } from "@/app/types/document"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import Loading from "./Loading"

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
    const handleViewDocument = (id: string) => {
        route.push(`documents/${id}`);
    };
    return (
        <div className="mt-6 flex-1 px-4">
            {isLoading && <Loading />}
            <h3 className="text-xl font-bold">Uploaded Documents</h3>
            <div className="mt-4 rounded-2xl border border-gray-400 py-2">
                <div className=" grid grid-cols-5 text-center text-lg py-2 font-bold border-b border-gray-400">
                    <p>file name</p>
                    <p>Uploaded</p>
                    <p>Word Count</p>
                    <p>Summary</p>
                    <p>Actions</p>
                </div>
                <div className=" overflow-y-auto">
                    {documents && documents?.length > 0 ? (documents?.map((doc, idx) => {
                        return (
                            <div className="grid grid-cols-5 h-32 py-4 text-center font-semibold hover:bg-slate-300 transition-colors duration-200 place-content-center items-center" key={doc._id || idx}>
                                <p>{doc.fileName}</p>
                                <p>{new Date(doc.createdAt).toLocaleDateString()}</p>
                                <p className="text-center">{doc.wordCount}</p>
                                <p>{doc?.summary
                                    ? doc.summary.split(" ").slice(0, 20).join(" ") + (doc.summary.split(" ").length > 30 ? "..." : "")
                                    : "No summary yet"}</p>
                                <div className="">
                                    <button className=" text-white px-6 py-2 bg-[#1F2937] rounded-lg" onClick={() => handleViewDocument(doc._id)} >View</button>
                                </div>
                            </div>
                        )
                    })) : (<p className="text-center text-gray-600 py-8">
                        You have not uploaded any documents yet !!
                    </p>)}
                </div>
            </div>
        </div>
    )
}

export default DashboardList

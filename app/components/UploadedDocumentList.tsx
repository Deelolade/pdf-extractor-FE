"use client"


import { useRouter } from "next/navigation"
import { Clock, Eye, FileText, } from "lucide-react"
import UploadDocument from "./UploadDocument"
import { useDocumentStore } from "../store/documentStore"
import DashboardMobileNav from "./DashboardMobileNav"
import { UploadedDocument } from "../types/document"

const UploadedDocumentList = () => {
    const route = useRouter();
    const { documents, setCurrentDocument } = useDocumentStore()

    const handleViewDocument = (doc: UploadedDocument) => {
        const id = doc._id
        if (!id) return;
        route.push(`documents/${id}`);
        setCurrentDocument(doc)
    };
    return (
        <>
            <div className="mt-4 flex-1 px-6">
                <header className="flex justify-between">
                    <h1 className="text-lg lg:text-2xl font-bold">Uploads</h1>
                    <DashboardMobileNav />
                </header>
                <UploadDocument />
                <div className="mt-4 rounded-2xl py-2 ">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Recent Activity</h2>
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>Last 30 days</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1  gap-6 overflow-y-auto max-h-[60vh]">
                        {documents && documents?.length > 0 ? (documents.map((doc, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all hover:shadow-lg"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                                                Uncategorized
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-semibold mb-2 line-clamp-1 text-slate-800">
                                            {doc.fileName}
                                        </h3>

                                        <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                                            {doc.summary}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                                    <div className="flex items-center gap-4 text-sm text-slate-600">
                                        <div className="flex items-center gap-1">
                                            <FileText className="w-4 h-4 text-slate-500" />
                                            <span>{doc.wordCount.toLocaleString()} words</span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4 text-slate-500" />
                                            <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleViewDocument(doc)}
                                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View
                                    </button>
                                </div>
                            </div>

                        ))) : (
                            <div className="flex flex-col items-center justify-center py-12 px-6 text-center rounded-2xl border border-dashed border-indigo-600/50">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-14 h-14 text-slate-500 mb-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2h2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2m-7 0h7" />
                                </svg>

                                <h3 className="text-xl font-medium  text-slate-900 mb-1">
                                    No Documents Uploaded Yet
                                </h3>

                                <p className="text-gray-600">
                                    Start analyzing! Please navigate to the **Uploads** page to add your documents.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadedDocumentList

import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { API_URL } from '../config/env'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Loading from './ui/Loading'

const UploadDocument = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const handleDocument = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        console.log("file", file)
        if (!file) {
            toast.error("No file found")
            return;
        }
        if (file.size > 20 * 1024 * 1024) {
            toast.error("File too large (max 10MB)");
            return;
        }

        if (!["application/pdf"].includes(file.type)) {
            toast.error("Only PDF files are allowed");
            return;
        }

        const formData = new FormData();
        formData.append("document", file)
        setLoading(true)
        try {

            const res = await axios.post(`${API_URL}/document/create`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            toast.success("uploaded successfully")
            console.log(res.data)
            const id = res.data.uploadId
            queryClient.refetchQueries({ queryKey: ['documents'], exact: true });
            queryClient.refetchQueries({ queryKey: ['totalUploads'], exact: true });
            router.push(`/documents/${id}`)
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            toast.error(err?.response?.data.message || "Somthing went wrong")
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className="">
            {loading && <Loading/>}
            <div className="relative mt-8 m-3">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-slate-900 transition-colors duration-500 bg-gray-50 hover:bg-blue-50">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <IoCloudUploadOutline className="text-2xl text-blue-900" />
                        </div>
                        <div>
                            <p className="text-lg font-medium text-gray-700">Upload your PDF documents</p>
                            <p className="text-sm text-gray-500 mt-1">Drag and drop your PDF files here, or click to browse and upload for analysis.</p>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <span>Supports: PDF only</span>
                            <span>•</span>
                            <span>Max 5 files</span>
                            <span>•</span>
                            <span>Up to 10MB each</span>
                        </div>
                    </div>
                    <input
                        // {...register("image")}
                        type="file"
                        id="image"
                        name="image"
                        // multiple
                        accept="pdf/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleDocument}
                    />
                </div>
            </div>
        </div>
    )
}

export default UploadDocument

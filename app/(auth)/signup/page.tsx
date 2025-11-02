"use client"
import Image from 'next/image';
import signUpImage from "@/public/images/signUpImage.jpg"
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpFormType, signUpSchema } from '@/app/schemas/authSchema';
const page = () => {

    const { register, handleSubmit, formState: {errors}} = useForm<signUpFormType>({
        resolver: zodResolver(signUpSchema)
    })
    return (
        <>
            <section className="flex justify-center items-center h-screen">
                <div className=" flex justify-center items-center h-screen w-screen ">
                    <div className="w-1/2 flex justify-center items-center">
                        <form className='w-[400px] p-8 shadow-lg rounded-lg'>
                            <div className=" text-center">
                                <h1 className='text-2xl font-semibold mb-3'>Sign Up</h1>
                                <p className='text-sm text-gray-500 font-semibold'>Sign up by entering your name, email address, and a secure password.</p>
                            </div>
                            <div className="flex flex-col gap-5 mt-6">
                                <div className="flex flex-col">
                                    <label htmlFor="" className='text-sm mb-2 font-semibold'>Name</label>
                                    <input type="text" className='border border-gray-300 px-3 py-1 rounded-md font-semibold outline-0' placeholder="e.g. John Doe" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="" className='text-sm mb-2 font-semibold'>Email Address</label>
                                    <input type="email" className='border border-gray-300 px-3 py-1 rounded-md font-semibold outline-0' placeholder="e.g. johndoe@example.com" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="" className='text-sm mb-2 font-semibold'>Password</label>
                                    <input type="password" className='border border-gray-300 px-3 py-1 rounded-md font-semibold outline-0' placeholder="Enter a strong password" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="" className='text-sm mb-2 font-semibold'> Confirm Password</label>
                                    <input type="password" className='border border-gray-300 px-3 py-1 rounded-md font-semibold outline-0' placeholder="Re-enter your password" />
                                </div>
                                <div className="">
                                    <button className='bg-black text-white text-sm w-full py-2 rounded-lg font-semibold'>Sign Up</button>
                                    <div className="mt-5 ">
                                        <p className=' text-center text-sm font-semibold  '>Already joined us? <Link href="/signin" className='hover:underline'>Sign in here</Link></p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                <div className="w-1/2 bg-green-200 h-screen flex justify-center items-center">
                    <Image src={signUpImage} alt='PDF_EXTARCTOR_IMAGE' className='w-full h-full object-cover' />
                </div>
                </div>
            </section>
        </>
    )
}

export default page;
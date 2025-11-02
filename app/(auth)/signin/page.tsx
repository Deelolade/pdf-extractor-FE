"use client"
import Image from 'next/image';
import signUpImage from "@/public/images/signUpImage.jpg"
import Link from 'next/link';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInFormType, signInSchema } from '@/app/schemas/authSchema';
import { useForm } from 'react-hook-form';

const page = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<signInFormType>({
        resolver: zodResolver(signInSchema)
    })
    const onSubmit = (data: signInFormType) => {
        console.log(data);
    }
    return (
        <>
            <section className="flex justify-center items-center h-screen">
                <div className=" flex justify-center items-center h-screen w-screen ">
                    <div className="w-1/2 flex justify-center items-center">
                        <form className='w-[400px] p-8 shadow-lg rounded-lg' onSubmit={handleSubmit(onSubmit)}>
                            <div className=" text-center">
                                <h1 className='text-2xl font-semibold mb-3'>Sign In</h1>
                                <p className='text-sm text-gray-500 font-semibold'>Welcome back! Enter your email and password to access your account.</p>
                            </div>
                            <div className="flex flex-col gap-5 mt-6">
                                <div className="flex flex-col">
                                    <label htmlFor="" className='text-sm mb-2 font-semibold'>Email Address</label>
                                    <input type="email" {...register("email")} className='border border-gray-300 px-3 py-1 rounded-md font-semibold outline-0' placeholder="e.g. johndoe@example.com" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="" className='text-sm mb-2 font-semibold'>Password</label>
                                    <input type="password" {...register("password")} className='border border-gray-300 px-3 py-1 rounded-md font-semibold outline-0' placeholder="Enter your password" />
                                </div>
                                <div className="">
                                    <button className='bg-black text-white text-sm w-full py-2 rounded-lg font-semibold'>Sign In</button>
                                    <div className="mt-5 ">
                                        <p className=' text-center text-sm font-semibold'>New here? <Link href="/signup" className='hover:underline'>Sign Up</Link></p>
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
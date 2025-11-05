"use client"
import Image from 'next/image';
import signUpImage from "@/public/images/signUpImage.jpg"
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpFormType, signUpSchema } from '@/app/schemas/authSchema';
import axios, { AxiosError } from 'axios';
import { API_URL } from '@/app/config/env';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import ButtonLoading from '@/app/components/ui/ButtonLoading';
import { useUser } from '@/app/store/userStore';
const page = () => {
    const { setUser} = useUser();
    const [loading, setLoading] = useState<boolean>(false)
    const [passwordType, setPasswordType] = useState<boolean>(false)
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<signUpFormType>({
        resolver: zodResolver(signUpSchema),
        mode: "onSubmit"
    })
    const onSubmit = async (data: signUpFormType) => {
            setLoading(true)
        try {
            const res = await axios.post(`${API_URL}/auth/register`, data);
            toast.success(res.data.message || "User created successfully");
            setUser(res.data.user)
            router.push('/dashboard')
        }
        catch (error) {
            const err = error as AxiosError<{ message: string }>
            toast.error(err?.response?.data.message || "Somthing went wrong")
        } 
        finally{
            setLoading(false)
        }
    }
    return (
        <>
            <section className="flex justify-center items-center h-screen">
                <div className=" flex justify-center items-center h-screen w-screen ">
                    <div className="w-full lg:w-1/2 flex justify-center items-center">
                        <form className='w-[400px] p-8 shadow-sm lg:shadow-lg rounded-lg' onClick={handleSubmit(onSubmit)}>
                            <div className=" text-center">
                                <h1 className='text-xl md:text-2xl font-semibold mb-3'>Sign Up</h1>
                                <p className='text-sm text-gray-500 font-semibold'>Sign up by entering your name, email address, and a secure password.</p>
                            </div>
                            <div className="flex flex-col gap-5 mt-6">
                                <div className="flex flex-col">
                                    <label htmlFor="" className='text-sm mb-2 font-semibold'>Name</label>
                                    <input type="text" {...register("name")} className='border border-gray-300 px-3 py-1 rounded-md font-semibold outline-0' placeholder="e.g. John Doe" />
                                    {errors.name && <p className='text-sm text-red-500 mt-1 font-semibold'>{errors.name.message}</p>}
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="" className='text-sm mb-2 font-semibold'>Email Address</label>
                                    <input type="email" {...register("email")} className='border border-gray-300 px-3 py-1 rounded-md font-semibold outline-0' placeholder="e.g. johndoe@example.com" />
                                    {errors.email && <p className='text-sm text-red-500 mt-1 font-semibold'>{errors.email.message}</p>}
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="" className='text-sm mb-2 font-semibold'>Password</label>
                                    <div className="flex items-center border border-gray-300 px-3 py-1 rounded-md">
                                        <input type={passwordType ? "text" : "password"} {...register("password")} className=' w-full font-semibold outline-0' placeholder="Enter your password" />
                                        <i 
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => setPasswordType((prev) => !prev)}>{passwordType ? <LuEye /> : <LuEyeOff />}</i>
                                    </div>
                                    {errors.password && <p className='text-sm text-red-500 mt-1 font-semibold'>{errors.password.message}</p>}
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="" className='text-sm mb-2 font-semibold'> Confirm Password</label>
                                    <div className="flex items-center border border-gray-300 px-3 py-1 rounded-md">
                                        <input type={passwordType ? "text" : "password"} {...register("confirmPassword")} className=' w-full font-semibold outline-0' placeholder="Enter your password" />
                                    <i onClick={()=> setPasswordType((prev)=> !prev)}>{passwordType ? <LuEye/> : <LuEyeOff/>}</i>
                                    </div>
                                    {errors.confirmPassword && <p className='text-sm text-red-500 mt-1 font-semibold'>{errors.confirmPassword.message}</p>}
                                </div>
                                <div className="">
                                    <button className='bg-black hover:bg-gray-600 text-white text-sm w-full py-2 rounded-lg font-semibold  transition duration-200 ease-in-out'>{loading ? <ButtonLoading/> : "Sign Up"}</button>
                                    <div className="mt-5 ">
                                        <p className=' text-center text-sm font-semibold  '>Already joined us? <Link href="/signin" className='hover:underline'>Sign in here</Link></p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="hidden lg:flex md:w-1/2 h-screen justify-center items-center">
                        <Image src={signUpImage} loading='eager' alt='PDF_EXTARCTOR_IMAGE' className='w-full h-full object-cover' />
                    </div>
                </div>
            </section>
        </>
    )
}

export default page;
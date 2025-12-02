'use client'

import Image from 'next/image';
import signUpImage from "@/public/images/signUpImage.jpg"
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { API_URL } from '@/app/config/env';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import {  useState } from 'react';
import { LuEye, LuEyeOff } from "react-icons/lu";
import ButtonLoading from '@/app/components/ui/ButtonLoading';
import { resetPasswordFormType, resetPasswordSchema } from '@/app/schemas/authSchema';
import { useResetPassword } from '@/app/hooks/useUser';


const page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token'); // Get reset token from URL
    const [passwordType, setPasswordType] = useState(false);
    const [confirmPasswordType, setConfirmPasswordType] = useState(false);
    const resetPassword = useResetPassword(token || '');
    console.log(token)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<resetPasswordFormType>({
        resolver: zodResolver(resetPasswordSchema)
    });

    const onSubmit = async (data: resetPasswordFormType) => {
        if (!token) {
            toast.error("Invalid or missing reset token");
            return;
        }
       resetPassword.mutate({ token, newPassword: data.password });
    };

    return (
        <>
            <div className='flex min-h-screen bg-gray-50'>
                <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>
                    <div className='w-full max-w-md'>
                        <div className='mb-8'>
                            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                                Reset Password
                            </h1>
                            <p className='text-gray-600'>
                                Enter your new password below to reset your account password.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                            <div className="flex flex-col">
                                <label htmlFor="password" className='text-sm mb-2 font-semibold'>New Password</label>
                                <div className='relative'>
                                    <input
                                        type={passwordType ? "text" : "password"}
                                        id="password"
                                        {...register("password")}
                                        className='w-full border border-gray-300 px-3 py-1 rounded-md font-semibold outline-0'
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
                                        onClick={() => setPasswordType((prev) => !prev)}
                                    >
                                        {passwordType ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                                    </button>
                                </div>
                                {errors.password && <p className='text-sm text-red-500 mt-1 font-semibold'>{errors.password.message}</p>}
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="confirmPassword" className='text-sm mb-2 font-semibold'>Confirm Password</label>
                                <div className='relative'>
                                    <input
                                        type={confirmPasswordType ? "text" : "password"}
                                        id="confirmPassword"
                                        {...register("confirmPassword")}
                                        className='w-full border border-gray-300 px-3 py-1 rounded-md font-semibold outline-0'
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
                                        onClick={() => setConfirmPasswordType((prev) => !prev)}
                                    >
                                        {confirmPasswordType ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className='text-sm text-red-500 mt-1 font-semibold'>{errors.confirmPassword.message}</p>}
                            </div>

                            <button
                                type='submit'
                                disabled={resetPassword.isPending}
                                className='w-full bg-black hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                            >
                                {resetPassword.isPending ? <ButtonLoading /> : "Reset Password"}
                            </button>
                        </form>

                        <div className='mt-6 text-center'>
                            <p className='text-gray-600 text-sm'>
                                Remember your password?{' '}
                                <Link
                                    href='/signin'
                                    className='text-gray-600 hover:underline font-medium'
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='hidden lg:block lg:w-1/2 relative'>
                    <Image
                        src={signUpImage}
                        alt='Reset Password'
                        fill
                        className='object-cover'
                        priority
                    />
                </div>
            </div>
        </>
    );
};

export default page;
'use client'

import Image from 'next/image';
import signUpImage from "@/public/images/signUpImage.jpg"
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { API_URL } from '@/app/config/env';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ButtonLoading from '@/app/components/ui/ButtonLoading';
import { z } from 'zod';

// Forgot Password Schema
const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address')
});

type forgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;

const page = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<forgotPasswordFormType>({
        resolver: zodResolver(forgotPasswordSchema)
    });

    const onSubmit = async (data: forgotPasswordFormType) => {
        setLoading(true);
        try {
            const res = await axios.post(
                `${API_URL}/auth/forgot-password`,
                data,
                { withCredentials: true }
            );

            toast.success(res.data.message || "Password reset link sent to your email");

            // Optional: redirect to a confirmation page or back to sign in
            setTimeout(() => {
                router.push('/signin');
            }, 2000);

        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.log('error:', error);
            toast.error(err?.response?.data.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='flex min-h-screen bg-gray-50'>
                <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>
                    <div className='w-full max-w-md'>
                        <div className='mb-8'>
                            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                                Forgot Password
                            </h1>
                            <p className='text-gray-600'>
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                            <div className="flex flex-col">
                                <label htmlFor="" className='text-sm mb-2 font-semibold'>Email Address</label>
                                <input type="email" {...register("email")} className='border border-gray-300 px-3 py-1 rounded-md font-semibold outline-0' placeholder="e.g. johndoe@example.com" />
                                {errors.email && <p className='text-sm text-red-500 mt-1 font-semibold'>{errors.email.message}</p>}
                            </div>

                            <button
                                type='submit'
                                disabled={loading}
                                className='w-full bg-black hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                            >
                                {loading ? <ButtonLoading /> : "Send Reset Link"}
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
                        alt='Forgot Password'
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
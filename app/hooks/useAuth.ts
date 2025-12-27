'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from 'js-cookie'

export const useAuth = () => {
    const router = useRouter();

    useEffect(()=> {
        const token = Cookies.get('access_token');
        console.log('Token:', token);
        // if (!token) {
        //     router.push('/signin');
        // }
    }, [router]);
}
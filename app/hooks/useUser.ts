import axios from "axios";
import { API_URL } from "../config/env";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUserStore } from "../store/userStore";

export const fetchUser = async () => {
  const res = await axios.get(`${API_URL}/auth/me`, { withCredentials: true });
  return res.data.user;
}

const signInuser = async({email, password }:{email: string, password:string})=>{
  const res = await axios.post(`${API_URL}/auth/signin`,{email, password}, { withCredentials: true });
  return res.data.user;
}
export const logOutUser = async () => {
  const res = await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
  return res.data;
}

export const resetPassword = async ({ token, newPassword }: { token: string, newPassword: string }) => {
  const res = await axios.post(`${API_URL}/auth/reset-password/${token}`,{newPassword});
  return res.data;
}
export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 2 * 60 * 1000, // cache 2 minutes
    refetchOnWindowFocus: false,
  });
};
export const useSignInUser = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  return useMutation({
    mutationFn: signInuser,
    onSuccess: (data) => {
      toast.success("Signed in successfully");
      setUser(data.user)
      router.push('/dashboard');
    }, onError: () => {
      toast.error("Failed to sign in");
    }
  })
}
export const useLogOutUser = () => {
  return useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      window.location.href = '/signin';
      toast.success("Logged out successfully");
    }, onError: () => {
      toast.error("Failed to log out");
    }
  })
}
export const useResetPassword = (token: string) => {
  const router = useRouter();
  return useMutation({
    mutationFn:resetPassword,
    onSuccess:(data)=>{
      toast.success(data.message || "Password reset successfully");
      router.push('/signin');
    },
  onError: (error: any) => {
    toast.error(error?.response?.data?.message || "Failed to reset password");
  },
  })
}
'use client'
import { useUserStore } from "../store/userStore";
import DashboardList from "./DashboardList";
import { DashboardStats } from "./DashboardStats";
import { IconType } from "react-icons";
import DashboardMobileNav from "./DashboardMobileNav";



export type NavLinks = {
    label: string,
    link: string,
    icon: IconType
}

const DashboardMain = () => {
    
    const { user } = useUserStore();
    const currentUser = { ...user };
    return (
        <section className='flex-1  min-h-screen p-6'>
            <header className="flex justify-between">
                <h1 className="text-lg lg:text-2xl font-bold">Welcome, {currentUser?.name}</h1>
                <DashboardMobileNav />
            </header>
            <DashboardStats />
            <DashboardList />
        </section>
    )
}

export default DashboardMain

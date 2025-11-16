"use client"

import { useUser } from "../store/userStore";
import DashboardList from "./DashboardList";
import UploadDocument from "./UploadDocument";


const DashboardMain = () => {
    const { user } = useUser();
    const currentUser = { ...user };
    

return (
    <section className='flex-1  min-h-screen p-6'>
        <h1 className="text-2xl font-bold">Welcome, {currentUser?.name}</h1>
        <UploadDocument/>
        <DashboardList/>
    </section>
)
}

export default DashboardMain

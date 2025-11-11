"use client"
import DashboardSidebar from '@/app/components/DashboardSidebar';
import DocumentDetails from '@/app/components/DocumentDetails';

const page = () => {
    
    return (
        <main className='bg-primary min-h-screen flex items-center justify-between'>
            <DashboardSidebar />
            <DocumentDetails/>
        </main>
    )
}

export default page

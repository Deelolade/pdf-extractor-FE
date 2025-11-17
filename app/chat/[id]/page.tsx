import ChatPage from '@/app/components/ChatPage'
import DashboardSidebar from '@/app/components/DashboardSidebar'
import React from 'react'

const page = () => {
  return (
    <main className='bg-primary min-h-screen flex items-center justify-between'>
            <DashboardSidebar />
            <ChatPage/>
        </main>
  )
}

export default page

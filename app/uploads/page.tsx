import React from 'react'
import DashboardList from '../components/ui/DashboardList'
import DashboardSidebar from '../components/DashboardSidebar'

const page = () => {
  return (
    <main className='flex justify-between items-start '>
      <DashboardSidebar/>
      <div className="p-4">
        <DashboardList/>
      </div>
    </main>
  )
}

export default page

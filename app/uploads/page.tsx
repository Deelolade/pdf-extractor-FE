import React from 'react'
import DashboardList from '../components/ui/DashboardList'
import DashboardSidebar from '../components/DashboardSidebar'

const page = () => {
  return (
    <main className='flex justify-between items-start '>
      <DashboardSidebar/>
        <DashboardList/>
    </main>
  )
}

export default page

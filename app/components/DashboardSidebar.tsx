"use client"
import Link from 'next/link'
import { BiUserCircle } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegCaretSquareUp } from 'react-icons/fa'
import { LuClipboardList } from 'react-icons/lu'
import { PiSquaresFourBold } from 'react-icons/pi'
// import { useUser } from '../store/userStore'
import { usePathname } from 'next/navigation'
import { useUser } from '../hooks/useUser'
import Loading from './ui/Loading'

const DashboardSidebar = () => {
    const { data: user, isLoading} = useUser();
    console.log(user)
  const currentUser = { ...user };
  const pathName = usePathname();

  return (
    <aside className='w-1/5 bg-slate-900 min-h-screen p-6 flex flex-col  justify-between text-[#EFF6FF] '>
      {isLoading && <Loading/>}
      <div className="">
        <div className=" flex justify-between items-end">
        <h3 className='text-2xl font-semibold mt-3 text-[#EFF6FF]'>DocFeel</h3>
        <p className='text-sm font-semibold text-right'>{currentUser?.trialCount} / 5 trials</p>
      </div>
        <ul className='mt-12 text-[#EFF6FF]'>
          <Link href="/dashboard" className={`w-full hover:bg-gray-800 p-3 rounded-lg my-2 flex items-center text-white font-medium ${pathName === "/dashboard" ? "bg-gray-700": "hover:bg-gray-800"}`}>
            <PiSquaresFourBold className="h-6 w-6 mr-3" /> Dashboard
          </Link>
          <Link href="/uploads" className={`w-full hover:bg-gray-800 p-3 rounded-lg my-2 flex items-center text-white font-medium ${pathName === "/uploads" ? "bg-gray-700": "hover:bg-gray-800"}`}>
            <FaRegCaretSquareUp className="h-6 w-6 mr-3" /> Uploads
          </Link>
          <Link href="/analyses" className="w-full hover:bg-gray-800 p-3 rounded-lg my-2 flex items-center text-white font-medium">
            <LuClipboardList className="h-6 w-6 mr-3" /> Analyses Completed
          </Link>

        </ul>
      </div>
      <div className=" flex items-center justify-between ">
        <div className="flex items-center space-x-5">
          <BiUserCircle className='text-5xl' />
          <div className="">
            <h4 className='text-lg font-semibold'>{`${currentUser?.name}`}</h4>
            <p className='text-sm text-zinc-300'>{currentUser.plan} user</p>
          </div>
        </div>
        <span className='scale-150'>
          <BsThreeDotsVertical />
        </span>
      </div>
    </aside>
  )
}

export default DashboardSidebar

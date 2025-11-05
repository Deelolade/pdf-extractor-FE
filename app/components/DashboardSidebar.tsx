"use client"
import Link from 'next/link'
import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegCaretSquareUp } from 'react-icons/fa'
import { LuClipboardList } from 'react-icons/lu'
import { PiSquaresFourBold } from 'react-icons/pi'

const Sidebar = () => {
  let currentUser={
    firstname:"deelolade",
    lastname:"habeeb"
  }
  return (
    <aside className='w-1/5 bg-slate-900 min-h-screen p-6 flex flex-col  justify-between '>
      <div className="">
        <h3 className='text-sm font-semibold mt-3 text-[#EFF6FF]'>VoyagePro</h3>
        <ul className='mt-12 text-[#EFF6FF]'>
          <Link href='' className='w-full hover:bg-slate-600 p-3 rounded-lg my-2 flex items-center 2xl:text-lg font-medium '><span className='scale-150 me-3 '><PiSquaresFourBold /></span> Dashboard</Link>
          <Link href=''  className='w-full hover:bg-slate-600 p-3 rounded-lg my-2 flex items-center 2xl:text-lg font-medium'><span className='scale-150 me-3 '><FaRegCaretSquareUp /></span>Bookings</Link>
          <Link href='' className='w-full hover:bg-slate-600 p-3 rounded-lg my-2 flex items-center 2xl:text-lg font-medium'><span className='scale-150 me-3'><LuClipboardList /></span>Package Listings</Link>
          {/* <li className='w-full hover:bg-slate-200 p-3 rounded-lg my-2 flex items-center text-lg font-medium'><span className='scale-150 me-3'><RiSettings4Fill/></span>Settings</li> */}
        </ul>
      </div>
      <div className=" flex items-center justify-between ">
        <div className="flex items-center space-x-5">
          <BiUserCircle />
          <div className="">
            <h4 className='text-sm font-semibold'>{`${currentUser?.firstname} ${currentUser?.lastname}  `}</h4>
            <p className='text-sm text-zinc-500'>Traveler</p>
          </div>
        </div>
        <span className='scale-150'>
          <BsThreeDotsVertical />
        </span>
      </div>
    </aside>
  )
}

export default Sidebar

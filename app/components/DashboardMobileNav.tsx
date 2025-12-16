"use client"

import Link from 'next/link'
import { useState } from 'react'
import { PiSquaresFourBold } from "react-icons/pi";
import { FaRegCaretSquareUp } from "react-icons/fa";
import { FiFolder } from "react-icons/fi";
import { getLinkClasses } from './DashboardSidebar'
import { usePathname } from 'next/navigation'
import { NavLinks } from './DashboardMain';
import { Menu, X } from 'lucide-react';
import { useUserStore } from '../store/userStore';


const DashboardMobileNav = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    const pathName = usePathname();
    const {user} = useUserStore()
    const navigationLinks: NavLinks[] = [
        {
            label: "Dashboard",
            link: 'dashboard',
            icon: PiSquaresFourBold
        },
        {
            label: "Uploads",
            link: 'uploads',
            icon: FaRegCaretSquareUp
        },
        {
            label: "Folders",
            link: 'folders',
            icon: FiFolder
        }
    ]

    return (
        <div onClick={() => setSidebarOpen(!sidebarOpen)}  className='lg:hidden'>
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
                    <aside
                        onClick={(e) => e.stopPropagation()}
                        className={`
          fixed top-0 left-0 z-50 h-full bg-slate-900 text-[#EFF6FF] w-64
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
                    >
                        <div className="flex items-center justify-between h-14 px-4">
                            <span className="font-bold text-lg">DocFeel</span>
                            <span>{user?.trialCount} / 5</span>
                        </div>

                        <ul className='mt-8 px-2 text-[#EFF6FF] gap-5 md:flex md:flex-col'>
                            {
                                navigationLinks && navigationLinks.map((navlinks, idx) => {
                                    const Icon = navlinks.icon
                                    return (
                                        <Link href={`/${navlinks.link}`} key={idx} className={`${getLinkClasses(pathName, `/${navlinks.link}`)} my-8 w-full h-10 group relative flex justify-start items-center`}>
                                            <Icon className="h-8 w-8  " />
                                            <span className="inline">{navlinks.label}</span>
                                            <span className="pointer-events-none
      absolute left-full top-1/2 -translate-y-1/2 ml-3
      whitespace-nowrap
      rounded-md bg-slate-900 px-3 py-1 text-sm text-white
      opacity-0 scale-95
      transition-all duration-200 
      group-hover:opacity-100 group-hover:scale-100">{navlinks.label}</span>
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                    </aside>
                </div>
            )}
        </div>
    )
}

export default DashboardMobileNav

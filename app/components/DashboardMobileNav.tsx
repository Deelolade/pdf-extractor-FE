"use client"

import Link from 'next/link'
import { useRef, useState } from 'react'
import { PiSquaresFourBold } from "react-icons/pi";
import { FaRegCaretSquareUp } from "react-icons/fa";
import { FiFolder, FiLogOut } from "react-icons/fi";
import { getLinkClasses } from './DashboardSidebar'
import { usePathname } from 'next/navigation'
import { NavLinks } from './DashboardMain';
import { Menu, X } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useLogOutUser } from '../hooks/useUser';
import { useDocumentStore } from '../store/documentStore';


const DashboardMobileNav = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    const pathName = usePathname();
    const { user } = useUserStore()
    const [menuOpen, setMenuOpen] = useState(false);
    const logOutUser = useLogOutUser();
    const logOut = useUserStore(state => state.logOut);
    const clearStore = useDocumentStore(state => state.clearStore);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
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

    const handleLogOut = () => {
        logOutUser.mutate();
        logOut();
        clearStore()
    }

    return (
        <div onClick={() => setSidebarOpen(!sidebarOpen)} className='lg:hidden'>
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
                    <aside
                        onClick={(e) => e.stopPropagation()}
                        className={`
          fixed top-0 left-0 z-50 h-full bg-slate-900 text-[#EFF6FF] w-64
          transform transition-transform duration-300 flex flex-col justify-between p-2
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
                    >
                        <div className=" ">
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
                        </div>
                        <div className=" relative flex items-center justify-center lg:justify-between mt-8 pt-4 border-t border-slate-800">
                            <div className="hidden lg:flex items-center space-x-3 ">
                                {/* <HiOutlineUserCircle className='text-5xl ' /> */}
                                <div className="">
                                    <h4 className='text-lg font-semibold'>{`${user?.name || 'Guest'}`}</h4>
                                    <p className='text-sm text-zinc-300 capitalize'>{user?.plan || 'Free'} user</p>
                                </div>
                            </div>
                            <button ref={buttonRef} onClick={() => setMenuOpen(!menuOpen)} className='text-xl text-zinc-300 hover:text-white transition duration-150'>
                                <HiOutlineDotsVertical className='size-6' />
                            </button>

                            {menuOpen && (
                                <div ref={menuRef} className="absolute left-3 bottom-7  lg:right-4 lg:bottom-10 mt-2 w-48 bg-slate-800 shadow-lg rounded-lg py-2 z-20">
                                    <button
                                        onClick={handleLogOut}
                                        className="flex items-center px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 w-full text-left"
                                    >
                                        <FiLogOut className="mr-2" />
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            )}
        </div>
    )
}

export default DashboardMobileNav

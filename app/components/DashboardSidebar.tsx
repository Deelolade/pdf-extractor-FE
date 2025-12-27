"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLogOutUser, useUser } from '../hooks/useUser'
import Loading from './ui/Loading'
import { HiOutlineDotsVertical, HiOutlineUserCircle } from 'react-icons/hi'
import { FiFolder, FiLogOut } from 'react-icons/fi'
import { FaRegCaretSquareUp } from 'react-icons/fa'
import { PiSquaresFourBold } from 'react-icons/pi'
import { useEffect, useRef, useState } from 'react'
import { useUserStore } from '../store/userStore'
import { useDocumentStore } from '../store/documentStore'
import { IconType } from "react-icons"
import { NavLinks } from './DashboardMain'

const linkBaseClasses = "lg:w-full p-2 lg:p-3  rounded-lg my-2 flex justify-center lg:justify-start gap-4 items-center text-white font-medium transition duration-150 ease-in-out ";
const activeClass = "bg-gray-700";
const inactiveClass = "hover:bg-gray-800";
export const getLinkClasses = (pathName: string, href: string) => `${linkBaseClasses} ${pathName === href ? activeClass : inactiveClass}`;
const DashboardSidebar = () => {
    const { data: user, isLoading } = useUser();
    const currentUser = { ...user };
    const pathName = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const logOutUser = useLogOutUser();
    const logOut = useUserStore(state => state.logOut);
    const clearStore = useDocumentStore(state => state.clearStore);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target as Node)
            ) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const handleLogOut = () => {
        logOutUser.mutate();
        logOut();
        clearStore()
    }
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
        },
        {
            label: "Folders",
            link: 'folders',
            icon: FiFolder
        }
    ]
    const max_trials = currentUser.isPaidUser ? 50 : 5;
    console.log(currentUser.isPaidUser)
    return (
        <aside className='w-16 lg:w-1/5 bg-slate-900 min-h-screen h-screen px-2 lg:p-6 py-3 hidden md:flex flex-col justify-between text-[#EFF6FF] '>
            {isLoading && <Loading />}

            <div className="md:pt-3 lg:pt-0">
                <div className=" flex justify-between items-end pb-4 border-b border-slate-800">
                    <h3 className='text-2xl font-semibold mt-3 text-[#EFF6FF] hidden lg:inline'>DocFeel</h3>
                    {currentUser.isPaidUser && <p className='text-sm font-semibold text-center lg:text-right'>{currentUser?.trialCount || 0} / {max_trials} trials</p>}                   
                </div>
                <ul className='mt-12 text-[#EFF6FF] gap-3 md:flex md:flex-col'>
                    {
                        navigationLinks && navigationLinks.map((navlinks, idx) => {
                            const Icon = navlinks.icon
                            return (
                                <Link href={`/${navlinks.link}`} key={idx} className={`${getLinkClasses(pathName, `/${navlinks.link}`)} group relative`}>
                                    <Icon className="h-6 w-6 md:size-8  " />
                                    <span className="hidden lg:inline">{navlinks.label}</span>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>


            <div className=" relative flex items-center justify-center lg:justify-between mt-8 px-3 pt-4 border-t border-slate-800">
                <div className="hidden lg:flex items-center space-x-3 ">
                    {/* <HiOutlineUserCircle className='text-5xl ' /> */}
                    <div className="">
                        <h4 className='text-lg font-semibold'>{`${currentUser?.name || 'Guest'}`}</h4>
                        <p className='text-sm text-zinc-300 capitalize'>{currentUser.plan || 'Free'} user</p>
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
    )
}

export default DashboardSidebar
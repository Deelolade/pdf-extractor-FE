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

const DashboardSidebar = () => {
    const { data: user, isLoading } = useUser();
    const currentUser = { ...user };
    const pathName = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const logOutUser = useLogOutUser();
    const logOut = useUserStore(state => state.logOut);

    // Base styling for all links
    const linkBaseClasses = "w-full p-3 rounded-lg my-2 flex items-center text-white font-medium transition duration-150 ease-in-out";
    const activeClass = "bg-gray-700";
    const inactiveClass = "hover:bg-gray-800";

    const getLinkClasses = (href: string) => `${linkBaseClasses} ${pathName === href ? activeClass : inactiveClass}`;

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
    }
    return (
        <aside className='w-1/5 bg-slate-900 min-h-screen p-6 flex flex-col justify-between text-[#EFF6FF]'>
            {isLoading && <Loading />}

            <div className="">
                <div className=" flex justify-between items-end pb-4 border-b border-slate-800">
                    <h3 className='text-2xl font-semibold mt-3 text-[#EFF6FF]'>DocFeel</h3>
                    <p className='text-sm font-semibold text-right'>{currentUser?.trialCount || 0} / 5 trials</p>
                </div>
                <ul className='mt-12 text-[#EFF6FF]'>
                    <Link href="/dashboard" className={getLinkClasses("/dashboard")}>
                        <PiSquaresFourBold className="h-6 w-6 mr-3" /> Dashboard
                    </Link>
                    <Link href="/uploads" className={getLinkClasses("/uploads")}>
                        <FaRegCaretSquareUp className="h-6 w-6 mr-3" /> Uploads
                    </Link>
                    <Link href="/folders" className={getLinkClasses("/folders")}>
                        <FiFolder className="h-6 w-6 mr-3" /> Folders
                    </Link>

                </ul>
            </div>


            <div className=" relative flex items-center justify-between mt-8 pt-4 border-t border-slate-800">
                <div className="flex items-center space-x-3">
                    <HiOutlineUserCircle className='text-5xl' />
                    <div className="">
                        <h4 className='text-lg font-semibold'>{`${currentUser?.name || 'Guest'}`}</h4>
                        <p className='text-sm text-zinc-300 capitalize'>{currentUser.plan || 'Free'} user</p>
                    </div>
                </div>
                <button ref={buttonRef} onClick={() => setMenuOpen(!menuOpen)} className='text-xl text-zinc-300 hover:text-white transition duration-150'>
                    <HiOutlineDotsVertical />
                </button>

                {menuOpen && (
                    <div ref={menuRef} className="absolute right-4 bottom-10 mt-2 w-48 bg-slate-800 shadow-lg rounded-lg py-2 z-20">
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
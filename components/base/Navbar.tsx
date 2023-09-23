import React from 'react'
import Logo from './Logo'
import { Search } from 'lucide-react'
import NavMenu from './NavMenu'
import MobileNav from './MobileNav'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Navbar = async () => {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase.auth.getSession();
    // console.log("The Sessiion: ", data)
    return (
        <div className='flex items-center justify-between px-10 border-b-[1px]'>
            <div className='hidden md:block'>
                <Logo />
            </div>
            <div className='w-full md:w-auto'>
                <div className='hidden md:flex items-center space-x-2 border p-2 rounded-3xl'>
                    <span className='text-sm pl-2'>Anywhere</span>
                    <span>|</span>
                    <span className='text-sm'>Any week</span>
                    <span>|</span>
                    <span className='text-sm text-gray-400'>Add guest</span>
                    <span className='bg-brand text-white p-2 rounded-full'>
                        <Search height={17} width={17} />
                    </span>
                </div>
                <MobileNav />
            </div>
            <div className='hidden md:flex items-center space-x-4'>
                <span>Add your home</span>
                <NavMenu session={data?.session?.user} />
            </div>
        </div>
    )
}

export default Navbar

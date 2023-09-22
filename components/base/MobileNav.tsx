import React from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'

const MobileNav = () => {
    return (
        <div className='m-3 md:hidden'>
            <div className='flex items-center justify-between border rounded-3xl px-3 py-1'>
                <div className='flex items-center'>
                    <Search />
                    <div className='flex flex-col ml-5'>
                        <span className='text-sm font-semibold'>Any where</span>
                        <span className='text-sm'>Any week . Add guest</span>
                    </div>
                </div>
                <SlidersHorizontal />
            </div>
        </div>
    )
}

export default MobileNav

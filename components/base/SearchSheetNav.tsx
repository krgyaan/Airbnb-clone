import React from 'react'
import Logo from './Logo'
import { Input } from '../ui/input'
import NavMenu from './NavMenu'
import Link from 'next/link'

const SearchSheetNav = ({ session, searchInputCallback }: { session: any, searchInputCallback: (value: string) => void }) => {
    return (
        <div className='flex items-center justify-between'>
            <div>
                <Logo />
            </div>
            <Input
                type='search'
                placeholder='Search for a home'
                className='w-full md:w-1/3 rounded-3xl p-5'
                onChange={(e) => searchInputCallback(e.target.value)}
            />
            <div className='hidden md:flex items-center space-x-4'>
                <Link href="/addhome" className="text-sm font-semibold">
                    Add you home
                </Link>
                <NavMenu session={session} />
            </div>
        </div>
    )
}

export default SearchSheetNav

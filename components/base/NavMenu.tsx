import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { MenuIcon } from 'lucide-react'
import LoginModel from '../auth/LoginModel'
import SignupModel from '../auth/SignupModel'

const NavMenu = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <MenuIcon className='cursor-pointer' />
            </PopoverTrigger>
            <PopoverContent className='mr-6'>
                <ul>
                    <LoginModel />
                    <SignupModel />
                </ul>
            </PopoverContent>
        </Popover>

    )
}

export default NavMenu

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <div>
            <Link href='/'>
                <Image src="/images/logo.png" alt="Logo" width={110} height={110} className='hidden lg:block' />
                <Image src="/images/logo-sm.png" alt="Logo" width={90} height={90} className='lg:hidden' />
            </Link>
        </div>
    )
}

export default Logo

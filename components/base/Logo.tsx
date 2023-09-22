import Image from 'next/image'
import React from 'react'

const Logo = () => {
    return (
        <div>
            <Image src="/images/logo.png" alt="Logo" width={120} height={120} className='hidden lg:block' />
            <Image src="/images/logo-sm.png" alt="Logo" width={90} height={90} className='lg:hidden' />
        </div>
    )
}

export default Logo

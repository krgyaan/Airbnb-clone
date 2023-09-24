import AddHomeForm from '@/components/AddHomeForm'
import Navbar from '@/components/base/Navbar'
import { generateRandomNumber } from '@/lib/utils'
import Image from 'next/image'
// import Counter from '@/components/common/Counter'
import React from 'react'

const addHome = () => {
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className='grid grid-cols-1 md:grid-cols-2 place-items-center gap-4'>
                    <div>
                        <h1 className='text-brand font-bold text-7xl'>Airbnb it</h1>
                        <p className='text-black text-3xl font-semibold'>You could earn</p>
                        <div className='flex space-x-4 items-center'>
                            {/* <Counter /> */}
                            <h2 className='text-4xl font-bold'>{generateRandomNumber()}</h2>
                            <p className='text-3xl font-bold'>/per night</p>
                        </div>
                        <div className='flex space-x-4'>
                            <Image src='/images/home_img.jpeg' width={200} height={200} alt='home1' className='rounded-md object-cover' />
                            <Image src='/images/home_img1.jpeg' width={200} height={200} alt='home2' className='rounded-md object-cover' />
                        </div>
                    </div>
                    <div className=''>
                        <AddHomeForm />
                    </div>
                </div>
            </ div>
        </div>
    )
}

export default addHome

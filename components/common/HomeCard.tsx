import { getImageUrl } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomeCard = ({ home }: { home: HomesType }) => {
    return (
        <Link href={`/homes/${home.id}`}>
            <div>
                <Image
                    src={getImageUrl(home.image)}
                    alt={home.image}
                    width={100}
                    height={100}
                    className='w-full h-[250px] rounded-xl object-cover object-center'
                />
                <p className='font-semibold'>
                    {home.city} - {home.country}
                </p>
                <p>
                    {home.title}
                </p>
                <p>
                    {home.price}
                </p>
            </div>
        </Link>
    )
}

export default HomeCard

import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';
import Navbar from '@/components/base/Navbar';
import Image from 'next/image';
import { capitializeFirst, getImageUrl } from '@/lib/utils';

const FindHome = async ({ params }: { params: { id: number } }) => {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
        .from('homes')
        .select('*, users(metadata -> name)')
        .eq('id', params.id);
    const home: HomesType | null = data?.[0];

    return (
        <div className='container mb-10'>
            <Navbar />
            <div className='container mt-4'>
                <h1 className='text-2xl font-bold'>{home?.title}</h1>
                <p>{home?.city}, {home?.state}, {home?.country}</p>
                <Image
                    src={getImageUrl(home?.image)}
                    width={100}
                    height={100}
                    alt='home_image'
                    className='rounded-lg w-full h-[500px] object-cover object-center my-3'
                    unoptimized // to remove the bluryness of the image 
                />
                <h1 className='mt-5 text-2xl font-bold text-brand'>
                    Hosted by {capitializeFirst(home?.users?.name!)}
                </h1>
                <h1 className='mt-5 font-semibold text-2xl'>
                    {home?.title}
                </h1>
                <div
                    className='mt-5'
                    dangerouslySetInnerHTML={{ __html: home?.description || '' }}
                >
                </div>
            </div>
        </div>
    )
}

export default FindHome

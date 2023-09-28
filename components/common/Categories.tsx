"use client"

import { categories } from '@/config/categories'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Categories = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [cate, setCate] = useState('')

  useEffect(() => {
    if (params?.get("category")) {
      setCate(params?.get("category")!)
    }
  }, [params])

  const handleCategory = (category: string) => {
    const fullURL = new URL(window.location.href);
    fullURL.searchParams.set('category', category);
    router.replace(`/${fullURL.search}`);
  }

  return (
    <div className='flex items-center space-x-8 whitespace-nowrap px-10 my-3 overflow-x-auto pb-4 scrollbar scrollbar-h cursor-pointer'>
      {
        categories.map((item) =>
          <div
            key={item.name}
            className='flex flex-col items-center'
            onClick={() => handleCategory(item.name)}
          >
            <Image
              src={item.icon}
              alt={item.name}
              height={25}
              width={25}
            />
            <span className={`${item.name === cate ? "inline-block border-b-2 border-brand" : ""}`}>
              {item.name}
            </span>
          </div>
        )
      }
    </div>
  )
}

export default Categories

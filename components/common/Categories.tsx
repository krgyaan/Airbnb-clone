import { categories } from '@/config/categories'
import Image from 'next/image'
import React from 'react'

const Categories = () => {
  return (
    <div className='flex items-center space-x-8 whitespace-nowrap px-10 my-3 overflow-x-auto pb-4 scrollbar scrollbar-h'>
      {
        categories.map((item) =>
          <div key={item.name} className='flex flex-col items-center'>
            <Image src={item.icon} alt={item.name} height={25} width={25} />
            <span>{item.name}</span>
          </div>
        )
      }
    </div>
  )
}

export default Categories

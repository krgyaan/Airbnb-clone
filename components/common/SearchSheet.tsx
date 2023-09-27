"use client"

import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Search } from 'lucide-react'
import MobileNav from '@/components/base/MobileNav'
import SearchSheetNav from '../base/SearchSheetNav'
import DatePicker from './DatePicker'
import { Button } from '../ui/button'
import { addDays, format } from 'date-fns'
import { useRouter } from 'next/navigation'


const SearchSheet = ({ session }: { session: any }) => {
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState<string>();
  const router = useRouter();

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    },
  ])

  const handleSelectDate = (ranges: any) => {
    setState([ranges?.selection])
  }

  const handleSubmit = () => {
    const startDate = format(state[0].startDate, 'dd-MM-y')
    const endDate = format(state[0].endDate, 'dd-MM-y')

    router.replace(`/?location=${search}&startDate=${startDate}&endDate=${endDate}`)
    setShow(false)
  }

  return (
    <Sheet open={show}>
      <SheetTrigger>
        <div className='w-full md:w-auto cursor-pointer' onClick={() => setShow(true)}>
          <div className='hidden md:flex items-center space-x-2 border p-2 rounded-3xl'>
            <span className='text-sm pl-2'>Anywhere</span>
            <span>|</span>
            <span className='text-sm'>Any week</span>
            <span>|</span>
            <span className='text-sm text-gray-400'>Add guest</span>
            <span className='bg-brand text-white p-2 rounded-full'>
              <Search height={17} width={17} />
            </span>
          </div>
          <MobileNav />
        </div>
      </SheetTrigger>
      <SheetContent side='top'>
        {/* if you want to show X icon in right-top corner pass showCloseIcon={true} in <SheetContent> */}
        <SheetHeader>
          <SheetTitle>
            <SearchSheetNav session={session} searchInputCallback={setSearch} />
          </SheetTitle>
          <SheetDescription>
            <div className='text-center'>
              <DatePicker state={state} dateChangeCallback={handleSelectDate} />
              <div className='flex items-center justify-center space-x-4'>
                <Button className='bg-brand' onClick={handleSubmit}>Search</Button>
                <Button variant='outline' onClick={() => setShow(false)}>Cancel</Button>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default SearchSheet

"use client"

import React, { useState, useEffect } from 'react'
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
import { addDays, differenceInDays, format, parse } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'


const SearchSheet = ({ session }: { session: any }) => {
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const params = useSearchParams();
  const [searchParams, setSearchParams] = useState({
    country: "",
    days: ""
  })

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: 'selection'
    },
  ])

  const handleSelectDate = (ranges: any) => {
    setState([ranges?.selection])
  }

  useEffect(() => {
    const difference = differenceInDays(
      parse(params?.get("endDate")!, "dd-MM-y", new Date()),
      parse(params?.get("startDate")!, "dd-MM-y", new Date())
    );
    if (difference) {
      setSearchParams({
        ...searchParams,
        days: `${difference} days`,
        country: params?.get("country") ? params?.get("country")! : "Anywhere",
      });
    }
  }, [params]);

  const handleSubmit = () => {
    const startDate = format(state[0].startDate, 'dd-MM-y')
    const endDate = format(state[0].endDate, 'dd-MM-y')

    router.replace(`/?country=${search}&startDate=${startDate}&endDate=${endDate}`)
    setShow(false)
  }

  return (
    <Sheet open={show}>
      <SheetTrigger asChild>
        <div className='w-full md:w-auto cursor-pointer' onClick={() => setShow(true)}>
          <div className='hidden md:flex items-center space-x-2 border p-2 rounded-3xl'>
            <span className='text-sm pl-2'>
              {searchParams.country != "" ? searchParams.country : "Anywhere"}
            </span>
            <span>|</span>
            <span className='text-sm'>
              {searchParams.days != "" ? searchParams.days : "Any week"}
            </span>
            <span>|</span>
            <span className='text-sm text-gray-400'>Add guest</span>
            <span className='bg-brand text-white p-2 rounded-full'>
              <Search height={17} width={17} />
            </span>
          </div>
          <div className=''>
            <MobileNav />
          </div>
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

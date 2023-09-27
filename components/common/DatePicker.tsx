"use client"

import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from "date-fns";
import { DateRangePicker } from 'react-date-range';

const DatePicker = ({ state, dateChangeCallback }: { state: any, dateChangeCallback: (data: any) => void }) => {


    return (
        <div>
            <DateRangePicker
                ranges={state}
                moveRangeOnFirstSelection={false}
                onChange={dateChangeCallback}
                months={1}
                direction='horizontal'
            />
        </div>
    )
}

export default DatePicker

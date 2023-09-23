"use client"

import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    const params = useSearchParams();

    useEffect(() => {
        if (params?.get('success') && params?.get('success') != '') {
            toast.success(params.get('success'), { theme: 'colored' })
        } else if (params?.get('error') && params?.get('error') != '') {
            toast.error(params.get('error'), { theme: 'colored' })
        }
    }, [params])

    return (
        <div>
            <ToastContainer />
        </div>
    )
}

export default Toast

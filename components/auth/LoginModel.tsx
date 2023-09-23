"use client"

import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { X } from 'lucide-react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, loginType } from '@/validation/authSchema';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const LoginModel = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const supabase = createClientComponentClient();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<loginType>({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = async (payload: loginType) => {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: payload.email,
            password: payload.password
        });
        setLoading(false);
        if (error) {
            toast.error(error.message, { theme: 'colored' })
        } else if (data.user) {
            setOpen(false);
            router.refresh();
            toast.success('Logged in successfully', { theme: 'colored' })
        }
    }

    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
                <li className='hover:bg-slate-200 rounded-md p-2 cursor-pointer' onClick={() => setOpen(true)}>
                    Log In
                </li>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <div className='flex justify-between items-center'>
                            <span>Log In</span>
                            <X className='cursor-pointer' onClick={() => setOpen(false)} />
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <div>
                            <ToastContainer />
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h1 className='text-lg font-bold'>
                                    Welcome to Airbnb
                                </h1>
                                <div className='mt-5'>
                                    <Label htmlFor='email'>Email</Label>
                                    <Input id='email' placeholder='Enter your e-mail' type='email' {...register('email')} />
                                    <span className='text-red-400'>{errors.email?.message}</span>
                                </div>
                                <div className='mt-5'>
                                    <Label htmlFor='password'>Password</Label>
                                    <Input id='password' placeholder='Enter strong password' type='password' {...register('password')} />
                                    <span className='text-red-400'>{errors.password?.message}</span>
                                </div>
                                <div className='mt-5'>
                                    <Button className='w-full bg-brand' disabled={loading}>{loading ? 'Processing' : 'Continue'}</Button>
                                </div>
                                <div>
                                    <h1 className='text-center font-bold text-xl my-2'>-- or --</h1>
                                </div>
                                <Button variant='outline' className='w-full'>
                                    <Image src='/images/google.png' alt='google_logo' className='mr-5' height={25} width={25} />
                                    Continue with Google
                                </Button>
                                <Button variant='outline' className='w-full mt-5'>
                                    <Image src='/images/github.png' alt='github_logo' className='mr-5' height={25} width={25} />
                                    Continue with GitHub
                                </Button>
                            </form>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default LoginModel

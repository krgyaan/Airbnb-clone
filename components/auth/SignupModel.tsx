"use client"

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { X } from 'lucide-react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Image from 'next/image';
import { registerType, registerSchema } from '@/validation/authSchema';

const SignupModel = () => {
    const [open, setOpen] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<registerType>({
        resolver: yupResolver(registerSchema)
    });
    const onSubmit = (data: registerType) => {
        console.log(data)
    };

    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
                <li className='hover:bg-slate-200 rounded-md p-2 cursor-pointer' onClick={() => setOpen(true)}>
                    Sign Up
                </li>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <div className='flex justify-between items-center'>
                            <span>Sign Up</span>
                            <X className='cursor-pointer' onClick={() => setOpen(false)} />
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h1 className='text-lg font-bold'>
                                Welcome to Airbnb
                            </h1>
                            <div className='mt-5'>
                                <Label htmlFor='name'>Name</Label>
                                <Input id='name' placeholder='Enter your Name' {...register('name')} />
                                <span className='text-red-400'>{errors.name?.message}</span>
                            </div>
                            <div className='mt-5'>
                                <Label htmlFor='email'>Email</Label>
                                <Input id='email' placeholder='Enter your e-mail' {...register('email')} />
                                <span className='text-red-400'>{errors.email?.message}</span>
                            </div>
                            <div className='mt-5'>
                                <Label htmlFor='password'>Password</Label>
                                <Input id='password' placeholder='Enter strong password' {...register('password')} />
                                <span className='text-red-400'>{errors.password?.message}</span>
                            </div>
                            <div className='mt-5'>
                                <Label htmlFor='cpassword'>Confirm Password</Label>
                                <Input id='cpassword' placeholder='Repeat password' {...register('passwordConfirm')} />
                                <span className='text-red-400'>{errors.passwordConfirm?.message}</span>
                            </div>
                            <div className='mt-5'>
                                <Button className='w-full bg-brand'>Continue</Button>
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
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default SignupModel

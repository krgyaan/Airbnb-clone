"use client"

import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { countries } from '@/config/countries'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { categories } from '@/config/categories'
import { set, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { homeSchema, homeType } from '@/validation/homeSchema'
import { Button } from './ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const AddHomeForm = () => {
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<File | null>(null);
    const [homeCategories, setHomeCategories] = useState<Array<string> | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const supabase = createClientComponentClient();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<homeType>({
        resolver: yupResolver(homeSchema)
    });

    useEffect(() => {
        setValue("categotries", homeCategories)
        setValue("description", description)
    }, [homeCategories, description])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setValue("image", file)
        }
    }

    const handleForm = async (payload: homeType) => {
        setLoading(true)
        const user = await supabase.auth.getUser();
        
    }

    return (
        <form onSubmit={handleSubmit(handleForm)} className='mx-2 my-4'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <div className='mt-3'>
                    <Label htmlFor='title'>Title</Label>
                    <Input placeholder='Enter your title' id='title' {...register('title')} />
                    <span className="text-red-600">{errors?.title?.message}</span>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='country'>Countries</Label>
                    <select id='country' className='outline-brand h10 px-3 py-2 rounded-md w-full border'>
                        <option value="">--Select a country--</option>
                        {
                            countries.map((country) => <option value={country.value} key={country.value}>{country.label}</option>)
                        }
                    </select>
                    <span className="text-red-600">{errors?.country?.message}</span>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='state'>State</Label>
                    <Input placeholder='Enter your state' id='state'  {...register('state')} />
                    <span className="text-red-600">{errors?.state?.message}</span>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='city'>City</Label>
                    <Input placeholder='Enter your city' id='city'  {...register('city')} />
                    <span className="text-red-600">{errors?.city?.message}</span>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='price'>Price</Label>
                    <Input placeholder='Enter your price' id='price'  {...register('price')} />
                    <span className="text-red-600">{errors?.price?.message}</span>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='image'>Image</Label>
                    <Input type='file' id='image' onChange={handleImageChange} />
                    <span className="text-red-600">{errors?.image?.message}</span>
                </div>
            </div>
            <div className='mt-3 w-full'>
                <Label htmlFor='description'>Description</Label>
                <ReactQuill theme="snow" value={description} onChange={setDescription} />
                <span className="text-red-600">{errors?.description?.message}</span>
            </div>
            <div className='mt-3'>
                <Label htmlFor='categories'>Categories</Label>
                <div className='grid grid-cols-2 md:grrid-cols-3 lg:grid-cols-4 gap-4'>
                    {
                        categories.map((item) =>
                            <div className='flex space-x-4'>
                                <input type='checkbox' id={item.name} value={item.name}
                                    checked={(homeCategories as string[]).includes(item.name)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setHomeCategories([...homeCategories, item.name])
                                        } else {
                                            const filterHomeCategories = homeCategories.filter(
                                                (category) => category !== e.target.value
                                            )
                                            setHomeCategories(filterHomeCategories)
                                        }
                                    }}
                                />
                                <Label htmlFor={item.name} className='text-sm font-medium'>{item.name}</Label>
                            </div>
                        )
                    }
                </div>
                <span className="text-red-600">{errors?.categotries?.message}</span>
            </div>

            <Button className='bg-brand w-full mt-3' disabled={loading}>
                {loading ? "Processing.." : "Submit"}
            </Button>
        </form>
    )
}

export default AddHomeForm

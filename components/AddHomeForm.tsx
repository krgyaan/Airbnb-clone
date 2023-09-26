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
import { homeSchema, homeSchemaType } from '@/validation/homeSchema'
import { Button } from './ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { generateRandomNumber } from '@/lib/utils'
import Env from '@/config/Env'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const AddHomeForm = () => {
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<File | null>(null);
    const [homeCategories, setHomeCategories] = useState<Array<string> | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const supabase = createClientComponentClient();
    const router = useRouter();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<homeSchemaType>({
        resolver: yupResolver(homeSchema)
    });

    useEffect(() => {
        setValue("categories", homeCategories)
        setValue("description", description)
    }, [homeCategories, description])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setValue("image", file)
        }
    }

    const handleForm = async (payload: homeSchemaType) => {
        setLoading(true)
        const user = await supabase.auth.getUser();
        const uniquePath = Date.now() + "_" + generateRandomNumber();
        const { data: imgData, error: imgErr } = await supabase.storage
            .from(Env.S3_BUCKET)
            .upload(uniquePath, image!);
        if (imgErr) {
            toast.error(imgErr.message, { theme: "colored" });
            setLoading(false);
            return;
        }

        // * Store home
        const { data: homeData, error: homeErr } = await supabase.from("homes").insert({
            user_id: user.data.user?.id,
            country: payload.country,
            state: payload.state,
            city: payload.city,
            title: payload.title,
            price: payload.price,
            description: payload.description,
            categories: homeCategories,
            image: imgData?.path,
        });

        if (homeErr) {
            toast.error(homeErr.message, { theme: "colored" });
            setLoading(false);
            return;
        }

        router.push("/dashboard?success=Home added successfully!");
    };

    return (
        <form onSubmit={handleSubmit(handleForm)} className='mx-2 my-4'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <div className='mt-3'>
                    <Label htmlFor='title'>Title</Label>
                    <Input placeholder='Enter your title' id='title' {...register('title')} />
                    <span className="text-red-600 text-sm">{errors?.title?.message}</span>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='countries'>Countries</Label>
                    <select id='countries' className='outline-brand h10 px-3 py-2 rounded-md w-full border' {...register('country')}>
                        <option value="">--Select a country--</option>
                        {
                            countries.map((country) => (
                                <option key={country.label} value={country.value}>
                                    {country.label}
                                </option>
                            ))
                        }
                    </select>
                    <span className="text-red-600 text-sm">{errors?.country?.message}</span>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='state'>State</Label>
                    <Input placeholder='Enter your state' id='state'  {...register('state')} />
                    <span className="text-red-600 text-sm">{errors?.state?.message}</span>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='city'>City</Label>
                    <Input placeholder='Enter your city' id='city'  {...register('city')} />
                    <span className="text-red-600 text-sm">{errors?.city?.message}</span>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='price'>Price</Label>
                    <Input placeholder='Enter your price' id='price'  {...register('price')} />
                    <span className="text-red-600 text-sm">{errors?.price?.message}</span>
                </div>
                <div className='mt-3'>
                    <Label htmlFor='image'>Image</Label>
                    <Input type='file' id='image' onChange={handleImageChange} />
                    <span className="text-red-600 text-sm">{errors?.image?.message}</span>
                </div>
            </div>
            <div className='mt-3 w-full'>
                <Label htmlFor='description'>Description</Label>
                <ReactQuill theme="snow" value={description} onChange={setDescription} />
                <span className="text-red-600 text-sm">{errors?.description?.message}</span>
            </div>
            <div className='mt-3'>
                <Label htmlFor='categories'>Categories</Label>
                <div className='grid grid-cols-2 md:grrid-cols-3 lg:grid-cols-4 gap-4'>
                    {
                        categories.map((item) =>
                            <div className='flex space-x-4' key={item.name}>
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
                <span className="text-red-600 text-sm">{errors?.categories?.message}</span>
            </div>

            <Button className='bg-brand w-full mt-3' disabled={loading}>
                {loading ? "Processing.." : "Submit"}
            </Button>
        </form>
    )
}

export default AddHomeForm
import { byteToMb } from '@/lib/utils';
import * as yup from 'yup';

export const homeSchema = yup
    .object({
        title: yup.string().required('Title is required').min(5).max(50),
        country: yup.string().required('Please select a country').min(5).max(50),
        state: yup.string().required('Please enter a state').min(5).max(50),
        city: yup.string().required('Please enter a city').min(5).max(50),
        price: yup.number().required().typeError('Price must be a number'),
        description: yup.string().required('Please write a description').min(5).max(5000),
        categotries: yup.mixed<Array<string> | []>()
            .test('category', 'Please select at least one category', (data: any) => {
                const isValid = data?.length >= 1;
                return isValid;
            }),
        image: yup.mixed().test('image', 'Only JPEG, JPG and PNG are allowed', (file: any) => {
            const isValid = file?.type === 'image/jpeg' || file?.type === 'image/jpg' || file?.type === 'image/png';
            return isValid;
        })
            .test('image', 'Image size must be less than 2MB', (file: any) => {
                const isValid = byteToMb(file?.size) < 2;
                return isValid;
            })
    })
    .required();

export type homeType = yup.InferType<typeof homeSchema>; 

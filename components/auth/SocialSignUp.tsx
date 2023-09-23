import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'react-toastify';

const SocialSignUp = () => {
    const supabase = createClientComponentClient();

    const githubLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${location.origin}/auth/callback`
            }
        });
        if (error) {
            toast.error(error.message, { theme: 'colored' })
        }
    };

    const googleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`
            }
        });
        if (error) {
            toast.error(error.message, { theme: 'colored' })
        }
    };

    return (
        <>
            <Button variant='outline' className='w-full' onClick={googleLogin}>
                <Image src='/images/google.png' alt='google_logo' className='mr-5' height={25} width={25} />
                Continue with Google
            </Button>
            <Button variant='outline' className='w-full mt-5' onClick={githubLogin}>
                <Image src='/images/github.png' alt='github_logo' className='mr-5' height={25} width={25} />
                Continue with GitHub
            </Button>
        </>
    )
}

export default SocialSignUp

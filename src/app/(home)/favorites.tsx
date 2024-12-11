import React from 'react'
import { IoLogoApple } from 'react-icons/io5'
import { BiLogoBing } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { cn } from '@/lib/utils';

const favorites = [
    {
        name: "Apple",
        icon: IoLogoApple,
        color: "#FFF"
    },
    {
        name: "Bing",
        icon: BiLogoBing,
        color: "#007BFF"
    },
    {
        name: "Google",
        icon: FcGoogle,
        color: "#FFF"
    },
]

export const Favorites = () => {
  return (
    <div className='w-full '>
        <h3 className='text-white font-semibold'>Favorites</h3>
        <div className='flex items-center gap-x-4'>
        {favorites.map((favorite, index) => (
            <div style={{backgroundColor: favorite.color}} key={index} className='w-14 h-14 cursor-pointer rounded-xl flex items-center justify-center  mt-2 relative'>
                <favorite.icon className={cn('text-white size-10',
                    index === 0 && 'text-gray-500'
                )} />
                <span className='absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[10px] text-white'>{favorite.name}</span>
            </div>
        ))}
        </div>
       
    </div>
  )
}

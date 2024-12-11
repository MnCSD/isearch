import React from 'react'
import { Favorites } from './favorites'

export const Widgets = () => {
  return (
    <div className='max-w-screen-sm md:max-w-screen-md xl:max-w-screen-xl h-full w-full flex md:px-0 px-10'>
        <div className='w-full'>
            <Favorites/>
        </div>
    </div>
  )
}

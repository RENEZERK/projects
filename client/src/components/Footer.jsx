import React from 'react'
import {assets} from '../assets/assets'
import {footer_data} from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 bg-primary/3 xl:px-32'>
      <div className='flex flex-col md:flex-row items-center justify-between py-7 md:py-8 gap-10 border-gray-500/30 text-gray-500'>
        <div>
            <img src={assets.logo} alt="logo" className="w-32 sm:w-44"/>
            <p className='max-w-[410px] mt-6'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, adipisci!</p>
        </div>
        <div className='flex flex-wrap justify-center w-full md:w-[45%] gap-5'>
            {footer_data.map((item, index) => (
                <div key={index} className='flex flex-col gap-2'>
                    <h3 className='font-semibold text-base text-gray-900'>{item.title}</h3>
                    <ul className='text-sm space-y-1'>
                        {item.links.map((link, idx) => (
                            <li key={idx} className='text-gray-500 hover:text-gray-700 cursor-pointer transition'><a href='#' className='hover:underline transition'>{link}</a></li>
                        ))}
                    </ul>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
      </div>
      <p className='text-center text-sm text-gray-500 py-4 md:text-base'>
        @copyright 2025 @ Rishit Balaji. All rights reserved.
      </p>
    </div>
  )
}

export default Footer

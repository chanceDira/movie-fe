import React from 'react'
import { Primary } from '../components/Button/Button'

const EmptyState = () => {
  return (
    <div className='flex flex-col items-center'>
        <div className=' text-white  font-bold text-6xl'>
        Your movie list is empty
        </div>
        <div className=' w-fit mt-10'>
        <Primary name='Add a new movie' style='px-10' />
        </div>
    </div>
  )
}

export default EmptyState
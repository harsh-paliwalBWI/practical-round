
import Link from 'next/link'
import React from 'react'

const page = async() => {
  return (
    <div className='flex gap-3 p-5 justify-center'>
      <Link href="/create">
        <div className="text-white cursor-pointer px-4 py-2 bg-blue-500 rounded">Create</div>
      </Link>

     
    </div>
  )
}

export default page
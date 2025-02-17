import { usePage } from '@inertiajs/react'
import React from 'react'

const NavLink = ({ action, icon, name }) => {
    const { url } = usePage();

  return (
    <div>
        <a href={`/${action}`} className={`md:mx-2 lg:mx-0 flex items-center border ctransition bg-cgray hover:bg-cgreen hover:border-cblack md:text-sm lg:text-lg md:py-1 md:px-1 lg:py-2 lg:px-2 rounded-md  ${url.startsWith(`/${action}`) ? 'bg-clgreen border-cblack' : 'bg-cgray'
        } capitalize`}><div className='bg-cwhite p-1 md:mr-1 lg:mr-2 rounded-md'>{icon}</div>{name}</a>
    </div>
  )
}

export default NavLink

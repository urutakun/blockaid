import { usePage } from '@inertiajs/react'
import React from 'react'

const NavLink = ({ action, icon, name }) => {
    const { url } = usePage();

  return (
    <div>
        <a href={`/${action}`} className={`flex items-center border ctransition bg-cgray hover:bg-cgreen hover:border-cblack py-2 px-2 rounded-md  ${url.startsWith(`/${action}`) ? 'bg-clgreen border-cblack' : 'bg-cgray'
        } capitalize`}><div className='bg-cwhite p-1 mr-2 rounded-md'>{icon}</div>{name}</a>
    </div>
  )
}

export default NavLink

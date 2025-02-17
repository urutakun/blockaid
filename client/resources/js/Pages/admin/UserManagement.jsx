import React, { useState } from 'react'
import Nav from '../components/Nav'
import NavLink from '../components/NavLink'
import CreateAdmin from '../components/CreateAdmin'

const UserManagement = ( { admins } ) => {
    const [isRegisterClicked, setIsRegisterClicked] = useState(false);

  return (
    <div>
        {isRegisterClicked && <CreateAdmin isRegisterClicked={isRegisterClicked} setIsRegisterClicked={setIsRegisterClicked}/>}
        <Nav>
            <NavLink name={'beneficiaries'} action={'admin/beneficiaries'} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.987 18.73a2 2 0 0 1-.34.85a1.9 1.9 0 0 1-1.56.8h-1.651a.74.74 0 0 1-.6-.31a.76.76 0 0 1-.11-.67c.37-1.18.29-2.51-3.061-4.64a.77.77 0 0 1-.32-.85a.76.76 0 0 1 .72-.54a7.61 7.61 0 0 1 6.792 4.39a2 2 0 0 1 .13.97M19.486 7.7a4.43 4.43 0 0 1-4.421 4.42a.76.76 0 0 1-.65-1.13a6.16 6.16 0 0 0 0-6.53a.75.75 0 0 1 .61-1.18a4.3 4.3 0 0 1 3.13 1.34a4.46 4.46 0 0 1 1.291 3.12z"/><path fill="currentColor" d="M16.675 18.7a2.65 2.65 0 0 1-1.26 2.48c-.418.257-.9.392-1.39.39H4.652a2.63 2.63 0 0 1-1.39-.39A2.62 2.62 0 0 1 2.01 18.7a2.6 2.6 0 0 1 .5-1.35a8.8 8.8 0 0 1 6.812-3.51a8.78 8.78 0 0 1 6.842 3.5a2.7 2.7 0 0 1 .51 1.36M14.245 7.32a4.92 4.92 0 0 1-4.902 4.91a4.903 4.903 0 0 1-4.797-5.858a4.9 4.9 0 0 1 6.678-3.57a4.9 4.9 0 0 1 3.03 4.518z"/></svg>}/>
            <NavLink name={'user management'} action={'admin/user-management'} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="6" r="4" fill="currentColor"/><path fill="currentColor" d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"/></svg>}/>
            <NavLink name={'transactions'} action={'admin/transactions'} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 22c.244 0 .471-.113.926-.34l3.65-1.817C18.193 19.04 19 18.637 19 18v-8m-7 12c-.244 0-.471-.113-.926-.34l-3.65-1.817C5.807 19.04 5 18.637 5 18v-8m7 12v-8m7-4c0-.637-.808-1.039-2.423-1.843l-3.651-1.818C12.47 6.113 12.244 6 12 6s-.471.113-.926.34l-3.65 1.817C5.807 8.96 5 9.363 5 10m14 0c0 .637-.808 1.039-2.423 1.843l-3.651 1.818c-.455.226-.682.339-.926.339m-7-4c0 .637.808 1.039 2.423 1.843l3.651 1.818c.455.226.682.339.926.339m10 7l-3-2.5M12 2v4M2 21l3-2.5" color="currentColor"/></svg>}/>
        </Nav>
        <div className="user-management-wrapper px-6 pt-6">
            <div className="header flex justify-between items-center w-full">
                <p className='text-3xl font-bold text-gray-500'>Admins</p>
                <div className="right">
                    <div className="search flex">
                        <input type="text" id="search" className='border-none outline-none w-[100px] lg:w-[300px] rounded-l-md focus-within:outline focus-within:ring-clgreen'/>
                        <div className="search-icon bg-clgreen hover:bg-cgreen ctransition cursor-pointer px-4 py-2 overflow-hidden rounded-r-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"/></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className='admins'>
                <button className='px-3 py-1 text-sm lg:px-6 lg:py-2 mt-6 mb-4 lg:text-base bg-cgray hover:bg-cgreen rounded-lg ctransition' onClick={() => setIsRegisterClicked(true)}>Register Admin</button>
                <div className="admin-wrapper rounded-xl overflow-hidden w-full">
                    <div className="w-[90vw] md:w-full overflow-x-auto cscrollbar">
                        <table className='w-full text-base text-left'>
                            <thead className='text-cwhite uppercase bg-cblack'>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>
                                        ID
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Name
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Email
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Role
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins && admins.map((admin, index) => {
                                    return (<tr key={index} className={`${index % 2 == 0 ? 'bg-gray-50' : 'bg-cwhite'} border-b border-gray-200 text-cblack`}>
                                        <td className="px-6 py-4">
                                            {admin.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {admin.first_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {admin.email}
                                        </td>
                                        <td className="px-6 py-4 uppercase">
                                            {admin.role}
                                        </td>
                                        <td className="px-6 py-4 space-x-6 flex">
                                            <button className='px-6 py-2 bg-clgreen hover:bg-cgreen rounded-lg ctransition'>Edit</button>
                                            <button className='px-6 py-2 bg-red-500 text-cwhite rounded-lg hover:bg-red-600 ctransition'>Delete</button>
                                        </td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserManagement

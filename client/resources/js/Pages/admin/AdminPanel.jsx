import React, { useState } from 'react'
import Nav from '../components/Nav'
import NavLink from '../components/NavLink'
import BeneficiaryTable from '../components/BeneficiaryTable'

const AdminPanel = ({ beneficiaries }) => {
    const [searchInput, setSearchInput] = useState("");

  return (
    <div>
        <Nav />
        <div className="beneficiaries-wrapper px-6">
            <div className="beneficiaries">
                <div className="table-wrapper mt-4">
                    <div className="header flex justify-between items-center">
                        <p className='text-2xl lg:text-3xl font-bold text-gray-500'>Beneficiaries</p>
                        <div className="search flex">
                            <input type="text" id="search" className='border-none outline-none w-[150px] md:w-[200px] lg:w-[300px] rounded-l-md focus-within:outline focus-within:ring-clgreen'/>
                            <div className="search-icon bg-clgreen hover:bg-cgreen ctransition cursor-pointer px-4 py-2 overflow-hidden rounded-r-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"/></svg>
                            </div>
                        </div>
                    </div>
                    <div className="table overflow-hidden rounded-xl w-full mt-6">
                        <BeneficiaryTable beneficiaries={beneficiaries}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminPanel

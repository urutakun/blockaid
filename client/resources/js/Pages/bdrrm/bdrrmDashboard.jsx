import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import BeneficiaryTable from "../components/BeneficiaryTable";

const bdrrmDashboard = ({ beneficiaries, requests }) => {
    const [reliefRequest, setReliefRequest] = useState(0);


    useEffect(() => {
        const relief_request = requests && requests && requests.filter((req) => req.status == 'pending').length;
        setReliefRequest(relief_request);
    }, [reliefRequest])

  return (
    <div>
        <Nav />
        <div className="wrapper px-6 mt-6">
            <div className="header w-full grid grid-cols-3 gap-2 lg:gap-8 min-h-[200px]">
                <div className="stock flex flex-col col-span-3 md:col-span-1">
                    <span className='text-gray-500 text-sm md:text-base lg:text-xl'>Relief Stock</span>
                    <div className="stock_stat bg-cblack text-cwhite flex-1 rounded-xl flex justify-between md:justify-center flex-row-reverse md:flex-col items-center mt-3 p-2">
                        <div className="stat md:text-4xl lg:text-6xl md:font-bold">
                            <p>9,999</p>
                        </div>
                        <span className='lg:mt-4 text-base text-gray-500'>Current Relief Stock</span>
                    </div>
                </div>
                <div className="pending flex flex-col col-span-3 md:col-span-1">
                    <span className='text-gray-500 text-sm md:text-base lg:text-xl'>Pending Requests</span>
                    <div className="pending_stat bg-clgreen text-cwhite flex-1 rounded-xl mt-3 flex flex-col justify-center items-center p-2">
                        <div className={`stat ${reliefRequest == 0 ? 'hidden' : '' } text-cblack md:text-4xl lg:text-6xl md:font-bold`}>
                            <p>{reliefRequest}</p>
                        </div>
                        <span className='lg:mt-4 text-base text-gray-500'>{reliefRequest == 0 ? 'No' : ''} Pending Requests</span>
                    </div>
                </div>
                <div className="recent flex flex-col col-span-3 md:col-span-1">
                    <span className='text-gray-500 text-sm md:text-base lg:text-xl'>Recent Activities</span>
                    <div className="recent_stat bg-clgreen flex-1 rounded-xl mt-3 flex justify-center flex-col items-center text-cblack p-2">
                        {/* <div className="stat">
                            <p>9,999</p>
                        </div> */}
                        <span className='lg:mt-4 text-base text-gray-500'>No Recent Activities</span>
                    </div>
                </div>
            </div>
            <div className="beneficiaries mt-6">
                <span className='text-gray-500'>Beneficiaries</span>
                <div className="beneficiary-table rounded-xl overflow-hidden mt-4">
                    <BeneficiaryTable beneficiaries={beneficiaries}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default bdrrmDashboard

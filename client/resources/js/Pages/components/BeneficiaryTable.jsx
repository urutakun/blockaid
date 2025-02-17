import React from 'react'

const Table = ( {beneficiaries} ) => {
  return (
        <div className="w-[90vw] md:w-full overflow-x-auto cscrollbar">
            <table className='w-full text-xs lg:text-base text-left'>
                <thead className='text-cwhite uppercase bg-cblack'>
                    <tr>
                        <th scope='col' className='px-2 lg:px-6 py-1 lg:py-3'>
                            ID
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Name
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Birthday
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Address
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Phone Number
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Email
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Actions
                        </th>
                    </tr>

                </thead>
                <tbody>
                        {beneficiaries.map((beneficiary, index) => {
                            let beneficiary_full_name = `${beneficiary.last_name}, ${beneficiary.first_name}, ${beneficiary.middle_name.substring(0,1)}.`;
                            let date = new Date(beneficiary.birthday);
                            let birthday = `${date.toLocaleString('en-US', {month: 'long'})} ${date.getDate()}, ${date.getFullYear()}`;
                            return (<tr className={`${index % 2 == 0 ? 'bg-gray-50' : 'bg-cwhite'} border-b border-gray-200 text-cblack`} key={index}>
                                <td className="px-6 py-4">
                                    {beneficiary.id}
                                </td>
                                <td className="px-6 py-4 capitalize">
                                    {beneficiary_full_name}
                                </td>
                                <td className="px-6 py-4">
                                    {birthday}
                                </td>
                                <td className="px-6 py-4">
                                    Null
                                </td>
                                <td className="px-6 py-4">
                                    {beneficiary.mobile}
                                </td>
                                <td className="px-6 py-4">
                                    {beneficiary.email}
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
  )
}

export default Table

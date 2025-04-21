import React from 'react'
import { motion, AnimatePresence } from "motion/react";

const ReportView = ({ isReportOpen, setIsReportOpen, report }) => {
    console.log(report);
    const shipmentDate = new Date(report?.shipment?.shipped_at).toLocaleDateString('en-US', {month: 'long', day: '2-digit', year: 'numeric'});
    const receivedDate = new Date(report?.shipment?.received_at).toLocaleDateString('en-US', {month: 'long', day: '2-digit', year: 'numeric'});
    const distributionDate = new Date(report?.shipment?.distributed_at).toLocaleDateString('en-US', {month: 'long', day: '2-digit', year: 'numeric'});

    const beneficiaries = report?.beneficiaries ? JSON.parse(report.beneficiaries) : [];
    console.log(beneficiaries);

  return (
    <AnimatePresence mode='wait'>
        {isReportOpen && (
            <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.3, ease: [0, 0.55, 0.45, 1]}}}
            exit={{opacity: 0, y: 10, transition: { delay: 0.2 }}}
            className='w-full fixed inset-0 bg-cwhite'>
                <div className="report__container">
                    <div className="exit absolute top-4 right-8 bg-gray-500 rounded-full text-cwhite p-1" onClick={() => setIsReportOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
                    </div>
                    <div className="printable__area px-4 md:px-[8rem] lg:px-[20%] py-16 max-h-screen overflow-auto text-sm md:text-base lg:text-xl">
                        <div className="header flex flex-col items-center justify-center space-y-8">
                            <div className="logo">
                                <div className="blockaid">
                                    <div className="logo__wrapper overflow-hidden w-[150px]">
                                        <img src="/assets/logo-light.png" alt="blockaid" className='w-full h-full object-cover' />
                                    </div>
                                </div>
                            </div>
                            <span className='text-xl md:text-3xl lg:text-4xl font-font1Smbd'>Report Summary</span>
                            <div className="report__info grid grid-cols-2 gap-4 w-full">
                                <div className="id">
                                    <span className='text-gray-500 mr-2'>Report ID: </span>
                                    <span>{report.id}</span>
                                </div>
                                <div className="date justify-self-end">
                                    <span className='text-gray-500 mr-2'>Date: </span>
                                    <span>{distributionDate}</span>
                                </div>
                                <div className="status">
                                    <span className='text-gray-500 mr-2'>Status: </span>
                                    <span className='capitalize'>{report.shipment.status}</span>
                                </div>
                                <div className="is__flagged justify-self-end">
                                    <span className='text-gray-500 mr-2'>Flagged: </span>
                                    <span>{report.shipment.is_flagged ? 'Yes' : 'No'}</span>
                                </div>
                                <div className={`flag_status ${report.shipment.is_flagged ? 'block' : 'hidden'}`}>
                                    <span className='text-gray-500 mr-2'>Discrepancy: </span>
                                    <span className='capitalize'>{report.shipment.flag_status.replace("_", " ")}</span>
                                </div>
                            </div>
                        </div>
                        <div className="body mt-16">
                            <div className='text-justify'>{report.shipment.is_flagged ? (
                                <p>
                                   The shipment was dispatched {shipmentDate} and approved by {report.shipment.approved_by}. It was received on {receivedDate} by {report.shipment.received_by}. On {distributionDate}, a distribution transaction was conducted under Report ID {report.id}. Upon verification, a discrepancy was identified: <span className='capitalize text-red-500'>{report.shipment.flag_status.replace("_", " ")}</span>. Further investigation is required to resolve this issue.
                                </p>
                            ) : (
                                <p>
                                    The shipment was dispatched {shipmentDate} and approved by {report.shipment.approved_by}. It was received on {receivedDate} by {report.shipment.received_by}. On {distributionDate}, a distribution transaction was conducted under Report ID {report.id}. The records show that the transaction was successfully completed with no discrepancies found.
                                </p>
                            )}</div>
                            <div className="additional__info mt-16 space-y-4">
                                <div className="shipment_info grid grid-cols-2 gap-4">
                                    <div className="dispatched col-span-2 lg:col-span-1">
                                        <span className='text-gray-500 mr-2'>Dispatched: </span>
                                        <span>Department of Social Welfare and Development &#40;DSWD&#41;</span>
                                    </div>
                                    <div className="approved flex lg:flex-col items-start lg:items-end col-span-2 lg:col-span-1">
                                        <span className='text-gray-500 mr-2'>Approved By: </span>
                                        <span>{report.shipment.approved_by}</span>
                                    </div>
                                    <div className="received col-span-2 lg:col-span-1">
                                        <span className='text-gray-500 mr-2'>Received By: </span>
                                        <span>{report.shipment.received_by || 'undefined'}</span>
                                    </div>
                                    <div className="received_in flex lg:flex-col items-start lg:items-end col-span-2 lg:col-span-1">
                                        <span className='text-gray-500 mr-2'>Received In: </span>
                                        <span className='whitespace-normal break-words'>Mangagoy, Bislig City, Surigao Del Sur</span>
                                    </div>
                                </div>
                                <div className="total_numbers space-y-4">
                                    <div className="sent">
                                        <span className='text-gray-500 mr-2'>Total Sent: </span>
                                        <span>{report.shipment.quantity}</span>
                                    </div>
                                    <div className="received">
                                        <span className='text-gray-500 mr-2'>Total Received: </span>
                                        <span>{report.shipment.received_quantity}</span>
                                    </div>
                                    <div className="distributed">
                                        <span className='text-gray-500 mr-2'>Total Distributed: </span>
                                        <span>{report.shipment.distributed_quantity}</span>
                                    </div>
                                </div>
                                <div className="beneficiaries">
                                     <span className='text-gray-500 mr-2'>Beneficiaries: </span>
                                    <table className='w-full border border-cblack table-fixed mt-4'>
                                        <thead>
                                            <tr className='bg-clgreen'>
                                                <th className='border border-cblack'>Name</th>
                                                <th className='border border-cblack'>Email</th>
                                                <th className='border border-cblack'>Phone Number</th>
                                                <th className='border border-cblack'>Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {beneficiaries.map((ben) => (
                                                <tr key={ben.id} className='border border-cblack text-sm md:text-base'>
                                                    <td className='border border-cblack p-1'>{ben.name}</td>
                                                    <td className='border border-cblack p-1'>{ben.email}</td>
                                                    <td className='border border-cblack p-1'>{ben.mobile}</td>
                                                    <td className='border border-cblack p-1'>{ben.district}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default ReportView

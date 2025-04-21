import React, { useState } from 'react'
import Nav from './components/Nav'
import ReportView from './components/ReportView'

const ReliefReports = ({ reports }) => {
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [reportID, setReportID] = useState('');
    const [report, setReport] = useState({});

    const handleReportClick = ( id ) => {
        setReportID(id);
        const report = reports.filter((report) => report.id === id)[0];
        setReport(report);
        setIsReportOpen(true);
    }


  return (
    <div>
        <Nav />
        <div className="reports-container w-full px-6 lg:px-[20rem] mt-8">
            {reports.map((report) => {
                const date = new Date(report?.shipment?.distributed_at);
                const distributionDate = date.toLocaleDateString('en-US', {month: 'long', day:'2-digit', year: 'numeric'});
                return(
                    <div key={report.id} className='rounded-lg mb-8 h-[100px] shadow-sm bg-white w-full flex justify-between items-center p-4' onClick={() => handleReportClick(report.id)}>
                        <div className="report__id flex flex-col leading-tight">
                            <span className='text-xs md:text-sm text-gray-500'>Report ID</span>
                            <span className='text-sm md:text-xl'>{report.id}</span>
                        </div>
                        <div className="track lg:flex justify-between items-center min-w-[400px] hidden">
                            <div className="sent flex flex-col leading-tight text-center">
                                <span className='text-sm text-gray-500'>Total Sent</span>
                                <span>{report?.shipment?.quantity}</span>
                            </div>
                            <div className="received flex flex-col leading-tight text-center">
                                <span className='text-sm text-gray-500'>Total Received</span>
                                <span>{report?.shipment?.received_quantity}</span>
                            </div>
                            <div className="distributed flex flex-col leading-tight text-center">
                                <span className='text-sm text-gray-500'>Total Distributed</span>
                                <span>{report?.shipment?.distributed_quantity}</span>
                            </div>
                        </div>
                        <div className="distribution_date flex flex-col leading-tight text-center">
                            <span className='text-xs md:text-sm text-gray-500'>Distribution Date</span>
                            <span className='text-sm md:text-xl'>{distributionDate}</span>
                        </div>
                        <div className="is_flagged">
                            <div className={`min-w-[90px] md:min-w-[120px] py-2 text-sm md:text-base lg:text-xl rounded-full italic text-center
                            ${report?.shipment?.is_flagged == 1 ? 'bg-red-200' : 'bg-green-200'}
                            ${report?.shipment?.is_flagged == 1 ? 'text-red-600' : 'text-green-600'}
                            `}>{report?.shipment?.is_flagged ? 'Flagged' : 'Complete' }</div>
                        </div>
                    </div>
                )
            })}
        </div>
        <ReportView isReportOpen={isReportOpen} setIsReportOpen={setIsReportOpen} report={report}/>
    </div>
  )
}

export default ReliefReports

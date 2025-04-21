import React, { useEffect, useState } from 'react'
import Nav from './components/Nav'
import { motion, AnimatePresence } from 'motion/react'

const Track = ({ shipments }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [reqId, setReqId] = useState('');

    const handleOnClick = (id) => {
        setIsOpen(true);
        setReqId(id);
    }

  return (
    <div>
      <Nav />
      <div className='w-full px-6 lg:px-[20rem] my-8'>
        {shipments.map((shipment, index) => {
            const date = new Date(shipment.shipped_at).toLocaleDateString('en-US', {month: 'long', day: '2-digit', year: 'numeric'});
            const bgColors = {
                pending: "bg-gray-200",
                in_transit: "bg-yellow-200",
                received: "bg-green-200",
                distributed: "bg-violet-200",
            };

            const textColors = {
                pending: "text-gray-600",
                in_transit: "text-yellow-600",
                received: "text-green-600",
                distributed: "text-violet-600",
            };
            return(
                <div key={index} className='min-h-[100px] p-6 border border-gray-300 rounded-xl mb-4 shadow-sm flex justify-between items-center' onClick={() =>  handleOnClick(shipment.request_id)}>
                    <div className="header flex flex-col">
                        <div className="shipment text-gray-500 text-sm md:text-base">
                            <span className='mr-2'>Request ID:</span>
                            <span>{shipment.request_id}</span>
                        </div>
                        <span className='font-font1Smbd md:text-3xl'>{shipment.id}</span>
                    </div>
                    <div className="status flex flex-col items-end space-y-2">
                        <span className='text-gray-500 text-sm md:text-base'>{date}</span>
                        <div className={`span capitalize text-sm md:text-xl min-w-[90px] md:min-w-[120px] p-1 md:p-2 rounded-full text-center italic ${bgColors[shipment.status]} ${textColors[shipment.status]}`}>{shipment.status === 'in_transit' ?  shipment.status.replace('_', ' ') : shipment.status}</div>
                    </div>
                    <Tracker isOpen={isOpen} reqId={reqId} setIsOpen={setIsOpen} shipments={shipments}/>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default Track

const Tracker = ({ isOpen, reqId, setIsOpen, shipments }) => {
    const shipment = shipments.filter((shipment) => shipment.request_id === reqId)[0] || {};
    const today = new Date().toLocaleString('en-US', {month: 'long', day: '2-digit', year: 'numeric', weekday: 'long'});
    const [districts, setDistricts] = useState([]);

    const statuses = [
        { id: "in_transit", label: "In Transit", description: "DSWD has dispatched the shipment", dateField: "shipped_at" },
        { id: "received", label: "Received", description: "Shipment received at the destination", dateField: "received_at" },
        { id: "distributed", label: "Distributed", description: "Goods have been distributed", dateField: "distributed_at" },
      ];

    const currentStepIndex = statuses.findIndex((s) => s.id === shipment.status);

    useEffect(() => {
        axios.get(`/track/${reqId}`)
        .then((res) => {
            setDistricts(res.data.districts);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [reqId])

    const dist_arr = districts?.map((dist) => dist.name).join(', ');

    return(
        <AnimatePresence mode='wait'>
                {
                    isOpen && (
                        <motion.div
                        initial={{opacity: 0,}}
                        animate={{opacity: 1, transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1]}}}
                        exit={{opacity: 0}}
                        className='fixed inset-0 bg-black/25 flex justify-center items-center' onClick={() => setIsOpen(false)}>
                            <motion.div
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0, transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1]}}}
                            exit={{opacity: 0, y: 10}}
                            className={`relative w-full min-h-[100vh] md:min-h-[90vh] bg-cwhite md:w-[80vw] lg:w-[40vw]  md:rounded-xl flex flex-col justify-center p-4 md:p-8`} onClick={(e) => e.stopPropagation()}>
                                <div className="exit absolute top-12 lg:top-4 right-4 md:right-8 md:top-8 bg-gray-500 rounded-full text-cwhite p-1" onClick={() => setIsOpen(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" ><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
                                </div>
                                <div className="modal_content">
                                    <div className="header flex flex-col border-b border-gray-300 pb-4">
                                        <div className="shipment text-gray-500 text-sm md:text-base">
                                            <span className='mr-2'>Request ID:</span>
                                            <span>{shipment.request_id}</span>
                                        </div>
                                        <span className='font-font1Smbd md:text-3xl'>{shipment.id}</span>
                                    </div>
                                    <div className="status flex flex-col space-y-4 py-4 border-b border-gray-300">
                                        <span>Disaster relief {shipment.status === 'in_transit' ? 'is' : 'was'}</span>
                                        <span className='capitalize text-5xl font-font1Smbd'>{shipment.status === 'in_transit' ? shipment.status.replace('_', ' ') : shipment.status}</span>
                                        <div className='font-bold'>As of <span className='ml-2'>{today}</span></div>
                                    </div>
                                    <div className="tracker flex flex-col md:max-w-[500px]  my-4">
                                        {statuses.map((step, index) => {
                                            const formatDate = (dateString) => {
                                                if (!dateString) return null;

                                                const date = new Date(dateString);
                                                const day = date.getDate();
                                                const month = date.toLocaleString("en-US", { month: "long" });

                                                // Function to determine the ordinal suffix
                                                const getOrdinal = (day) => {
                                                  if (day > 3 && day < 21) return "th";
                                                  switch (day % 10) {
                                                    case 1: return "st";
                                                    case 2: return "nd";
                                                    case 3: return "rd";
                                                    default: return "th";
                                                  }
                                                };

                                                return `${day}${getOrdinal(day)} of ${month}`;
                                            };

                                            const stepDate = shipment[step.dateField] ? formatDate(shipment[step.dateField]) : null;
                                            const stepHour = shipment[step.dateField] ? new Date(shipment[step.dateField]).toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'}) : null;
                                            return(
                                                <div key={step.id} className="flex items-start space-x-8">
                                                    <div className="date min-w-[100px] md:min-w-[120px]">
                                                        {index <= currentStepIndex && (
                                                            <div className='flex flex-col'>
                                                                <span className='text-2xl font-font1Smbd leading-tight'>{stepDate}</span>
                                                                <span className='text-base'>{stepHour}</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Step Indicator */}
                                                    <div className="relative flex flex-col items-center mt-2">
                                                        <div
                                                        className={`w-6 h-6 flex items-center justify-center rounded-full border p-1 ${
                                                            index <= currentStepIndex ? "border-cgreen" : "border-gray-300"
                                                        }`}
                                                        >
                                                            <div className={` rounded-full w-full h-full ${index <= currentStepIndex ? 'bg-cgreen' : 'bg-gray-300'}`}></div>
                                                        </div>

                                                        {/* Progress Line */}
                                                        {index !== statuses.length - 1 && (
                                                        <div
                                                            className={`w-1 h-[80px] ${
                                                            index < currentStepIndex ? "bg-cgreen" : "bg-gray-300"
                                                            }`}
                                                        />
                                                        )}
                                                    </div>

                                                    {/* Step Details */}
                                                    <div className="flex flex-col">
                                                        <div className={`text-2xl font-font1Smbd`}>
                                                        {step.label}
                                                        </div>
                                                        <div className="text-gray-400 text-sm">{step.description}</div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="eligibles py-4">
                                        <span className='font-font1Smbd md:text-2xl'>Eligible Districts</span>
                                       <div className='text-lg text-gray-500'>
                                            {dist_arr}
                                       </div>
                                    </div>

                                </div>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
    )
}

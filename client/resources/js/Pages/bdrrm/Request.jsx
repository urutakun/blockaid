import React, { useState } from 'react'
import Nav from '../components/Nav'
import { useForm } from "@inertiajs/react"
import { motion, AnimatePresence } from "motion/react"
import FormError from '../components/FormError'

const Request = ({ requests }) => {
    const [isClicked, setIsClicked] = useState(false);

  return (
    <div>
        <Nav />
        <div className="wrapper px-6 h-[calc(100vh-130px)]">
            <div className={`create__request bg-clgreen w-fit p-3 rounded-full text-cblack fixed bottom-12 right-12 cursor-pointer hover:bg-cgreen ctransition ${isClicked ? 'hidden' : ''}`} onClick={() => setIsClicked(true)}>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </span>
            </div>
            <div className="request__container grid grid-cols-3 gap-4 h-full">
                {/* request history */}
                <div className="sec__1 col-span-3 lg:col-span-1">test</div>
                <div className="sec__2 col-span-3 lg:col-span-2 h-full flex flex-col">
                        <div className="header">
                            <span className='text-gray-500 text-sm md:text-base lg:text-xl'>Request</span>
                        </div>
                        <div className="requests mt-4 pb-6 h-full">
                            {requests.length === 0 ? (
                                    <div className='h-full w-full flex justify-center items-center'>
                                        <span className='text-base lg:text-xl text-gray-500'>No Pending Request</span>
                                    </div>
                            ) : (
                                <>
                                    {requests.map((req, i) => {
                                const created_at = new Date(req.created_at).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                });

                                const colors = {
                                    'pending' : 'gray',
                                    'approved' : 'green',
                                    'denied' : 'red',
                                }

                                return (
                                    <div key={i} className='w-full bg-white shadow-sm flex justify-between items-center min-h-[100px] p-4 rounded-xl mb-4'>
                                        <div className="title flex flex-col">
                                            <span className='font-bold capitalize text-xl lg:text-3xl mb-2'>{req.title.length > 15 ? req.title.slice(0, 15) + " ..." : req.title}</span>
                                            <span className='text-xs md:text-sm lg:text-base text-gray-500'>{created_at}</span>
                                        </div>
                                        <div className="req space-x-32 hidden md:flex">
                                            <div className="households flex flex-col items-center">
                                                <span>{req.households}</span>
                                                <span className='text-gray-500 text-sm lg:text-base'>Households</span>
                                            </div>
                                            <div className="qunatity flex flex-col items-center">
                                                <span>{req.quantity}</span>
                                                <span className='text-gray-500 text-sm lg:text-base'>Quantity</span>
                                            </div>
                                        </div>
                                        <div className="status">
                                            <div className="status__ticker text-base lg:text-xl px-6 py-2 rounded-lg italic" style={{ color : colors[req.status.toLowerCase()]}}>
                                                <span className='capitalize'>{req.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                                </>
                            )}
                    </div>
                </div>
            </div>
            <Create isClicked={isClicked} setIsClicked={setIsClicked}/>
        </div>
    </div>
  )
}

export default Request

const Create = ({ isClicked, setIsClicked }) => {

    const { data, setData, errors, post} = useForm({
        'title': '',
        'reason': '',
        'households': 0,
        'quantity': 0,
        'file' : null
    });
    const [fileName, setFileName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/bdrrm/request', {
            onSuccess: () => {
                setIsClicked(false);
            },
            onError: (error) => {
                console.log(`Error: ${error}`)
            }
        })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setData('file', file);
            setFileName(file.name);
        }
        else{
            setFileName("");
        }
    }

    return(
        <AnimatePresence>
            { isClicked && (
                <motion.div
                initial={{opacity: 0,}}
                animate={{opacity: 1, transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1]}}}
                exit={{opacity: 0}}
                onClick={() => setIsClicked(false)}
                className='fixed inset-0 bg-black/25 flex justify-center items-center'>

                <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0, transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1]}}}
                exit={{opacity: 0, y: 10}}
                className={`relative w-full h-full bg-cwhite md:w-[80vw] md:h-[80vh] lg:w-[40vw]  md:rounded-xl flex flex-col justify-center`} onClick={(e) => e.stopPropagation()}>
                    <div className="exit absolute top-4 right-4 bg-gray-500 rounded-full text-cwhite p-1" onClick={() => setIsClicked(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
                    </div>
                    <form className='mt-12 w-full px-[2rem] md:px-[6rem]'>
                        <p className='text-4xl md:text-2xl font-bold cheader'>Request Relief</p>
                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <input type="text" id="title" value={data.title} onChange={e => setData('title', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder="Request Title"/>
                            {errors.title && <FormError error={errors.title}/>}
                        </div>
                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <textarea type="text" id="reason" required={true} value={data.reason} onChange={e => setData('reason', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl resize-none min-h-[150px]' placeholder="Reason for Request">
                            </textarea>
                            {errors.reason && <FormError error={errors.reason}/>}
                        </div>
                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <input type="number" id="households" value={data.households} onChange={e => setData('households', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder="Number of Affected Households"/>
                            {errors.households && <FormError error={errors.households}/>}
                        </div>
                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <input type="number" id="quantity" value={data.quantity} onChange={e => setData('quantity', e.target.value)} className='bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize' required={true} placeholder="Number of Relief Boxes Requested"/>
                            {errors.quantity && <FormError error={errors.quantity}/>}
                        </div>
                        <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                            <input type="file" id="attachment" onChange={e => handleFileChange(e)} className='hidden' required={true} placeholder="Number of Relief Boxes Requested"/>
                            <label htmlFor="attachment" className='border border-dashed border-cblack rounded-lg h-[4rem] flex justify-center items-center flex-col text-center'>
                                <span className={`text-sm ${!fileName ? 'hidden' : ''}`}>{fileName}</span>
                                <span className={`text-sm lg:text-base ${fileName ? 'hidden' : ''}`}>Insert Disaster Report</span>
                                {errors.file && <FormError error={errors.file}/>}
                            </label>
                        </div>
                        <div className="form-field flex flex-col items-center mt-10">
                            <input type="submit" value="Submit" className='px-32 md:px-16 lg:px-36 mx-auto md:mx-0 bg-clgreen text-cblack w-fit rounded-lg border border-black hover:bg-cgreen hover:text-black ctransition cursor-pointer py-4 text-xl' required={true} onClick={(e) => handleSubmit(e)}/>
                        </div>
                    </form>
                </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import { AnimatePresence, motion } from 'motion/react';
import { router, useForm, usePage } from '@inertiajs/react';
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";
import useWallet from '../components/useWallet';
import { ethers } from "ethers";
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormError from '../components/FormError';

const Shipments = ({ requests, shipments }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [reliefID, setReliefID] = useState("");
    const [isShipmentClicked, setIsShipmentClicked] = useState(false);
    const [shipmentID, setShipmentID]  = useState("");
    const handleClick = ( id ) => {
        setReliefID(id);
        setIsClicked(true);
    }

    const handleShipmentClicked = ( id ) => {
        setShipmentID(id);
        setIsShipmentClicked(true);
    }

    const in_progress = shipments.filter((shipment) => shipment.status !== 'distributed');
    const distributed = shipments.filter((shipment) => shipment.status === 'distributed');

  return (
    <div>
        <Nav />

        <div className="wrapper h-full grid grid-cols-3 gap-4 lg:gap-8 w-full px-6 text-cblack">
                {/* request */}
                <div className="sec__1 col-span-3 lg:col-span-2 h-full flex flex-col">
                    <div className="request__wrapper">
                        <div className="header">
                            <span className='text-gray-500 text-sm md:text-base lg:text-xl'>Pending Requests</span>
                        </div>
                        <div className="request h-full my-4 overflow-auto">
                            {requests.map((req, i) => {
                                const created_at = new Date(req.created_at).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                });

                                return (
                                    <div key={i} className='w-full bg-white flex justify-between items-center min-h-[100px] p-4 rounded-xl mb-4 shadow-sm'>
                                        <div className="title flex flex-col">
                                            <span className='font-bold capitalize text-xl lg:text-2xl mb-2'>{req.id}</span>
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
                                        <div className="view">
                                            <button className='bg-clgreen hover:bg-cgreen ctransition text-base lg:text-xl px-4 py-3 rounded-xl' onClick={() => handleClick(req.id)}>View Request</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="distributed">
                        <div className="header">
                            <span className='text-gray-500 text-sm md:text-base lg:text-xl'>Distributed Shipments</span>
                            <div className='shipment__wrapper h-full mt-4 overflow-auto'>
                                {distributed.map((req, i) => {
                                    const bgColors = {
                                        distributed: "bg-violet-200",
                                    };

                                    const textColors = {
                                        distributed: "text-violet-600",
                                    };

                                    return (
                                        <div key={i} className='w-full bg-white flex justify-between items-center min-h-[100px] p-4 rounded-xl mb-4 shadow-sm' onClick={() => handleShipmentClicked(req.id)}>
                                            <div className="shipment__id">
                                                <span className='block'>{req.id}</span>
                                                <span className='block text-sm text-gray-400'>{req.request_id}</span>
                                            </div>
                                            <div className="shipment__qunatity hidden lg:flex flex-col items-center">
                                                <span>{req.quantity}</span>
                                                <span className='text-gray-500 text-sm lg:text-base'>Quantity</span>
                                            </div>
                                            <div className={`shipment__status text-sm lg:text-xl py-2 rounded-full italic capitalize min-w-[90px] lg:min-w-[120px] text-center ${bgColors[req.status.toLowerCase()]} ${textColors[req.status.toLowerCase()]}`}>
                                                <span>  {req.status === "in_transit"
                                                        ? "In Transit"
                                                        : req.status === "received"
                                                        ? "Delivered"
                                                        : req.status}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* shipments */}
                <div className="sec__2 col-span-3 lg:col-span-1 flex flex-col">
                    <div className="header">
                            <span className='text-gray-500 text-sm md:text-base lg:text-xl'>Shipments</span>
                    </div>
                    <div className='shipment__wrapper h-full mt-4 overflow-auto'>
                        {in_progress.map((req, i) => {
                            const created_at = new Date(req.created_at).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            });

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

                            return (
                                <div key={i} className='w-full bg-white flex justify-between items-center min-h-[100px] p-4 rounded-xl mb-4 shadow-sm' onClick={() => handleShipmentClicked(req.id)}>
                                    <div className="shipment__id">
                                        <span className='block'>{req.id}</span>
                                        <span className='block text-sm text-gray-400'>{req.request_id}</span>
                                    </div>
                                    <div className="shipment__qunatity hidden lg:flex flex-col items-center">
                                        <span>{req.quantity}</span>
                                        <span className='text-gray-500 text-sm lg:text-base'>Quantity</span>
                                    </div>
                                    <div className={`shipment__status text-sm lg:text-xl py-2 rounded-full italic capitalize min-w-[90px] lg:min-w-[120px] text-center ${bgColors[req.status.toLowerCase()]} ${textColors[req.status.toLowerCase()]}`}>
                                        <span>  {req.status === "in_transit"
                                                ? "In Transit"
                                                : req.status === "received"
                                                ? "Delivered"
                                                : req.status}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
        </div>
        <Request isClicked={isClicked} setIsClicked={setIsClicked} id={reliefID} requests={requests}/>
        <Shipment isShipmentClicked={isShipmentClicked} setIsShipmentClicked={setIsShipmentClicked} id={shipmentID} shipments={shipments}/>
    </div>
  )
}

export default Shipments

const Request = ({ isClicked, setIsClicked, id, requests}) => {
    const relief = id && requests.filter((req) => req.id === id)[0];
    const [isDenyOpen, setIsDenyOpen] = useState(false);

    const handleApprove = ( id ) => {
        router.put(`/dswd/shipments/approve/${id}`, {}, {
            onSuccess: (res) => {
                setIsClicked(false);
            },
        })
    }

    const closeModal = () => {
        setIsClicked(false);
        setIsDenyOpen(false);
    }

    const reasons = [
        {
            id: 1,
            reason: "Incomplete Documentation"
        },
        {
            id: 2,
            reason: "Incorrect Information"
        },
        {
            id: 3,
            reason: "Duplicate Request"
        },
        {
            id: 4,
            reason: "Insufficient Inventory"
        },
        {
            id: 5,
            reason: "False Claims"
        },
        {
            id: 6,
            reason: "Other"
        },
    ]

    const { data, setData, put, errors } = useForm({
        reason : '',
        otherReason: ''
    })

    const handleReasonChange = (e) => {
        const selectedReason = e.target.value;

        setData({
            reason: selectedReason,
            otherReason: selectedReason === "Other" ? data.otherReason : "",
        });
    };

    const handleOtherReasonChange = (e) => {
        setData("otherReason", e.target.value);
    };

    const handleDeny = (e) => {
        e.preventDefault();
        put(`/dswd/shipments/deny/${id}`, {
            onSuccess: () => {
                setIsClicked(false);
                setIsDenyOpen(false);
            }
        })
    }

    return(
        <AnimatePresence mode='wait'>
            {
                isClicked && (
                    <motion.div
                    initial={{opacity: 0,}}
                    animate={{opacity: 1, transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1]}}}
                    exit={{opacity: 0}}
                    className='fixed inset-0 bg-black/25 flex justify-center items-center' onClick={closeModal}>
                        <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0, transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1]}}}
                        exit={{opacity: 0, y: 10}}
                        className={`relative w-full min-h-[100vh] ${isDenyOpen ? 'md:min-h-[50vh]' : 'md:min-h-[90vh] lg:min-h-[80vh]'} bg-cwhite md:w-[80vw] lg:w-[40vw]  md:rounded-xl flex flex-col justify-center p-4 md:p-8`} onClick={(e) => e.stopPropagation()}>
                            <div className="exit absolute top-12 lg:top-4 right-4 md:right-8 md:top-8 bg-gray-500 rounded-full text-cwhite p-1" onClick={closeModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" ><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
                            </div>
                            <div className="modal_content">
                                {!isDenyOpen ? (
                                    <div className="request__content">
                                        <div className="letter space-y-6">
                                            <div className="address text-base lg:text-xl space-y-4 border-b border-gray-300 pb-8">
                                                <div className="from space-x-4">
                                                    <span className='text-gray-500'>From : </span>
                                                    <span>{relief.email}</span>
                                                </div>
                                                <div className="to space-x-4">
                                                    <span className='text-gray-500'>To : </span>
                                                    <span>DSWD</span>
                                                </div>
                                            </div>
                                            <div className="body">
                                                <div className="title flex flex-col">
                                                    <span className='text-2xl lg:text-3xl capitalize font-bold mt-4'>{relief.title}</span>
                                                </div>
                                                <div className="text-base lg:text-xl reason mt-8 min-h-[160px] max-h-[160px] lg:min-h-[350px] overflow-auto pr-4 cscrollbar whitespace-pre-line">
                                                    <p>
                                                        {relief.reason}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="request space-y-4 text-base lg:text-xl">
                                                <div className="households space-x-4 text-gray-500">
                                                    <span>Households <span className='text-base'>&#40; Affected &#41; </span> :</span>
                                                    <span className='text-cblack'>{relief.households}</span>
                                                </div>
                                                <div className="quantity space-x-4 text-gray-500">
                                                    <span>Quantity :</span>
                                                    <span className='text-cblack'>{relief.households}</span>
                                                </div>
                                                <div className="quantity space-x-4 text-gray-500">
                                                    <span>Affected Areas :</span>
                                                    <span className='text-cblack text-base'>{relief.districts.map(district => district.name).join(', ')}</span>
                                                </div>
                                                <div className="disaster-report space-x-4 text-gray-500 flex">
                                                    <span>Attachment :</span>
                                                    <a  href={`/storage/${relief.file_path}`} target="_blank" className='text-blue-500 flex space-x-1 items-center'>
                                                        <span>Disaster Report</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="action border-t border-gray-300 pt-8 flex justify-between items-center">
                                                <div className="id space-x-2 lg:space-x-4">
                                                    <span className='text-xs lg:text-base text-gray-500'>Request ID :</span>
                                                    <span className='text-xs lg:text-base text-gray-500'>{relief.id}</span>
                                                </div>
                                                <div className="action__btns space-x-2 lg:space-x-4">
                                                    <button className='text-base lg:text-xl px-3 lg:px-4 py-3 bg-red-500 rounded-xl text-cwhite hover:bg-red-600 ctransition' onClick={() => setIsDenyOpen(true)}>Deny</button>
                                                    <button className='text-base lg:text-xl px-3 lg:px-4 py-3 bg-clgreen rounded-xl hover:bg-cgreen ctransition' onClick={() => handleApprove(relief.id)}>Approve</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="deny__content">
                                        <div>
                                            <form action="" className='space-y-4'>
                                                <div className="select min-w-[20rem]">
                                                    <label htmlFor="reason-select"></label>
                                                    <select id="reason-select" className='w-full text-xl rounded-xl h-[60px]' value={data.reason} onChange={(e) => handleReasonChange(e)}>
                                                        <option>Select a reason for denial</option>
                                                        {reasons.map((reason) => (
                                                            <option key={reason.id} value={reason.reason}>
                                                                {reason.reason}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {data.reason === "Other" && (
                                                    <div className="others">
                                                        <textarea id="reason" className='h-40 bg-white border-none rounded-xl w-full resize-none p-4'  placeholder='Other Reasons (e.g., Security Concerns)' value={data.otherReason} onChange={(e) => handleOtherReasonChange(e)}></textarea>
                                                        {errors.otherReason && <FormError error={errors.otherReason}/>}
                                                    </div>
                                                )}
                                                <div className="submit flex justify-center">
                                                    <button className='text-base lg:text-xl px-3 lg:px-4 py-3 bg-red-600 rounded-xl hover:bg-red-500 ctransition mx-auto text-cwhite' onClick={(e) => handleDeny(e)}>Deny Request</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

const Shipment = ({ isShipmentClicked,  setIsShipmentClicked, id, shipments }) => {
    const shipment = id && shipments.filter((shipment) => shipment.id === id)[0];
    const [qrCodes, setQrCodes] = useState([]);
    const { account, contract, provider, connectWallet } = useWallet();

    // console.log(shipment);
    // console.log(shipment.id, shipment.quantity);
    // console.log(typeof(shipment.id), typeof(shipment.quantity));

    const handleSend = async () => {
            if (!account) {
                alert("Please connect your wallet first.");
                await connectWallet();
                return;
            }

            if (!contract) {
                alert("Contract is not initialized. Please connect your wallet.");
                return;
            }
            if (!provider) {
                alert("Provider is not initialized. Please connect your wallet.");
                return;
            }

            try{
                console.log("📜 Using contract:", contract.address);
                console.log("🧑‍💻 Using account:", account);
                console.log("Sending transaction...");

                const signer = provider.getSigner();
                console.log("✍️ Getting signer:", signer);

                console.log("Shipment ID type:", typeof shipment.id, "Value:", shipment.id);
                console.log("Quantity type:", typeof shipment.quantity, "Value:", shipment.quantity);

                const tx = await contract.connect(signer).recordShipment(
                shipment.id,
                ethers.BigNumber.from(shipment.quantity.toString()));
                // console.log("🚀 Transaction sent:", tx.hash);

                const receipt = await tx.wait(1);

                // console.log("✅ Transaction confirmed! Receipt:", receipt);
                // alert("Shipment recorded successfully!");



            }
            catch(error){
                console.error("Detailed Error: ", error);
                if (error.data) {
                    console.error("Error data:", error.data);
                  }
                  alert(`Error: ${error.message}`);
            }

            axios.put(`/dswd/shipments/${shipment.id}/status`, {
                status: "in_transit",
                req_id: shipment.request_id,
            })
            .then((res) => {
                toast.success("Shipment recorded successfully");
                setTimeout(() => setIsShipmentClicked(false), 2000);
            })
            .catch((error) => {
                alert(`Error: ${error}`)
            })


    }


    const handleCheck = async () => {
        console.log("clicked");
        const tx = await contract.getShipment("SP_607695");
        console.log(tx);
    }


    useEffect(() => {
        axios.get(`/dswd/shipments/${shipment.id}/qrcodes`)
            .then(response => {
                setQrCodes(response.data)
            })
            .catch(error => console.error("Error fetching QR codes", error));
        }, [shipment.id]);

        const handlePrint = () => {
            const printContent = document.querySelector(".printable__area").innerHTML;
            const originalContent = document.body.innerHTML;

            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
            window.location.reload();
        }

        useEffect(() => {
            if (isShipmentClicked) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }

            return () => {
                document.body.style.overflow = "auto";
            };
        }, [isShipmentClicked]);



    return(
        <AnimatePresence mode='wait'>
        {isShipmentClicked && (
                    <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0, transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1]}}}
                    exit={{opacity: 0, y: 10}}
                    className="qr fixed inset-0 bg-cwhite h-full w-full px-6 border" onClick={(e) => e.stopPropagation()}>
                        <div className="exit absolute top-4 right-4 bg-gray-500 rounded-full text-cwhite p-1" onClick={() => setIsShipmentClicked(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
                        </div>
                        <ToastContainer
                                    position="top-center"
                                    autoClose={5000}
                                    hideProgressBar={true}
                                    newestOnTop={false}
                                    closeOnClick={false}
                                    rtl={false}
                                    pauseOnFocusLoss
                                    pauseOnHover
                                    theme="colored"
                                    className="text-sm"
                                    />
                        <div className="qr__container-header mt-16 mb-8 lg:my-24 flex flex-col lg:flex-row justify-between items-start lg:items-center">
                            <div className="sec__1">
                                <p className='text-base text-gray-500'>QR Codes:</p>
                                <h1 className='font-font1Smbd text-4xl' onClick={handleCheck}>{shipment.id}</h1>
                            </div>
                            <div className="sec__2 space-y-4 mt-4 lg:mt-0 flex flex-col lg:items-end">
                                <div className="btns space-x-4 flex">
                                    <button onClick={handlePrint} className='px-4 py-2 bg-cgray rounded-xl border border-cblack hover:bg-cgray/10 ctransition'>Print QR Codes</button>
                                    <button className={`px-4 py-2 bg-clgreen rounded-xl border border-cblack hover:bg-cgreen ctransition ${shipment.status !== 'pending' ? 'hidden' : 'block'}`} onClick={handleSend}>Send</button>
                                </div>
                                <span className='text-sm text-gray-500'>Wallet: {account ? account : (<span className='underline text-blue-500 cursor-pointer' onClick={() => connectWallet()}>Connect Wallet</span>)}</span>
                            </div>

                        </div>
                        <div className="printable__area flex overflow-x-auto cscrollbar px-2">
                            {qrCodes.map((qr, index) => (
                                <div key={index} className="qr__container border border-gray-300 rounded shadow-sm space-y-8 mr-8 mb-8">
                                    <div className="header flex justify-between items-center p-4 border-b border-dashed border-gray-300">
                                        <div className="text_1">
                                            <p className='text-sm text-gray-500'>Box Number</p>
                                            <p className='text-2xl font-font1Smbd'>{qr.box_number.padStart(2, '0')}</p>
                                        </div>
                                        <div className="text_2">
                                            <p className='text-sm text-gray-500'>Shipment ID</p>
                                            <p className='text-2xl font-font1Smbd'>{qr.shipment_id}</p>
                                        </div>
                                    </div>
                                    <div className="qr flex justify-center items-center p-4">
                                        <QRCodeSVG value={qr.qr_data} size={250}
                                        imageSettings={{
                                            src: '/assets/fav-icon.png',
                                            height: 60,
                                            width: 60
                                        }}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
        )}
        </AnimatePresence>
    )
}

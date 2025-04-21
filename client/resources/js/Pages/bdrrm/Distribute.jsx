import React, { useEffect, useState } from 'react'
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWallet from '../components/useWallet';
import { ethers } from "ethers";
import { router } from "@inertiajs/react";

const Distribute = ({ request, shipment }) => {
    const [scannedBeneficiaries, setScannedBeneficiaries] = useState([]);

    useEffect(() => {
        let scanner;

        const readerElement = document.getElementById("reader");
        if (readerElement) {
            scanner = new Html5QrcodeScanner("reader", {
                fps: 1,
                qrbox: {width: 200, height: 200},
                aspectRatio: 1.0
            });

            scanner.render(
            (decodedData) => {
            try {
                const parsedData = JSON.parse(decodedData);
                console.log("Parsed data:", parsedData);

                setScannedBeneficiaries((prev) => {
                    if (prev.some(benificiary => benificiary.id === parsedData.id)) {
                    toast.error("Beneficiary has already received allocation");
                    return prev;
                    }

                    if (prev.length >= shipment.received_quantity) {
                        toast.error("Relief stock limit reached. No more allocations available.");
                        return prev;
                    }

                    const request_districts = request.districts.map((dist) => dist.name);

                    if (!request_districts.includes(parsedData.district)) {
                    toast.error("Not Eligible");
                    return prev;
                    }

                    toast.success(`${parsedData.name} Successfully received their allocation`);
                    return [...prev, parsedData];
                });
                } catch (error) {
                console.error("Error parsing QR code data:", error);
                toast.error("Invalid QR code format");
                }
            },
            (error) => console.warn("QR Scan Error: ", error)
            );
        }

        return () => {
            if (scanner) {
                scanner.clear();
            }
        };

    }, [request])

    const { account, contract, provider, connectWallet } = useWallet();
    const handleConfirm = async () => {
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
                const signer = provider.getSigner();
                const tx = await contract.connect(signer).recordDistribution(
                shipment.id,
                ethers.BigNumber.from(scannedBeneficiaries.length.toString()));

                const receipt = await tx.wait(1);
            }
            catch(error){
                console.error("Detailed Error: ", error);
                if (error.data) {
                    console.error("Error data:", error.data);
                  }
                  alert(`Error: ${error.message}`);
            }

            const reportData = {
                shipment_id: shipment.id,
                request_id: request.id,
                total_sent: shipment.quantity,
                total_received: shipment.received_quantity,
                total_distributed: scannedBeneficiaries.length,
                beneficiaries: scannedBeneficiaries,
            }

            axios.post('/reports', reportData)
            .then(res => {
                if(res.data){
                    toast.success("Report Generated");

                    return axios.put(`/dswd/shipments/${shipment.id}/status`, {
                        status: "distributed",
                        req_id: request.id,
                        totalDistributed: scannedBeneficiaries.length
                    })
                }
                else{
                    toast.error("Failed to generate report");
                }
            })
            .then((res) => {
                if(res.data.warning){
                    toast.warning(res.data.warning);
                }

                toast.success(res.data.success);
                setTimeout(() => {
                    window.location.replace('/bdrrm/request');
                }, 5000);
            })
            .catch((error) => {
                toast.error(`Error: ${error.message}`);
            })

    }

  return (
    <div className='wrapper flex flex-col items-center h-screen w-[80vw] mx-auto mt-8'>
        <div
            className="exit absolute top-4 right-4 bg-gray-500 rounded-full text-cwhite p-1"
            onClick={() => router.visit('/bdrrm/request')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6 lg:size-8"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
              />
            </svg>
          </div>
         <ToastContainer
                        position="top-center"
                    autoClose={2000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        pauseOnHover
                        theme="colored"
                        className="text-sm"
                      />
        <h1 className="text-4xl font-font1Smbd">Distribute</h1>
        <div className="wallet mb-8">
            <span className='text-sm text-gray-500'>Wallet: {account ? account : (<span className='underline text-blue-500 cursor-pointer' onClick={() => connectWallet()}>Connect Wallet</span>)}</span>
        </div>

        <div className="scanner">
            <div id="reader"></div>
        </div>
        <div className="confirm mt-8 flex flex-col items-center">
            <div className="scanned">Distributed Boxes: {scannedBeneficiaries.length}</div>
            <button
            onClick={handleConfirm}
            className='bg-clgreen hover:bg-cgreen ctransition border border-cblack text-cblack px-6 py-2 rounded-xl mt-4'
            >Confirm</button>
        </div>
    </div>
  )
}

export default Distribute

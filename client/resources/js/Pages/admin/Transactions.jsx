import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import useWallet from '../components/useWallet'

const Transactions = ({ shipment_ids }) => {
    const { account, contract, provider, connectWallet } = useWallet();
    const [blockchainShipments, setBlockchainShipments] = useState([]);

    const getBlockchainShipments = async () => {
        if (!account) {
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
            const shipments = [];

            for(let i = 0; i < shipment_ids.length; i++){
                // const shipmentId = shipment_ids[i];
                // const shipment = await contract.getShipment(shipmentId)
                // shipments.push(shipment);
                const shipmentId = shipment_ids[i];
                try {
                    console.log(shipmentId);
                    const shipment = await contract.getShipment(shipmentId);
                    shipments.push(shipment);
                    console.log("Shipments", shipments);
                } catch (error) {
                    console.warn(`Shipment ${shipmentId} not found. Skipping...`);
                }
            }
            setBlockchainShipments(shipments);

        }
        catch(error){
            console.log(`Error: ${error.message}`)
        }

    }
    useEffect(() => {
        getBlockchainShipments();
    }, [account])

  return (
    <div>
      <Nav/>
      <div className="transactions__container w-full px-6 lg:px-[20rem] mt-8">
        <div className="wallet">
            <span className='text-sm text-gray-500'>Wallet: {account ? account : (<span className='underline text-blue-500 cursor-pointer' onClick={() => connectWallet()}>Connect Wallet</span>)}</span>
        </div>
        <div className="transactions mt-4">
            {blockchainShipments.map((shipment, index) => {
                console.log(blockchainShipments);
                const shipmentDate = new Date(shipment.timestamp * 1000);
                const formattedShipmentDate = shipmentDate.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric', weekday: 'long', hour: '2-digit', minute: 'numeric'});
                console.log(formattedShipmentDate);
                return(
                    <div key={index} className='border p-4 rounded-xl mb-4 shadow-sm'>
                        <div className="header mb-3 text-gray-500 flex flex-col md:flex-row md:justify-between items-start md:items-center">
                            <div className="id">
                                <span className='text-sm mr-2'>Shipment ID:</span>
                                <span className='text-sm md:text-base break-words whitespace-normal'>{`${shipment.shipmentId.slice(0, 5)}...${shipment.shipmentId.slice(-3)}`}</span>
                            </div>
                            <div className="date">
                                <span className='text-sm text-gray-500'>{formattedShipmentDate}</span>
                            </div>
                        </div>
                        <div className='flex justify-between items-center pb-2 flex-wrap space-y-4'>
                            <div className="transactions flex justify-between min-w-[20rem] text-center">
                                <div className="sent flex flex-col items-center space-y-2">
                                    <span className={`text-sm bg-green-200 text-green-600 p-1 rounded-full min-w-[90px]`}>Sent</span>
                                    <span>{shipment.totalSent.toString()}</span>
                                </div>
                                <div className="received flex flex-col items-center space-y-2 text-center">
                                    <span className={`text-sm text-gray-500 py-1 rounded-full ${shipment.totalReceived.toString() !== shipment.totalSent.toString() ? 'bg-yellow-200 text-yellow-600' : 'bg-green-200 text-green-600'} min-w-[90px]`}>Received</span>
                                    <span>{shipment.totalReceived.toString()}</span>
                                </div>
                                <div className="sent flex flex-col items-center space-y-2 text-center">
                                    <span className={`text-sm text-gray-500 p-1 rounded-full ${shipment.totalDistributed.toString() !== shipment.totalReceived.toString() ? 'bg-yellow-200 text-yellow-600' : 'bg-green-200 text-green-600'} min-w-[90px]`}>Distributed</span>
                                    <span>{shipment.totalDistributed.toString()}</span>
                                </div>
                            </div>
                            <div className="status flex text-center">
                                <span className={`min-w-[120px] text-sm md:text-base lg:text-xl py-1 md:py-2 italic rounded-full ${shipment.isCompleted ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'}`}>{shipment.isCompleted ? 'Complete' : 'Flagged'}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  )
}

export default Transactions

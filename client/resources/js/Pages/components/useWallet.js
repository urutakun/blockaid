import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import abi from "../../../../abi/abi.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = abi;
const HARDHAT_RPC = "https://192.168.1.7";

const useWallet = () => {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);

    const connectWallet =  async () => {
        try {
            let provider;
            let signer;
            let account;

            // Check if MetaMask is available
            if (window.ethereum) {
                provider = new ethers.providers.Web3Provider(window.ethereum);
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                signer = provider.getSigner();
                account = ethers.utils.getAddress(accounts[0]);
            } else {
                // Use Hardhat local provider (via Nginx)
                provider = new ethers.providers.JsonRpcProvider(HARDHAT_RPC);
                signer = provider.getSigner();
                account = await signer.getAddress();
            }

            const BlockAid = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            setAccount(account);
            setProvider(provider);
            setContract(BlockAid);
        } catch (error) {
            console.error("Wallet connection failed", error);
        }
    }

    return { account, provider, contract, connectWallet };

}

export default useWallet

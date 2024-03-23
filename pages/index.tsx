import React, { useState } from 'react';
import Head from "next/head"; // Make sure to import Head from next/head
import { KoiosProvider } from '@meshsdk/core';
import { StakeButton, MeshBadge } from '@meshsdk/react';
import { toast } from 'react-toastify';

export default function Home() {
  const blockchainProvider = new KoiosProvider('api', process.env.NEXT_PUBLIC_KOIOS_API_KEY);

  const [selectedAddress, setSelectedAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);

  const fetchAccountInfo = async () => {
    if (!selectedAddress) {
      toast.error('No address selected');
      return;
    }

    try {
      const info = await blockchainProvider.fetchAccountInfo(selectedAddress);
      setAccountBalance(info.balance); // Adjust according to the actual info structure
    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Mesh App on Cardano</title>
        <meta name="description" content="A Cardano dApp powered by Mesh" />
        <link rel="icon" href="https://raw.githubusercontent.com/Fuma419/HodlerStaking/main/Hodler_Green_Icon_round.png"/>
        <link href="https://meshjs.dev/css/template.css" rel="stylesheet" key="mesh-demo" />
      </Head>
      
      <main className="main">
        <div className="logo-container" style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 'auto',
            padding: '40px',
            boxSizing: 'border-box'
          }}>
          <a href="https://www.hodlerstaking.com/">
            <img src="/images/Logo_icon_green.svg" alt="Hodler Coalition" style={{ width: '100%', height: 'auto' }} />
          </a>
        </div>
        <h1 className="title">
          Welcome, <a href="https://www.hodlerstaking.com/" className="accentColor">HODLER</a> 
        </h1>
        <div className="balance">
          Wallet Balance: {accountBalance ? `₳ ${accountBalance}` : '₳ 0'}
        </div>
        <div className="demo">
          <div className="stake-message">
            Mobile browser support coming soon. Please return from a desktop or mobile wallet.
          </div>
          <div className="custom-stake-button">
            <StakeButton
              onCheck={(address: string) => {
                return new Promise((resolve, reject) => {
                  blockchainProvider.fetchAccountInfo(address)
                    .then(info => {
                      // console.log(info); // Check the structure of 'info'
                      // Do something with info, like updating state
                      const balance = Number(info.balance) / 1000000; // Convert to number and divide
                      setAccountBalance(balance); // Update state with the formatted balance
                      resolve(info); // Resolve the promise with the info
                    })
                    .catch(error => {
                      toast.error(error.message || 'An unexpected error occurred');
                      reject(error); // Reject the promise on error
                    });
                });
              }}
              
              poolId="pool1eaeynp2hs06v4x8q65jfm2xqcd3dc80rv220gmxvwg8m5sd6e7a"
            />
            {/* Display the selected address and fetch button only if an address is selected */}
            {selectedAddress && (
              <>
                <p>Address: {selectedAddress}</p>
                <button onClick={fetchAccountInfo} className="fetch-info-button">Fetch Account Info</button>
                {accountBalance && <p>Account Balance: {accountBalance}</p>}
              </>
            )}
          </div>
        </div>
        <div className="button-container">
          <button className="custom-button" onClick={() => window.location.href = 'https://www.hodlerstaking.com/'}>
            Back
          </button>
          <button className="custom-button" onClick={() => window.location.href = 'https://cexplorer.io/pool/pool1eaeynp2hs06v4x8q65jfm2xqcd3dc80rv220gmxvwg8m5sd6e7a'}>
            Enter the Cardanoverse
          </button>
        </div>
      </main>

      <footer className="footer">
        <MeshBadge dark={true} />
      </footer>
    </div>
  );
}

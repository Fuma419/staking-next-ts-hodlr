import React, { useState } from 'react';
import Head from "next/head"; // Make sure to import Head from next/head
import { StakeButton, MeshBadge } from '@meshsdk/react';
import { toast } from 'react-toastify';

export default function Home() {

  const [selectedAddress, setSelectedAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);
  const [delegatedPoolID, setDelegatedPoolID] = useState(0);
  

  const fetchAccountInfo = async () => {
    if (!selectedAddress) {
      toast.error('No address selected');
      return;
    }
  
    try {
      const response = await fetch(`/api/koios?address=${selectedAddress}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch account info: ${response.statusText}`);
      }
      const info = await response.json();
      const balance = info.balance ? Number(info.balance) / 1000000 : 0; // Adjust based on the actual structure and ensure fallback
      const pool = Number(info.poolId)
      setAccountBalance(balance);
      setDelegatedPoolID(pool);
    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred');
    }
  };  

  return (
    <div className="container backgroundImage">
      <Head>
        <link href="https://meshjs.dev/css/template.css" rel="stylesheet" key="mesh-demo" />
        <title>CNC Group Delegation</title>
        <meta name="description" content="CNC Group Delegation - powered by Mesh" />
        {/* <link rel="icon" href="https://raw.githubusercontent.com/Fuma419/HodlerStaking/main/Hodler_Green_Icon_round.png"/> */}
      
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
          <a href="https://climateneutralcardano.org/">
            <img src="/images/logo_icon.png" alt="Climate Neutral Cardano" style={{ width: '100%', height: 'auto' }} />
          </a>
        </div>
{/*         <h1 className="title">
          Delegate for a <a className="accentColor">greener</a> Cardano 
        </h1> */}
        <div className="demo">
          <div className="stake-message">
            Mobile browser support coming soon. Please return from a desktop or mobile wallet.
          </div>
          <div className="custom-stake-button">
            <StakeButton
              onCheck={(address: string) => {
                return new Promise((resolve, reject) => {
                  fetch(`/api/koios?address=${address}`)
                    .then(response => response.json())
                    .then(info => {
                      const balance = Number(info.balance) / 1000000; // Adjust this line based on the actual structure of your info
                      setAccountBalance(balance);
                      setSelectedAddress(address);
                      resolve(info);
                    })
                    .catch(error => {
                      toast.error(error.message || 'An unexpected error occurred');
                      reject(error);
                    });
                });
              }}
              poolId="pool1eaeynp2hs06v4x8q65jfm2xqcd3dc80rv220gmxvwg8m5sd6e7a"
            />
          </div>
          </div>
          <div>
          {selectedAddress && (
              <>
              <div className="balance">
                Wallet Balance: {accountBalance ? `₳ ${Number(accountBalance).toLocaleString()}` : '₳ 0'}
              </div>
              <div className="balance">
                Stake Address: {selectedAddress}
              </div>
{/*               <div className="balance">
                Delegated to: {delegatedPoolID}
              </div> */}
              </>
            )}
        </div>
        <div className="button-container">
          <button className="custom-button" onClick={() => window.location.href = 'https://climateneutralcardano.org/'}>
            Back
          </button>
          <button className="custom-button" onClick={() => window.location.href = 'https://cexplorer.io/list/0bcecc46bb5231ae'}>
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

import React, { useState } from 'react';
import Head from "next/head"; // Make sure to import Head from next/head
import { StakeButton, MeshBadge } from '@meshsdk/react';
import { toast } from 'react-toastify';


export default function Home() {

  const [selectedAddress, setSelectedAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);
  const [delegatedPoolID, setDelegatedPoolID] = useState(0);
  const [delegateToPoolID, setDelegateToPoolID] = useState('');
  const [delegatedPoolTICKER, setDelegatedPoolTICKER] = useState('');
  const [delegatedPoolNAME, setDelegatedPoolNAME] = useState('');
  const action = 'fetchAccountInfo';
  const params = { address: 'someAddressValue', otherParam: 'value' };
  

  return (
    <div className="container backgroundImage">
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
        <div className="demo">
          <div className="stake-message">
            Mobile browser support coming soon. Please return from a desktop or mobile wallet.
          </div>
          <div className="custom-stake-button">
          <StakeButton
          poolId="pool1eaeynp2hs06v4x8q65jfm2xqcd3dc80rv220gmxvwg8m5sd6e7a"
          onCheck={(address: string) => {
            return new Promise((resolve, reject) => {
              const params = { address: address };
              const queryString = `action=fetchAccountInfo&params=${encodeURIComponent(JSON.stringify(params))}`;
              
              fetch(`/api/koios?${queryString}`)
                .then(response => response.json())
                .then(info => {
                  const balance = Number(info.balance) / 1000000; // Adjust based on the actual structure of your info
                  const delegated_pool_id = info.poolId ? info.poolId : '';
                  setDelegatedPoolID(delegated_pool_id);
                  setAccountBalance(balance);
                  setSelectedAddress(address);
                  
                  // Now, fetch additional pool info using the API handler
                  if(delegated_pool_id) {
                    fetch('/api/poolInfo', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        pool_bech32_ids: [delegated_pool_id],
                      }),
                    })
                    .then(response => response.json())
                    .then(data => {
                      if(data && data.length > 0) {
                        setDelegatedPoolTICKER(data[0].meta_json.ticker);
                        setDelegatedPoolNAME(data[0].meta_json.name);
                      }
                      resolve(info);
                    })
                    .catch(error => {
                      console.error('Failed to fetch delegated pool info:', error);
                      reject(error);
                    });
                  } else {
                    resolve(info);
                  }
                })
                .catch(error => {
                  toast.error(error.message || 'An unexpected error occurred');
                  reject(error);
                });
            });
          }}
          
        />
                            {/* Placeholder for when selectedAddress is not available */}
                            {!selectedAddress && (
            <div className="balance-placeholder"></div>
          )}
          </div>

          </div>
          {selectedAddress && (
              <>
              <div className="balance">
                Current delegation status:<br /><br />
                Balance: {accountBalance ? `₳ ${Number(accountBalance).toLocaleString()}` : '₳ 0'}<br /><br />
                Pool name: {delegatedPoolNAME}<br /><br />
                Pool ticker: {delegatedPoolTICKER}
              </div>
             {/*<div className="balance">
                Delegated to: {delegatedPoolID}
              </div> */}
              </>
            )}

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

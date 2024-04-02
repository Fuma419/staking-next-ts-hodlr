import React, { useState, useEffect } from 'react';
import Head from "next/head"; // Make sure to import Head from next/head
import { StakeButton, MeshBadge } from '@meshsdk/react';
import { toast } from 'react-toastify';

export default function Home() {

  const [selectedAddress, setSelectedAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);
  const [delegateToPoolID, setDelegateToPoolID] = useState('');
  const [delegatedPoolTICKER, setDelegatedPoolTICKER] = useState('');
  const [delegatedPoolNAME, setDelegatedPoolNAME] = useState('');
  const [delegatedPoolID, setDelegatedPoolID] = useState('');
  const [poolOptions, setPoolOptions] = useState({});
  const action = 'fetchAccountInfo';
const params = { address: 'someAddressValue', otherParam: 'value' };

  useEffect(() => {
    // Fetch the local JSON file
    fetch('/pools.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => setPoolOptions(data))
    .catch(error => console.error('Error loading pool options:', error));
  }, []);

  return (
    <div className="container backgroundImage">
      <Head>
        <title>CNC Group Delegation</title>
        <meta name="description" content="CNC Group Delegation - powered by Mesh" />
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
        {/* Logo and other elements remain the same */}
                    {/* Dropdown for selecting pool */}
        <div className="custom-stake-button">
          <select className="custom-stake-button"
              value={delegateToPoolID}
              onChange={(e) => setDelegateToPoolID(e.target.value)}
            >
              {Object.entries(poolOptions).map(([name, id]) => (
              <option key={id.toString()} value={id.toString()}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="demo">
        <div className="stake-message">
            Mobile browser support coming soon. Please return from a desktop or mobile wallet.
          </div>
        <div className="custom-stake-button">
        <StakeButton
          poolId={delegateToPoolID}
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
          <div>
          {selectedAddress && (
              <>
              <div className="balance">
                Current delegation status:<br /><br />
                Balance: {accountBalance ? `₳ ${Number(accountBalance).toLocaleString()}` : '₳ 0'}<br />
                Pool name: {delegatedPoolNAME}<br />
                Pool ticker: {delegatedPoolTICKER}
              </div>
{/*               <div className="balance">
                Delegated to ID: {delegatedPoolID}
              </div>
              <div className="balance">
                Stake Address: {selectedAddress}
              </div> */}
{/*               <div className="balance">
                Delegated to: {delegateToPoolID}
              </div> */}
              </>
            )}
        </div>
        <div className="button-container">
          <button className="custom-button" onClick={() => window.location.href = 'https://climateneutralcardano.org/'}>
            Back
          </button>
          <button className="custom-button" onClick={() => window.location.href = 'https://cexplorer.io/list/0bcecc46bb5231ae'}>
            To the Cardanoverse
          </button>
        </div>
      </main>

      <footer className="footer">
        <MeshBadge dark={false} />
      </footer>
    </div>
  );
}

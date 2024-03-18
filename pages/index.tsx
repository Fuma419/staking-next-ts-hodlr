import Head from "next/head";
import React from "react";
import { KoiosProvider } from "@meshsdk/core";
import { StakeButton, MeshBadge } from "@meshsdk/react";
import { toast } from 'react-toastify'; // Keep the toast import for calling toast methods

export default function Home() {
  const blockchainProvider = new KoiosProvider("api", process.env.NEXT_PUBLIC_KOIOS_API_KEY);

  const handleCheck = async (address) => {
    console.log("handleCheck called with address:", address); // Ensure this logs
    try {
      const info = await blockchainProvider.fetchAccountInfo(address);
      console.log(info); // Optionally log the info to ensure the call succeeds
    } catch (err) {
      console.log("Error caught:", err.message); // Make sure errors are caught
      toast.error(err.message || "An unexpected error occurred");
    }
  };  

  return (
    <div className="container">
      <Head>
        <title>Mesh App on Cardano</title>
        <meta name="description" content="A Cardano dApp powered my Mesh" />
        <link
          rel="icon"
          href="https://raw.githubusercontent.com/Fuma419/HodlerStaking/main/Hodler_Green_Icon_round.png"
        />

        <link
          href="https://meshjs.dev/css/template.css"
          rel="stylesheet"
          key="mesh-demo"
        />
      </Head>
      
      <main className="main">
        <div className="logo-container" style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 'auto',
            padding: '50px', // Reduced padding, consider using variable or state for responsive padding
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
        <div className="custom-stake-button-wrapper">
          <StakeButton
            onCheck={handleCheck}
            poolId="pool1eaeynp2hs06v4x8q65jfm2xqcd3dc80rv220gmxvwg8m5sd6e7a"
          />
        </div>
        {/* New styled button container */}
        <div className="button-container">
          <button
            className="custom-button"
            onClick={() => window.location.href = 'https://www.hodlerstaking.com/'}
          >
            Back
          </button>
          <button
            className="custom-button"
            onClick={() => window.location.href = 'https://cexplorer.io/pool/pool1eaeynp2hs06v4x8q65jfm2xqcd3dc80rv220gmxvwg8m5sd6e7a'}
          >
            Enter the Cardanoverse
          </button>
        </div>
      </div>
    </main>

      <footer className="footer">
        <MeshBadge dark={true} />
      </footer>
    </div>
  );
}

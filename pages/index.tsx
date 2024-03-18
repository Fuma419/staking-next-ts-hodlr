import Head from "next/head";
import { KoiosProvider } from "@meshsdk/core";
import { StakeButton, MeshBadge } from "@meshsdk/react";

export default function Home() {
  const blockchainProvider = new KoiosProvider('api', process.env.KOIOS_API_KEY);

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
              onCheck={(address: string) =>
                blockchainProvider.fetchAccountInfo(address)
              }
              poolId="pool1eaeynp2hs06v4x8q65jfm2xqcd3dc80rv220gmxvwg8m5sd6e7a"
            />
          </div>
        </div>
      </main>

      <footer className="footer">
        <MeshBadge dark={true} />
      </footer>
    </div>
  );
}

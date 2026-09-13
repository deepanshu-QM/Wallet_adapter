
import React, {useMemo} from 'react';
import { ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletConnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

export function App() {
  const endpoint = "https://api.mainnet-beta.solana.com";        //can use Your own RPC url from hilus 
  return (
    <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
            <WalletMultiButton />
            <WalletDisconnectButton />
            { /* Your app's components go here, nested within the context providers. */ }
        </WalletModalProvider>
    </WalletProvider>
</ConnectionProvider>
  );
}
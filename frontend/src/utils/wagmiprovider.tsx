// @ts-nocheck comment
import {
  connectorsForWallets,
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  argentWallet,
  coinbaseWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig, WagmiProvider, http } from "wagmi";

import { polygonZkEvmCardona } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "Linea Dev Cook Off",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  chains: [polygonZkEvmCardona],
  transports: {
    [polygonZkEvmCardona.id]: http(),
  },
});
const queryClient = new QueryClient();

function WagmiConnect(props: any) {
  return (
    <>
      {config && (
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              theme={darkTheme({
                accentColor: "#1E88E5",
                borderRadius: "large",
                overlayBlur: "small",
              })}
              coolMode
            >
              {props.children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      )}
    </>
  );
}

export default WagmiConnect;

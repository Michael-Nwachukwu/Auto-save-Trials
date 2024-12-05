
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { config } from './wagmi'
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import Balance from './components/BalanceBlock';
import { InputForm } from './components/CreatePlan';

const queryClient = new QueryClient();


function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="flex justify-end items-end w-full p-7">
            
            {/* connect button */}
            <ConnectButton 
              chainStatus="name"
              showBalance={true}
            />
          </div>

          {/* Balance Block */}
          <div className="mt-20">
            <Balance />
          </div>

          {/* Input form block */}
          <div className="flex justify-center items-center">
            <InputForm />
          </div>

        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App

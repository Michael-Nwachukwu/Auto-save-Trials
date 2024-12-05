import { useReadContract } from 'wagmi'
import { useAccount } from 'wagmi'
import { abi } from '../abis'

export default function Balance() {
  const { address } = useAccount();
  const { data: balance } = useReadContract({
    abi,
    functionName: 'fetchUserBalance',
    address: '0xfd22a135213ee2F818845b91Cc8ab33e6B79F381',
    args: [address || '0x0000000000000000000000000000000000000000'],
    query: {
        enabled: !!address,
    },
  })

  return (
    <div>Balance: {balance?.toString()}</div>
  )
}
import { defineChain } from 'viem/chains/utils'
import { chainConfig } from 'viem/op-stack'

const sourceId = 1 // mainnet

export const zama = /*#__PURE__*/ defineChain({
  ...chainConfig,
  id: 12345, // Replace with Zama's unique chain ID
  name: 'Zama Network',
  nativeCurrency: { name: 'ZamaToken', symbol: 'ZAMA', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.zama.io'], // Replace with Zama's RPC URL
    },
  },
  blockExplorers: {
    default: {
      name: 'Zama Explorer',
      url: 'https://explorer.zama.io', // Replace with Zama's block explorer URL
    },
  },
  contracts: {
    ...chainConfig.contracts,
    // Add any specific contracts for Zama if needed
  },
  sourceId,
})

export const baseSuperchain = /*#__PURE__*/ defineChain({
  ...chainConfig,
  id: 8453, // Base Superchain's unique chain ID
  name: 'Base Mainnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.base.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BaseScan',
      url: 'https://basescan.org',
    },
  },
  contracts: {
    ...chainConfig.contracts,
    // Add any specific contracts for Base Superchain if needed
  },
  sourceId,
})

export const CHAIN_DATA = {
  43114: {
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc', 'https://rpc.ankr.com/avalanche'],
    chainId: '0xa86a',
    chainName: 'Avalanche Network',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    blockExplorerUrls: ['https://snowtrace.io'],
  },
  43113: {
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc', 'https://rpc.ankr.com/avalanche_fuji'],
    chainId: '0xa869',
    chainName: 'Avalanche Network',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.snowtrace.io'],
  },
  5: {
    rpcUrls: ['https://rpc.ankr.com/eth_goerli', 'https://eth-goerli.public.blastapi.io'],
    chainId: '0x5',
    chainName: 'Ethereum Testnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },
  97: {
    rpcUrls: [
      'https://data-seed-prebsc-1-s3.binance.org:8545',
      'https://data-seed-prebsc-2-s1.binance.org:8545',
      'https://data-seed-prebsc-2-s3.binance.org:8545',
    ],
    chainId: '0x61',
    chainName: 'BSC Testnet',
    nativeCurrency: {
      name: 'Binance',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
  80001: {
    rpcUrls: ['https://rpc.ankr.com/polygon_mumbai', 'https://matic-testnet-archive-rpc.bwarelabs.com'],
    chainId: '0x13881',
    chainName: 'Mumbai Testnet',
    nativeCurrency: {
      name: 'Polygon',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  },
  24052022: {
    rpcUrls: ['https://rpc.metheus.network/ext/bc/21Z7pN9Z6VfmMo8jjhDQYyYJS5MB7MftZSuKrmenhmwADCWWJH/rpc'],
    chainId: '0x16f0136',
    chainName: 'WrapTag',
    nativeCurrency: {
      name: 'WrapTag',
      symbol: 'WPT',
      decimals: 18,
    },
    blockExplorerUrls: ['https://avascan.info/blockchain/wraptag'],
  },
  1: {
    rpcUrls: ['https://mainnet.infura.io/v3/9ac74b60c03b42e98148c2fc16f170dc', 'https://eth-rpc.gateway.pokt.network'],
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://etherscan.io'],
  },
  56: {
    rpcUrls: ['https://bsc-dataseed.binance.org', 'https://bscrpc.com'],
    chainId: '0x38',
    chainName: 'BSC Mainnet',
    nativeCurrency: {
      name: 'Binance',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://bscscan.com'],
  },
  42161: {
    rpcUrls: ['https://endpoints.omniatech.io/v1/arbitrum/one/public', 'https://arb1.arbitrum.io/rpc'],
    chainId: '0xA4B1',
    chainName: 'Arbitrum',
    nativeCurrency: {
      name: 'Arbitrum',
      symbol: 'ETH',
      decimals: 18,
      logo: 'https://ipfs.pantograph.app/ipfs/Qme9WH3eNHaKwWSBLGbD3JCU2YeDEjwHL7FookAue8MRxf',
    },
    blockExplorerUrls: ['https://arbiscan.io'],
  },
}

export const CHAIN_ID = {
  BSC: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? 56 : 97,
  ETH: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? 1 : 5,
  AVAX: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? 43114 : 43113,
  POLYGON: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? 137 : 80001,
  WRAPTAG: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? 24052022 : 24052022,
}

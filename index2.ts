import { createSmartAccountClient } from '@alchemy/aa-core';
import { createPublicClient, http, createWalletClient } from 'viem';
import { mainnet } from 'viem/chains';
import { SimpleSmartContractAccount } from '@alchemy/aa-accounts';

// 1. Set up the public client (for reading blockchain data)
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http('https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY'), // Replace with your RPC URL
});

// 2. Set up the signer (e.g., a private key or EOA)
const signer = createWalletClient({
  chain: mainnet,
  transport: http(),
  account: '0xYOUR_PRIVATE_KEY_OR_EOA_ADDRESS', // Replace with your EOA private key or account
});

// 3. Set up the smart account client
const smartAccountClient = createSmartAccountClient({
  chain: mainnet,
  transport: http('https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY'), // Replace with bundler URL
  account: new SimpleSmartContractAccount({
    chain: mainnet,
    owner: signer,
    factoryAddress: '0xYOUR_FACTORY_ADDRESS', // Replace with your account factory address
    entryPointAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789', // ERC-4337 EntryPoint (mainnet)
  }),
});

// 4. Send a transaction
async function sendSmartAccountTransaction() {
  try {
    const txHash = await smartAccountClient.sendTransaction({
      to: '0xRECIPIENT_ADDRESS', // Replace with recipient address
      value: BigInt(1000000000000000), // 0.001 ETH in wei
      data: '0x', // Optional data (e.g., for contract calls)
    });
    console.log(`Transaction sent: ${txHash}`);
    return txHash;
  } catch (error) {
    console.error('Error sending transaction:', error);
    return null;
  }
}

// Execute the transaction
sendSmartAccountTransaction();

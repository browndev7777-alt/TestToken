import { network } from "hardhat";

/**
 * Test script to verify RPC connection before deployment
 * Run with: npx hardhat run scripts/test-rpc.ts --network sepolia
 */
async function main() {
  console.log("Testing Sepolia RPC connection...");
  
  try {
    const { viem } = await network.connect({
      network: "sepolia",
      chainType: "l1",
    });

    const publicClient = await viem.getPublicClient();
    
    console.log("Fetching latest block number...");
    const blockNumber = await publicClient.getBlockNumber();
    console.log(`✓ Successfully connected! Current block: ${blockNumber}`);
    
    console.log("Fetching chain ID...");
    const chainId = await publicClient.getChainId();
    console.log(`✓ Chain ID: ${chainId}`);
    
    console.log("Fetching gas price...");
    const gasPrice = await publicClient.getGasPrice();
    console.log(`✓ Gas price: ${gasPrice} wei`);
    
    const [walletClient] = await viem.getWalletClients();
    if (walletClient) {
      const balance = await publicClient.getBalance({
        address: walletClient.account.address,
      });
      console.log(`✓ Wallet address: ${walletClient.account.address}`);
      console.log(`✓ Balance: ${balance} wei (${Number(balance) / 1e18} ETH)`);
      
      if (balance === 0n) {
        console.warn("\n⚠ WARNING: Your wallet has 0 ETH. You need Sepolia ETH for gas fees!");
        console.warn("Get testnet ETH from: https://sepoliafaucet.com/");
      }
    }
    
    console.log("\n✓ RPC connection is working! You can proceed with deployment.");
  } catch (error: any) {
    console.error("\n✗ RPC connection failed!");
    console.error("Error:", error.message);
    console.error("\nTroubleshooting:");
    console.error("1. Check your SEPOLIA_RPC_URL in .env file");
    console.error("2. Try a different RPC provider (Infura, Alchemy, QuickNode)");
    console.error("3. Check your internet connection");
    console.error("4. Verify the RPC endpoint is not rate-limited");
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


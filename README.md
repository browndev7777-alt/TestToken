# TestToken

An ERC20 token project built with Hardhat, ready for deployment to Ethereum Sepolia Testnet.

## Contract

The `MyToken` contract is a standard ERC20 token implementation using OpenZeppelin's secure contracts:
- **Name**: MyToken
- **Symbol**: MTK
- **Initial Supply**: 1,000,000 tokens (minted to deployer)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A wallet with Sepolia ETH for gas fees
- Sepolia RPC endpoint (Infura, Alchemy, or QuickNode)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Fill in your `.env` file with:
   - `SEPOLIA_RPC_URL`: Your Sepolia RPC endpoint URL
   - `SEPOLIA_PRIVATE_KEY`: Your wallet's private key (without 0x prefix)
   - `ETHERSCAN_API_KEY`: Your Etherscan API key (for contract verification)
   
   **Getting an Etherscan API Key:**
   - Create a free account at [Etherscan](https://etherscan.io/)
   - Go to [API Keys](https://etherscan.io/myapikey)
   - Click "Add" to create a new API key
   - Copy the API key to your `.env` file

## Compilation

Compile the contracts:
```bash
npm run compile
```

## Testing RPC Connection

Before deploying, test your RPC connection:
```bash
npm run test-rpc
```

This will verify:
- RPC endpoint connectivity
- Your wallet balance (you need Sepolia ETH for gas)
- Network configuration

## Deployment

Deploy to Sepolia Testnet:
```bash
npm run deploy:sepolia
```

This will deploy the MyToken contract with an initial supply of 1,000,000 tokens to the deployer address.

## Troubleshooting

### Error 522 (Connection Timeout)

If you get error code 522, it means your RPC endpoint is timing out. Try:

1. **Test your RPC connection first:**
   ```bash
   npm run test-rpc
   ```

2. **Use a different RPC provider:**
   - **Infura**: `https://sepolia.infura.io/v3/YOUR_PROJECT_ID`
   - **Alchemy**: `https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY`
   - **QuickNode**: `https://YOUR_ENDPOINT.quiknode.pro/YOUR_API_KEY/`
   - **Public RPC**: `https://rpc.sepolia.org` (may be rate-limited)

3. **Check your `.env` file:**
   - Ensure `SEPOLIA_RPC_URL` is correct
   - Ensure `SEPOLIA_PRIVATE_KEY` is set (without 0x prefix)
   - No extra spaces or quotes around values

4. **Verify you have Sepolia ETH:**
   - Get testnet ETH from: https://sepoliafaucet.com/
   - Or: https://faucet.quicknode.com/ethereum/sepolia

5. **Check network connectivity:**
   - Try accessing the RPC URL in your browser
   - Check if you're behind a firewall or VPN

## Contract Verification

After deployment, you can verify the contract on Etherscan:
```bash
npm run verify:sepolia <CONTRACT_ADDRESS> <CONSTRUCTOR_ARG1> <CONSTRUCTOR_ARG2> ...
```

For MyToken, the constructor takes one argument (initialSupply):
```bash
npm run verify:sepolia <CONTRACT_ADDRESS> 1000000
```

**Note:** You need an Etherscan API key in your `.env` file. See the Setup section above for instructions on how to get one.

## Network Configuration

The project is configured to deploy to Sepolia Testnet. The network configuration is in `hardhat.config.ts`.

## Security Notes

- **NEVER** commit your `.env` file to version control
- Keep your private keys secure
- Only use testnet private keys for testing
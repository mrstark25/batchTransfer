🚀 Batch Transfer Smart Contract

The Batch Transfer contract allows the contract owner to efficiently transfer ETH and ERC20 tokens to multiple recipients in a single transaction using a deployed smart contract.

⚡️ Features:

✅ Batch ETH Transfers: Send ETH to multiple addresses in a single transaction.

✅ Batch ERC20 Transfers: Transfer ERC20 tokens to multiple addresses using transferFrom.

🔒 Reentrancy Guard: Prevents reentrancy attacks on batch transfers.

👑 Ownership Control: Only the contract owner can initiate batch transfers.

📄 Deployed Contract Information

Network: Ethereum Sepolia Testnet

Batch Transfer Contract Address: 0x2CB3D3fa58f79BaE700d0F73ab87530A4e975c79
Simple ERC20 Token Address: 0xABac82dD88bef207bd176dD696a69068c1401C2F

Required Approvals for ERC20:
The contract uses transferFrom() to transfer ERC20 tokens, so the sender must approve the contract to spend tokens.

📚 How to Use:
1. 📦 Clone the Repository

git clone ```https://github.com/username/batchTransfer.git```

```cd batchTransfer```

2. ⚙️ Set Up the Environment

Create a .env file in the root directory with the following content:

INFURA_API_KEY=your_infura_project_id
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=0x2CB3D3fa58f79BaE700d0F73ab87530A4e975c79

```INFURA_API_KEY:``` Your Infura API key to connect to the Ethereum network.

```PRIVATE_KEY:``` The private key of the wallet that will perform the batch transfers.

```CONTRACT_ADDRESS:``` The address of the deployed BatchTransfer contract.

3. 📥 Install Dependencies

```npm install```

4. 💸 Transfer ETH Using batchTransferETH
Update batchTransfer.js with recipient addresses and amounts.

Run the script:

```node batchTransfer.js```

5. 🎁 Transfer ERC20 Tokens Using batchTransferERC20
Approve the contract to transfer tokens on your behalf.

Run the script with the token address and recipient data:


```node batchTransfer.js```

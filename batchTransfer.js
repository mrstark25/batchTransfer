require("dotenv").config();
const { ethers } = require("ethers");

const providerUrl = `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const tokenAddress = process.env.TOKEN_ADDRESS;
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "successCount",
				"type": "uint256"
			}
		],
		"name": "BatchERC20Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "successCount",
				"type": "uint256"
			}
		],
		"name": "BatchETHTransfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "recipients",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			}
		],
		"name": "batchTransferERC20",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "recipients",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			}
		],
		"name": "batchTransferETH",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const erc20ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)"
];

const provider = new ethers.JsonRpcProvider(providerUrl);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Batch Transfer ETH 
async function batchTransferETH(recipients, amounts) {
  try {
    const totalAmount = amounts.reduce((acc, amount) => acc + BigInt(amount), BigInt(0));
    const tx = await contract.batchTransferETH(recipients, amounts, { value: totalAmount });
    await tx.wait();
    console.log(`ETH batch transfer successful! Tx Hash: ${tx.hash}`);
  } catch (error) {
    console.error(`❌ ETH batch transfer failed:`, error);
  }
}

// Batch Transfer ERC20 
async function batchTransferERC20(recipients, amounts) {
  try {
    const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, wallet);
    
    const totalAmount = amounts.reduce((acc, amount) => acc + BigInt(amount), BigInt(0));
    const approveTx = await tokenContract.approve(contractAddress, totalAmount); // Approval of token
    await approveTx.wait();
    console.log(`Approval successful. Hash: ${approveTx.hash}`);

    const tx = await contract.batchTransferERC20(tokenAddress, recipients, amounts);
    await tx.wait();
    console.log(`ERC20 batch transfer successful! Tx Hash: ${tx.hash}`);
  } catch (error) {
    console.error(`ERC20 batch transfer failed:`, error);
  }
}

// Example to perform batchtransfer
const recipients = [
    "0x224a23e16508A5E603321409bb12dCdDf9E8800C",
    "0x3E189609150f560c32050201E920Ba0B55389574"
  ];

const ethAmounts = [
  ethers.parseEther("0.001"),
  ethers.parseEther("0.002"),
];

const erc20Amounts = [
  ethers.parseUnits("10", 18), 
  ethers.parseUnits("20", 18),
];

// Run the functions
async function main() {
  console.log("Starting batch transfers...");
  await batchTransferETH(recipients, ethAmounts);
  await batchTransferERC20(recipients, erc20Amounts);
}

main().catch(console.error);


// const { ethers } = require("ethers");

// const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/2cb21bfd526740dd9c533a240f71994e");

// const privateKey = "0a5929635d82b5cac0bd11a7981ccdda3e656acba0c9771b3c2a69fee7665f0d";
// const wallet = new ethers.Wallet(privateKey, provider);

// const contractAddress = "0x9B5B9593Dfa2833819CeEd4E96A825B61DcBB9F1";
// const contractABI = [
// 	{
// 		"inputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnableInvalidOwner",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnableUnauthorizedAccount",
// 		"type": "error"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "sender",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "address",
// 				"name": "token",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "totalAmount",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "successCount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "BatchERC20Transfer",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "sender",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "totalAmount",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "successCount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "BatchETHTransfer",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "token",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address[]",
// 				"name": "recipients",
// 				"type": "address[]"
// 			},
// 			{
// 				"internalType": "uint256[]",
// 				"name": "amounts",
// 				"type": "uint256[]"
// 			}
// 		],
// 		"name": "batchTransferERC20",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address[]",
// 				"name": "recipients",
// 				"type": "address[]"
// 			},
// 			{
// 				"internalType": "uint256[]",
// 				"name": "amounts",
// 				"type": "uint256[]"
// 			}
// 		],
// 		"name": "batchTransferETH",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "previousOwner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "newOwner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnershipTransferred",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "renounceOwnership",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "newOwner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "transferOwnership",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"stateMutability": "payable",
// 		"type": "receive"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "owner",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ]

// const batchTransfer = new ethers.Contract(contractAddress, contractABI, wallet);

// async function batchTransferETH(recipients, amounts) {
//   const totalAmount = amounts.reduce((acc, amount) => acc + BigInt(amount), BigInt(0));

//   const tx = await batchTransfer.batchTransferETH(recipients, amounts, {
//     value: totalAmount
//   });

//   console.log(`ETH Transfer Tx Hash: ${tx.hash}`);
//   await tx.wait();
//   console.log("ETH Transfer Successful!");
// }

// async function batchTransferERC20(tokenAddress, recipients, amounts) {
//   const erc20ABI = ["function approve(address spender, uint256 amount) external returns (bool)"];
//   const erc20 = new ethers.Contract(tokenAddress, erc20ABI, wallet);

//   const totalAmount = amounts.reduce((acc, amount) => acc + BigInt(amount), BigInt(0));

//   console.log(`Approving contract to spend ${totalAmount.toString()} tokens...`);
//   const approveTx = await erc20.approve(contractAddress, totalAmount);
//   await approveTx.wait();
//   console.log("Approval successful!");

//   const tx = await batchTransfer.batchTransferERC20(tokenAddress, recipients, amounts);
//   console.log(`ERC20 Transfer Tx Hash: ${tx.hash}`);
//   await tx.wait();
//   console.log("ERC20 Transfer Successful!");
// }

// const recipients = [
//   "0x224a23e16508A5E603321409bb12dCdDf9E8800C",
//   "0x3E189609150f560c32050201E920Ba0B55389574"
// ];
// const ethAmounts = [
//   ethers.parseEther("0.01"), 
//   ethers.parseEther("0.02")  
// ];
// const erc20Amounts = [
//   ethers.parseUnits("100", 18), 
//   ethers.parseUnits("200", 18)
// ];
// const erc20TokenAddress = "0xABac82dD88bef207bd176dD696a69068c1401C2F"; 

// async function main() {
//   console.log("Starting Batch Transfers...");

//   await batchTransferETH(recipients, ethAmounts);

//   await batchTransferERC20(erc20TokenAddress, recipients, erc20Amounts);
// }

// main().catch((error) => {
//   console.error("Error:", error);
// });


// Import ethers.js
require("dotenv").config();
const { ethers } = require("ethers");

// Define constants
// const providerUrl = "https://sepolia.infura.io/v3/2cb21bfd526740dd9c533a240f71994e"; // Change to your RPC provider
// const privateKey = "0a5929635d82b5cac0bd11a7981ccdda3e656acba0c9771b3c2a69fee7665f0d"; // Private key of the deployer/owner
// const contractAddress = "0x2CB3D3fa58f79BaE700d0F73ab87530A4e975c79"; // Address of your deployed contract
// const tokenAddress = "0xABac82dD88bef207bd176dD696a69068c1401C2F"; // Address of your ERC20 token

const providerUrl = `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const tokenAddress = process.env.TOKEN_ADDRESS;
// BatchTransfer contract ABI (replace with your contract's ABI if different)
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

// ERC20 ABI (for approval)
const erc20ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)"
];

// Initialize provider and wallet
const provider = new ethers.JsonRpcProvider(providerUrl);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// === Batch Transfer ETH ===
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

// === Batch Transfer ERC20 ===
async function batchTransferERC20(recipients, amounts) {
  try {
    // Connect to ERC20 token contract
    const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, wallet);
    
    // Approve the contract to spend tokens
    const totalAmount = amounts.reduce((acc, amount) => acc + BigInt(amount), BigInt(0));
    const approveTx = await tokenContract.approve(contractAddress, totalAmount);
    await approveTx.wait();
    console.log(`Approval successful. Hash: ${approveTx.hash}`);

    // Perform batch transfer
    const tx = await contract.batchTransferERC20(tokenAddress, recipients, amounts);
    await tx.wait();
    console.log(`ERC20 batch transfer successful! Tx Hash: ${tx.hash}`);
  } catch (error) {
    console.error(`ERC20 batch transfer failed:`, error);
  }
}

// === Example Usage ===
// List of recipients and amounts
const recipients = [
    "0x224a23e16508A5E603321409bb12dCdDf9E8800C",
    "0x3E189609150f560c32050201E920Ba0B55389574"
  ];

const ethAmounts = [
  ethers.parseEther("0.001"), // Send 0.01 ETH
  ethers.parseEther("0.002"),
];

const erc20Amounts = [
  ethers.parseUnits("10", 18), // Send 10 tokens with 18 decimals
  ethers.parseUnits("20", 18),
];

// Run the functions
async function main() {
  console.log("Starting batch transfers...");
  await batchTransferETH(recipients, ethAmounts);
  await batchTransferERC20(recipients, erc20Amounts);
}

main().catch(console.error);



const contractAddress = "0xC47711d8b4Cba5D9Ccc4e498A204EA53c31779aD";
const abi = [
  { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
  { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" },
  { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "daysFromNow", "type": "uint256" } ], "name": "setExpiry", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" },
  { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" },
  { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }
];

let web3;
let contract;
let account;

async function load() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById("wallet").innerText = account;
    contract = new web3.eth.Contract(abi, contractAddress);
    updateBalance();
  } else {
    alert("Please install MetaMask!");
  }
}

async function updateBalance() {
  const balance = await contract.methods.balanceOf(account).call();
  document.getElementById("balance").innerText = balance / 1e6;
}

async function mintTokens() {
  const to = document.getElementById("mintTo").value;
  const amount = parseFloat(document.getElementById("mintAmount").value);
  if (!web3.utils.isAddress(to)) return alert("Invalid address!");
  if (amount <= 0) return alert("Amount must be greater than 0");
  await contract.methods.mint(to, web3.utils.toBN(amount * 1e6)).send({ from: account });
  updateBalance();
}

async function transferTokens() {
  const to = document.getElementById("transferTo").value;
  const amount = parseFloat(document.getElementById("transferAmount").value);
  if (!web3.utils.isAddress(to)) return alert("Invalid address!");
  if (amount <= 0) return alert("Amount must be greater than 0");
  await contract.methods.transfer(to, web3.utils.toBN(amount * 1e6)).send({ from: account });
  updateBalance();
}

async function setExpiry() {
  const addr = document.getElementById("expiryAccount").value;
  const days = parseInt(document.getElementById("expiryDays").value);
  if (!web3.utils.isAddress(addr)) return alert("Invalid address!");
  if (days <= 0) return alert("Days must be greater than 0");
  await contract.methods.setExpiry(addr, days).send({ from: account });
}

window.addEventListener('load', load);

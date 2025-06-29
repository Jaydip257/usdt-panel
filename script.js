const tokenAddress = "0x8F62f033C1B9e4d9F99Bd2f7595CF102Baa24901";
const tokenABI = [...]; // Insert actual ABI here

let web3, contract, accounts;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    accounts = await web3.eth.getAccounts();
    contract = new web3.eth.Contract(tokenABI, tokenAddress);

    ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: 'USDT',
          decimals: 6,
          image: location.origin + '/logo.png',
        },
      },
    });

    document.getElementById('status').innerText = "✅ Wallet connected: " + accounts[0];
  } else {
    alert("Please install MetaMask!");
  }
}

async function mint() {
  const amount = prompt("Enter amount to mint:");
  if (contract && accounts) {
    await contract.methods.mint(accounts[0], amount).send({ from: accounts[0] });
    alert("Minted!");
  }
}

async function transfer() {
  const to = prompt("Enter recipient address:");
  const amount = prompt("Enter amount to transfer:");
  if (contract && accounts) {
    await contract.methods.transfer(to, amount).send({ from: accounts[0] });
    alert("Transferred!");
  }
}

async function setExpiry() {
  const wallet = prompt("Enter wallet to set expiry:");
  const days = prompt("Enter expiry in days:");
  const expiry = Math.floor(Date.now() / 1000) + (days * 24 * 60 * 60);
  if (contract && accounts) {
    await contract.methods.setExpiry(wallet, expiry).send({ from: accounts[0] });
    alert("Expiry set!");
  }
}

# Fish-Supply-Chain
Track the journey of tuna fish using Ethereum blockchain 

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

Clone the project to local machine.

```bash
git clone https://github.com/nawed1111/Fish-Supply-Chain.git
```

Install node package manager [npm](https://nodejs.org/en/download/).

## Prerequisite

Install truffle globally
```bash
npm install -g truffle ganache-cli
```
Goto cloned directory and run
```bash
npm install
```
Start ganache-cli
```bash
ganache-cli
```

Test using truffle
```bash
truffle test
```

### update the rinkby network details in truffle-config.js
rinkby: {
      provider: () =>
        new HDWalletProvider(
          "Your_wallet_mnemonic",
          "Your_infura_API_URL"
        ),
      network_id: 4,
    }
    
### Migrate to rinkby test network
Run and copy the contract address
```bash
truffle migrate --network rinkby
```
### Update the contract address in ./bridge/gateway.js
const instance = new web3.eth.Contract(
  Gateway.abi,
  "<paste_contract_address_here>"
);

### Update the infura api url in ./bridge/web3.js
const provider = new Web3.providers.HttpProvider(
    "<paste_API_URL_here>"
  );
  
Run and to start the front end
```bash
npm run dev
```

After successfully running locally, you should be able to access the client [localhost:3000](http://127.0.0.1:3000/).

### Snapshots



## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.



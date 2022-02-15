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

Compile using truffle
```bash
sudo truffle compile
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
![image](https://user-images.githubusercontent.com/32324785/148925120-10e99d6c-4b8b-4609-926d-5e99c3b4ff9c.png)
![image](https://user-images.githubusercontent.com/32324785/148925234-069cfb06-401c-4024-91aa-c002bb87b0e1.png)
![image](https://user-images.githubusercontent.com/32324785/148925351-82a460b2-e0c6-4ee7-a5ce-b9e0fb9bf562.png)
![image](https://user-images.githubusercontent.com/32324785/148925544-a64dc136-84e6-43d9-9f4c-ddd03bda9cb9.png)
![image](https://user-images.githubusercontent.com/32324785/148925616-460c68ca-ee37-4b62-aa45-6d0379521fda.png)
![image](https://user-images.githubusercontent.com/32324785/148925721-031a3c60-1117-4307-a1b5-2ca6708f51d1.png)
![image](https://user-images.githubusercontent.com/32324785/148925824-224cd1a9-31f9-4e1a-b50f-f2ff0da2d2c6.png)
![image](https://user-images.githubusercontent.com/32324785/148925954-7a9338e0-7c89-403a-9ee8-8aa706f188a5.png)



## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.



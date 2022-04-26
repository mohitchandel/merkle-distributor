## Merkle smart contract

This Project is deployed on the Rinkeby testnet

Merkle Smart contract address: [0xdCa6a69C65a890BC957c51c801bcA9f0c3Cd8A72](https://rinkeby.etherscan.io/address/0xdCa6a69C65a890BC957c51c801bcA9f0c3Cd8A72)

ERC20 Token (Fresh Token) address: [0x742eFa778858bD02c43E47F8d6D8dB3b3B1F4aea](https://rinkeby.etherscan.io/address/0x742eFa778858bD02c43E47F8d6D8dB3b3B1F4aea)



### Usage
How to clone and run this project
- Clone this repository : git clone https://github.com/mohitchandel/DAO-smart-contract.git
- Installing dependencies : `npm install`
- Compile the smart contracts with Hardhat : `npx hardhat compile`
- Run the tests : `npx hardhat test`
- Deploy contract to network : `npx hardhat run --network rinkeby scripts/deploy.ts`

### About

MerkleDistributor smart contract will be created after the creation of ERC20 token (Fresh Token) because the Merkle Air Drop contract (MerkleDistributor) need parameters of token address and the merkle tree root in its constructor.

`constructor(FreshToken _token, bytes32 _merkleRoot) {}`

Where
- `FreshToken _token` is ERC20 token address
- `bytes32 _merkleRoot` is merkle tree root


### How to claim airdrop

In MerkleDistributor smart contract function `claimAirDrop()` is used to claim airdrop.

this function has following arguments:

- `bytes32[] calldata _merkleProof` : It array of proof of merkle tree transactions.

First the merkle proof will be verified and if merkle proof is correct then the token will be recieved

e.g. Tranx hash -> https://rinkeby.etherscan.io/tx/0xd5befda8bf6bd00d604c3e55fb57f3275fbc8b6811ef08902de442934b7814c0


We can also check if user is able to claim airdrop or not by calling `canClaim(address _address, bytes32[] calldata merkleProof)` function which has two parameters

- `address _address` : address of recipient
- `bytes32[] calldata merkleProof` : It array of proof of merkle tree transactions.

By calling this function we get boolean value in return and we can know that if user is able to claim air drop or not.


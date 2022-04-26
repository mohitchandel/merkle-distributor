## Merkle smart contract

This Project is deployed on the Rinkeby testnet

Merkle Smart contract address: [0x6e3D6afB3D78C72eaA365cFA74e343393053315D](https://rinkeby.etherscan.io/address/0x6e3D6afB3D78C72eaA365cFA74e343393053315D)

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


We can also check if user is able to claim airdrop or not by calling `canClaim(address _address, bytes32[] calldata merkleProof)` function which has two parameters

- `address _address` : address of recipient
- `bytes32[] calldata merkleProof` : It array of proof of merkle tree transactions.

By calling this function we get boolean value in return and we can know that if user is able to claim air drop or not.


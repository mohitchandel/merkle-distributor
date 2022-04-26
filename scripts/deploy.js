// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Deploying fresh token 
  const FreshToken = await ethers.getContractFactory("FreshToken");
  const token = await FreshToken.deploy();
  await token.deployed();

  // deploying merkle contract
  const MerkleDistributor = await ethers.getContractFactory("MerkleDistributor");
  const contract = await MerkleDistributor.deploy(token.address, hexRoot);
  await contract.deployed();

  console.log("contract deployed to:", contract.address);
  console.log("token deployed to:", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

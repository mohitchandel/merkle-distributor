const { expect } = require("chai");
const { ethers } = require("hardhat");

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');


describe("Merkle Air Drop", function () {

  let admin, user, newBee;
  let token;
  let contract;
  let hexProof
  let hexRoot

  beforeEach(async function () {
    // getting address
    [admin, user, newBee] = await ethers.getSigners();

    let whitelistAddresses = [
      admin.address,
      user.address,
      newBee.address
    ];
    
    const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    
    const claimingAddress = leafNodes[1];
    hexProof = merkleTree.getHexProof(claimingAddress);
    hexRoot = "0x" + merkleTree.getRoot().toString('hex');

    // Deploying fresh token 
    const FreshToken = await ethers.getContractFactory("FreshToken");
    token = await FreshToken.deploy();
    await token.deployed();

    // deploying merkle contract
    const MerkleDistributor = await ethers.getContractFactory("MerkleDistributor");
    contract = await MerkleDistributor.deploy(token.address, hexRoot);
    await contract.deployed();

  });

  describe("Fresh token", function(){
    it("should approve token spend", async function () {
      const approveToken = await token.approve(contract.address, ethers.BigNumber.from("100000000000000000000"))
      await approveToken.wait()
      expect(await token.allowance(admin.address, contract.address)).to.equal(ethers.BigNumber.from("100000000000000000000"));
    })
  })

  describe("Merkle Distribution", function () {

    it("should able to claim airdrop", async function () {
      const checkForClaim = await contract.canClaim(user.address, hexProof)
      expect(checkForClaim).to.equal(true);
    })

    it("should not be able to claim airdrop", async function () {
      const checkForClaim = await contract.canClaim(newBee.address, hexProof)
      expect(checkForClaim).to.equal(false);
    })

    it("should claim airdrop", async function () {
      const approveToken = await token.approve(contract.address, ethers.BigNumber.from("1000000000000000000000000000"))
      await approveToken.wait()
  
      const checkForClaim = await contract.claimAirDrop(user.address, hexProof);
      await checkForClaim.wait();

      const userBalance = await token.balanceOf(user.address);
      expect(userBalance).to.equal(ethers.BigNumber.from("10000000000000000000000"));
    })
  })

})

import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { Attention, Certification, Dollar, Product, Quality, Score, Speed } from "../typechain-types";

describe("Take2Save Contracts", function () {
  let owner: HardhatEthersSigner;
  let user1: HardhatEthersSigner;
  let user2: HardhatEthersSigner;
  let dollar: Dollar;
  let speed: Speed;
  let quality: Quality;
  let attention: Attention;
  let product: Product;
  let score: Score;
  let certification: Certification;

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy all contracts
    const Dollar = await ethers.getContractFactory("Dollar");
    dollar = (await Dollar.deploy()) as Dollar;

    const Speed = await ethers.getContractFactory("Speed");
    speed = (await Speed.deploy()) as Speed;

    const Quality = await ethers.getContractFactory("Quality");
    quality = (await Quality.deploy()) as Quality;

    const Attention = await ethers.getContractFactory("Attention");
    attention = (await Attention.deploy()) as Attention;

    const Product = await ethers.getContractFactory("Product");
    product = (await Product.deploy()) as Product;

    const Score = await ethers.getContractFactory("Score");
    score = (await Score.deploy()) as Score;

    const Certification = await ethers.getContractFactory("Certification");
    certification = (await Certification.deploy()) as Certification;

    // Configure relationships
    await dollar.setProductContract(await product.getAddress());
    await product.setDollarContract(await dollar.getAddress());
    await product.setScoreContract(await score.getAddress());

    await score.setProductContract(await product.getAddress());
    await score.setContracts(await speed.getAddress(), await quality.getAddress(), await attention.getAddress());

    // Transfer ownership of token contracts to Score contract
    await speed.transferOwnership(await score.getAddress());
    await quality.transferOwnership(await score.getAddress());
    await attention.transferOwnership(await score.getAddress());

    // Configure certification contract
    await certification.setContracts(
      await speed.getAddress(),
      await quality.getAddress(),
      await attention.getAddress(),
    );
  });

  describe("Dollar Contract", function () {
    it("Should mint initial supply to owner", async function () {
      const ownerBalance = await dollar.balanceOf(owner.address);
      expect(ownerBalance).to.equal(ethers.parseEther("10000"));
    });

    it("Should allow owner to mint additional tokens", async function () {
      await dollar.mint(user1.address, ethers.parseEther("100"));
      const user1Balance = await dollar.balanceOf(user1.address);
      expect(user1Balance).to.equal(ethers.parseEther("100"));
    });
  });

  describe("Product Contract", function () {
    beforeEach(async () => {
      await dollar.mint(user1.address, ethers.parseEther("1000"));
      await dollar.connect(user1).approve(await product.getAddress(), ethers.parseEther("1000"));
    });

    it("Should allow adding new products", async function () {
      const productData = {
        price: 100n,
        quantity: 10n,
        retailAddr: owner.address,
        name: "Test Product",
        image: "test.jpg",
        description: "Test Description",
        used: false,
      };

      await product.addNewProduct(productData);
      const addedProduct = await product.products(0);
      expect(addedProduct.name).to.equal(productData.name);
      expect(addedProduct.price).to.equal(productData.price);
      expect(addedProduct.quantity).to.equal(productData.quantity);
    });

    it("Should allow purchasing products", async function () {
      const productData = {
        price: 100n,
        quantity: 10n,
        retailAddr: owner.address,
        name: "Test Product",
        image: "test.jpg",
        description: "Test Description",
        used: false,
      };

      await product.addNewProduct(productData);
      await product.connect(user1).safeMint(0, 2);

      const updatedProduct = await product.products(0);
      expect(updatedProduct.quantity).to.equal(8n);

      const user1Balance = await product.balanceOf(user1.address);
      expect(user1Balance).to.equal(2n);
    });
  });

  describe("Score Contract", function () {
    beforeEach(async () => {
      await dollar.mint(user1.address, ethers.parseEther("1000"));
      await dollar.connect(user1).approve(await product.getAddress(), ethers.parseEther("1000"));
    });

    it("Should allow scoring purchased products", async function () {
      const productData = {
        price: 100n,
        quantity: 10n,
        retailAddr: owner.address,
        name: "Test Product",
        image: "test.jpg",
        description: "Test Description",
        used: false,
      };

      await product.addNewProduct(productData);
      await product.connect(user1).safeMint(0, 1);

      await score.connect(user1).score(9, 8, 7, 0);

      const tokenData = await product.characteristic(0);
      expect(tokenData.used).to.be.true;

      // Verify tokens were minted to the retailer
      const speedBalance = await speed.balanceOf(owner.address);
      const qualityBalance = await quality.balanceOf(owner.address);
      const attentionBalance = await attention.balanceOf(owner.address);

      expect(speedBalance).to.equal(8n);
      expect(qualityBalance).to.equal(9n);
      expect(attentionBalance).to.equal(7n);
    });
  });

describe("Certification Contract", function () {
beforeEach(async () => {
  [owner, user1, user2] = await ethers.getSigners();

  // Deploy the Certification contract
  const Certification = await ethers.getContractFactory("Certification");
  certification = (await Certification.connect(owner).deploy()) as Certification;

  // Ensure correct ownership
  expect(await certification.owner()).to.equal(owner.address);

  // Set up CIDs for certification kinds
  const cids = {
    qualityCID: "QmQuality",
    attentionCID: "QmAttention",
    speedCID: "QmSpeed",
  };
  await certification.connect(owner).setKind(cids.qualityCID, cids.attentionCID, cids.speedCID);

  // Deploy and configure related token contracts using owner
  const Quality = await ethers.getContractFactory("Quality");
  quality = (await Quality.connect(owner).deploy()) as Quality;
  const Attention = await ethers.getContractFactory("Attention");
  attention = (await Attention.connect(owner).deploy()) as Attention;
  const Speed = await ethers.getContractFactory("Speed");
  speed = (await Speed.connect(owner).deploy()) as Speed;

  // Ensure correct ownership of token contracts
  expect(await quality.owner()).to.equal(owner.address);
  expect(await attention.owner()).to.equal(owner.address);
  expect(await speed.owner()).to.equal(owner.address);

  // Transfer ownership of token contracts to Certification contract
  await quality.connect(owner).transferOwnership(await certification.getAddress());
  await attention.connect(owner).transferOwnership(await certification.getAddress());
  await speed.connect(owner).transferOwnership(await certification.getAddress());

  // Mint tokens to the owner directly from each contract
  await quality.connect(owner).mint(owner.address, 20);
  await attention.connect(owner).mint(owner.address, 20);
  await speed.connect(owner).mint(owner.address, 20);

  // Approve the Certification contract to spend owner's tokens
  await quality.connect(owner).approve(await certification.getAddress(), 20);
  await attention.connect(owner).approve(await certification.getAddress(), 20);
  await speed.connect(owner).approve(await certification.getAddress(), 20);
});


  it("Should allow minting certification NFTs", async function () {
    // Mint a certification NFT
    await certification.connect(owner).safeMint("qualityCID");

    // Verify balance and token URI
    const balance = await certification.balanceOf(owner.address);
    expect(balance).to.equal(1n);

    const tokenURI = await certification.tokenURI(0);
    expect(tokenURI).to.equal("ipfs://QmQuality");
  });

  it("Should require minimum score to mint certification", async function () {
    // Transfer tokens to another user to simulate insufficient balance
    await quality.connect(owner).transfer(user2.address, 15);

    // Attempting to mint certification should fail
    await expect(certification.connect(owner).safeMint("qualityCID")).to.be.revertedWith(
      "ERC20: transfer amount exceeds balance",
    );
  });
});

});

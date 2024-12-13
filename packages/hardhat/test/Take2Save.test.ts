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

    // Deploy all contracts with proper typing
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

    // Set up contract relationships
    await dollar.setProductContract(product.getAddress());
    await product.setDollarContract(dollar.getAddress());
    await product.setScoreContract(score.getAddress());

    await speed.setCertificationContract(certification.getAddress());
    await quality.setCertificationContract(certification.getAddress());
    await attention.setCertificationContract(certification.getAddress());

    await score.setProductContract(await product.getAddress());
    await score.setContracts(await speed.getAddress(), await quality.getAddress(), await attention.getAddress());

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
      // Mint some dollars to user1 for testing
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
      // Add and purchase a product
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

      // Score the product
      await score.connect(user1).score(9, 8, 7, 0);

      // Check if the product is marked as used
      const tokenData = await product.characteristic(0);
      expect(tokenData.used).to.be.true;
    });
  });

  describe("Certification Contract", function () {
    beforeEach(async () => {
      const cids = {
        qualityCID: "QmQuality",
        attentionCID: "QmAttention",
        speedCID: "QmSpeed",
      };

      await certification.setKind(cids.qualityCID, cids.attentionCID, cids.speedCID);

      // Mint some score tokens to user1
      await quality.mint(user1.address, 20);
      await attention.mint(user1.address, 20);
      await speed.mint(user1.address, 20);

      // Approve certification contract
      await quality.connect(user1).approve(await certification.getAddress(), 20);
      await attention.connect(user1).approve(await certification.getAddress(), 20);
      await speed.connect(user1).approve(await certification.getAddress(), 20);
    });

    it("Should allow minting certification NFTs", async function () {
      await certification.connect(user1).safeMint("qualityCID");

      const balance = await certification.balanceOf(user1.address);
      expect(balance).to.equal(1n);

      const tokenURI = await certification.tokenURI(0);
      expect(tokenURI).to.equal("ipfs://QmQuality");
    });

    it("Should require minimum score to mint certification", async function () {
      // Attempt with insufficient tokens should fail
      await quality.connect(user1).transfer(user2.address, 15);
      await expect(certification.connect(user1).safeMint("qualityCID")).to.be.reverted;
    });
  });
});

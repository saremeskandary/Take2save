import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";
import { Dollar, Product, Score, Speed, Quality, Attention, Certification } from "../typechain-types";

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log("\n📡 Deploying contracts...\n");

  try {
    // Deploy token contracts first
    const dollarContract = await deploy("Dollar", {
      from: deployer,
      args: [],
      log: true,
    });

    const speedContract = await deploy("Speed", {
      from: deployer,
      args: [],
      log: true,
    });

    const qualityContract = await deploy("Quality", {
      from: deployer,
      args: [],
      log: true,
    });

    const attentionContract = await deploy("Attention", {
      from: deployer,
      args: [],
      log: true,
    });

    // Deploy main contracts
    const productContract = await deploy("Product", {
      from: deployer,
      args: [],
      log: true,
    });

    const scoreContract = await deploy("Score", {
      from: deployer,
      args: [],
      log: true,
    });

    const certificationContract = await deploy("Certification", {
      from: deployer,
      args: [],
      log: true,
    });

    console.log("\n🔄 Setting up contract relationships...\n");

    // Get contract instances with types
    const Dollar = await hre.ethers.getContract<Dollar>("Dollar", deployer);
    const Product = await hre.ethers.getContract<Product>("Product", deployer);
    const Score = await hre.ethers.getContract<Score>("Score", deployer);
    const Speed = await hre.ethers.getContract<Speed>("Speed", deployer);
    const Quality = await hre.ethers.getContract<Quality>("Quality", deployer);
    const Attention = await hre.ethers.getContract<Attention>("Attention", deployer);
    const Certification = await hre.ethers.getContract<Certification>("Certification", deployer);

    // Configure Product contract
    const tx1 = await Product.setDollarContract(dollarContract.address);
    await tx1.wait();
    const tx2 = await Product.setScoreContract(scoreContract.address);
    await tx2.wait();

    // Configure Score contract
    const tx3 = await Score.setProductContract(productContract.address);
    await tx3.wait();
    const tx4 = await Score.setContracts(speedContract.address, qualityContract.address, attentionContract.address);
    await tx4.wait();

    // Configure Dollar contract
    const tx5 = await Dollar.setProductContract(productContract.address);
    await tx5.wait();

    // Configure rating token contracts
    const tx6 = await Speed.setCertificationContract(certificationContract.address);
    await tx6.wait();
    const tx7 = await Quality.setCertificationContract(certificationContract.address);
    await tx7.wait();
    const tx8 = await Attention.setCertificationContract(certificationContract.address);
    await tx8.wait();

    // Configure Certification contract
    const tx9 = await Certification.setKind(
      "QmQuality", // Example CIDs - replace with actual CIDs
      "QmAttention",
      "QmSpeed",
    );
    await tx9.wait();
    const tx10 = await Certification.setContracts(
      speedContract.address,
      qualityContract.address,
      attentionContract.address,
    );
    await tx10.wait();

    console.log("\n✅ Deployment and configuration complete!\n");

    // Verify contracts if not on a local network
    const chainId = await hre.getChainId();
    if (chainId !== "31337" && chainId !== "1337") {
      console.log("\n📝 Verifying contracts...\n");

      await hre.run("verify:verify", {
        address: dollarContract.address,
        contract: "contracts/Dollar.sol:Dollar",
      });

      // Add verification for other contracts as needed
    }
  } catch (error) {
    console.error("Error during deployment:", error);
    throw error;
  }
};

export default deployContracts;
deployContracts.tags = ["all", "main"];

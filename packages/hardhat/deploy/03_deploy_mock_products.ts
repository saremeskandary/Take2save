// packages/hardhat/deploy/03_deploy_mock_products.ts

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Product } from "../typechain-types";

const mockProducts = [
  {
    name: "Fresh Bakery Box",
    description: "A surprise mix of fresh breads, pastries, and croissants from our bakery",
    image: "https://placehold.co/300x200",
    price: BigInt(1500), // $15.00
    quantity: BigInt(5),
    retailAddr: "", // Will be set to deployer address
    used: false,
  },
  {
    name: "Premium Fruit Box",
    description: "Selection of seasonal fruits close to peak ripeness",
    image: "https://placehold.co/300x200",
    price: BigInt(1000), // $10.00
    quantity: BigInt(3),
    retailAddr: "", // Will be set to deployer address
    used: false,
  },
  {
    name: "Daily Lunch Special",
    description: "Chef's selection of prepared meals from our kitchen",
    image: "https://placehold.co/300x200",
    price: BigInt(800), // $8.00
    quantity: BigInt(10),
    retailAddr: "", // Will be set to deployer address
    used: false,
  },
  {
    name: "Vegetable Medley",
    description: "Mix of fresh vegetables perfect for quick cooking",
    image: "https://placehold.co/300x200",
    price: BigInt(600), // $6.00
    quantity: BigInt(8),
    retailAddr: "", // Will be set to deployer address
    used: false,
  },
  {
    name: "Dairy Bundle",
    description: "Selection of yogurts, milk, and cheese nearing best-by date",
    image: "https://placehold.co/300x200",
    price: BigInt(1200), // $12.00
    quantity: BigInt(4),
    retailAddr: "", // Will be set to deployer address
    used: false,
  },
];

const deployMockProducts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();

  console.log("\n📦 Setting up mock products...\n");

  try {
    const Product = await hre.ethers.getContract<Product>("Product", deployer);

    // Add each mock product
    for (const product of mockProducts) {
      // Set retailAddr to deployer
      product.retailAddr = deployer;

      console.log(`Adding product: ${product.name}`);

      const tx = await Product.addNewProduct(product);
      await tx.wait();
    }

    console.log("\n✅ Mock products added successfully!\n");
  } catch (error) {
    console.error("\n❌ Error adding mock products:", error);
    throw error;
  }
};

export default deployMockProducts;
deployMockProducts.tags = ["mock", "products"];

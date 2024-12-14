// packages/hardhat/scripts/verifyProducts.ts

import { ethers } from "hardhat";
import { Product } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("\n🔍 Verifying mock products...\n");

  try {
    const Product = await ethers.getContract<Product>("Product");

    // Get first product index for the deployer
    const productId = await Product.productsOdOwner(deployer.address, BigInt(0));
    console.log(`Got product ID: ${productId}`);

    // We'll try to fetch products until we get an error or reversion
    let currentId = BigInt(0);
    let foundProducts = 0;

    while (true) {
      try {
        const product = await Product.products(currentId);

        // Only count and display products that belong to our deployer
        if (product.retailAddr.toLowerCase() === deployer.address.toLowerCase()) {
          foundProducts++;
          console.log(`\nProduct ${currentId}:`);
          console.log(`Name: ${product.name}`);
          console.log(`Description: ${product.description}`);
          console.log(`Price: $${Number(product.price) / 100}`);
          console.log(`Quantity: ${product.quantity.toString()}`);
          console.log(`Used: ${product.used}`);
          console.log("------------------------");
        }

        currentId = currentId + BigInt(1);
      } catch (error) {
        // If we get an error, we've probably reached the end of the products
        break;
      }
    }

    console.log(`\nFound ${foundProducts} products for address: ${deployer.address}`);
  } catch (error) {
    console.error("\n❌ Error verifying products:", error);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

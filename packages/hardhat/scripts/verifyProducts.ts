import { ethers } from "hardhat";
import { Product } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("\n🔍 Verifying mock products for all stores...\n");

  try {
    const Product = await ethers.getContract<Product>("Product");

    // Array of store addresses to check
    const storeAddresses = [
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // PÃO DE AÇÚCAR
      "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", // CARREFOUR EXPRESS
      "0x90F79bf6EB2c4f870365E785982E1f101E93b906", // ZONA SUL
      "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", // MUNDIAL
      "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc", // PREZUNIC
    ];

    for (const storeAddress of storeAddresses) {
      console.log(`\nChecking products for store address: ${storeAddress}`);

      let currentId = BigInt(0);
      let foundProducts = 0;

      while (true) {
        try {
          const product = await Product.products(currentId);

          if (product.retailAddr.toLowerCase() === storeAddress.toLowerCase()) {
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
          // Break the loop when we can't find any more products
          break;
        }
      }

      console.log(`Found ${foundProducts} products for store address: ${storeAddress}`);
    }
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

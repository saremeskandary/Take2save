import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Product } from "../typechain-types";

// Mock stores with their corresponding addresses and products
const mockStores = [
  {
    name: "KWIK-E-MART",
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    products: [
      {
        name: "Daily Essentials Pack",
        description: "Includes milk, bread, and eggs for your everyday needs",
        image: "https://placehold.co/300x200",
        price: BigInt(1200), // $12.00
        quantity: BigInt(10),
        used: false,
      },
      {
        name: "Snack Variety Pack",
        description: "A mix of chips, cookies, and candies",
        image: "https://placehold.co/300x200",
        price: BigInt(800), // $8.00
        quantity: BigInt(20),
        used: false,
      },
    ],
  },
  {
    name: "Pizza Palace",
    address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    products: [
      {
        name: "Pepperoni Pizza",
        description: "Classic pepperoni pizza with a crispy crust",
        image: "https://placehold.co/300x200",
        price: BigInt(1500), // $15.00
        quantity: BigInt(5),
        used: false,
      },
      {
        name: "Garlic Bread Sticks",
        description: "Warm and crispy garlic bread sticks with marinara dip",
        image: "https://placehold.co/300x200",
        price: BigInt(500), // $5.00
        quantity: BigInt(10),
        used: false,
      },
    ],
  },
  {
    name: "Healthy Pharmacy",
    address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    products: [
      {
        name: "Vitamin C Tablets",
        description: "Boost your immunity with 500mg Vitamin C tablets",
        image: "https://placehold.co/300x200",
        price: BigInt(2000), // $20.00
        quantity: BigInt(30),
        used: false,
      },
      {
        name: "First Aid Kit",
        description: "Complete first aid kit for home and travel use",
        image: "https://placehold.co/300x200",
        price: BigInt(2500), // $25.00
        quantity: BigInt(15),
        used: false,
      },
    ],
  },
  {
    name: "Fashion Forward",
    address: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    products: [
      {
        name: "Cotton T-Shirt",
        description: "Comfortable and stylish cotton t-shirt",
        image: "https://placehold.co/300x200",
        price: BigInt(1800), // $18.00
        quantity: BigInt(25),
        used: false,
      },
      {
        name: "Denim Jeans",
        description: "Classic fit denim jeans for everyday wear",
        image: "https://placehold.co/300x200",
        price: BigInt(4500), // $45.00
        quantity: BigInt(10),
        used: false,
      },
    ],
  },
  {
    name: "Gadget World",
    address: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    products: [
      {
        name: "Wireless Earbuds",
        description: "High-quality sound with long battery life",
        image: "https://placehold.co/300x200",
        price: BigInt(7000), // $70.00
        quantity: BigInt(5),
        used: false,
      },
      {
        name: "Smartphone Stand",
        description: "Adjustable stand for phones and tablets",
        image: "https://placehold.co/300x200",
        price: BigInt(1500), // $15.00
        quantity: BigInt(20),
        used: false,
      },
    ],
  },
];


const deployMockProducts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers } = hre;
  console.log("\n📦 Setting up mock stores and products...\n");

  try {
    const Product = await ethers.getContract<Product>("Product");

    for (const store of mockStores) {
      console.log(`Setting up store: ${store.name}`);

      // Set up the store's products
      for (const product of store.products) {
        const productWithAddress = {
          ...product,
          retailAddr: store.address,
        };

        console.log(`Adding product: ${product.name}`);
        const tx = await Product.addNewProduct(productWithAddress);
        await tx.wait();
      }
    }

    console.log("\n✅ Mock stores and products added successfully!\n");
  } catch (error) {
    console.error("\n❌ Error adding mock stores and products:", error);
    throw error;
  }
};

export default deployMockProducts;
deployMockProducts.tags = ["mock", "products"];

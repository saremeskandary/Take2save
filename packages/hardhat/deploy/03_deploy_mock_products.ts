import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Product } from "../typechain-types";

// Mock stores with their corresponding addresses and products
const mockStores = [
  {
    name: "PÃO DE AÇÚCAR",
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    products: [
      {
        name: "Fresh Bakery Box",
        description: "A surprise mix of fresh breads, pastries, and croissants from our bakery",
        image: "https://placehold.co/300x200",
        price: BigInt(1500), // $15.00
        quantity: BigInt(5),
        used: false,
      },
      {
        name: "Premium Fruit Box",
        description: "Selection of seasonal fruits close to peak ripeness",
        image: "https://placehold.co/300x200",
        price: BigInt(1000), // $10.00
        quantity: BigInt(3),
        used: false,
      },
    ],
  },
  {
    name: "CARREFOUR EXPRESS",
    address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    products: [
      {
        name: "Daily Lunch Special",
        description: "Chef's selection of prepared meals from our kitchen",
        image: "https://placehold.co/300x200",
        price: BigInt(800), // $8.00
        quantity: BigInt(10),
        used: false,
      },
      {
        name: "Vegetable Medley",
        description: "Mix of fresh vegetables perfect for quick cooking",
        image: "https://placehold.co/300x200",
        price: BigInt(600), // $6.00
        quantity: BigInt(8),
        used: false,
      },
    ],
  },
  {
    name: "ZONA SUL",
    address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    products: [
      {
        name: "Dairy Bundle",
        description: "Selection of yogurts, milk, and cheese nearing best-by date",
        image: "https://placehold.co/300x200",
        price: BigInt(1200), // $12.00
        quantity: BigInt(4),
        used: false,
      },
      {
        name: "Organic Snack Box",
        description: "Assortment of organic snacks and treats",
        image: "https://placehold.co/300x200",
        price: BigInt(900), // $9.00
        quantity: BigInt(6),
        used: false,
      },
    ],
  },
  {
    name: "MUNDIAL",
    address: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    products: [
      {
        name: "Breakfast Essentials",
        description: "Complete breakfast package with bread, eggs, and juice",
        image: "https://placehold.co/300x200",
        price: BigInt(1100), // $11.00
        quantity: BigInt(5),
        used: false,
      },
      {
        name: "Deli Selection",
        description: "Variety of deli meats and cheeses near expiration",
        image: "https://placehold.co/300x200",
        price: BigInt(1300), // $13.00
        quantity: BigInt(4),
        used: false,
      },
    ],
  },
  {
    name: "PREZUNIC",
    address: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    products: [
      {
        name: "Pantry Staples",
        description: "Essential pantry items bundled at a discount",
        image: "https://placehold.co/300x200",
        price: BigInt(2000), // $20.00
        quantity: BigInt(3),
        used: false,
      },
      {
        name: "Fresh Fish Box",
        description: "Today's catch at a special price",
        image: "https://placehold.co/300x200",
        price: BigInt(1600), // $16.00
        quantity: BigInt(5),
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

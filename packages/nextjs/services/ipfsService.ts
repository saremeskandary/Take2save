import { Store } from "../schemas/storeSchema";
import axios from "axios";


const ALCHEMY_IPFS_URL = `https://ipfs-gateway.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const CID = "<YOUR_IPFS_CID>"; // Replace with your CID

export const fetchStoresFromIPFS = async () => {
  const response = await axios.get(`${ALCHEMY_IPFS_URL}/ipfs/${CID}`);
  return response.data;
};

export const uploadStoreToIPFS = async (store: Store): Promise<string> => {
  try {
    const response = await axios.post(`${ALCHEMY_IPFS_URL}/api/v0/add`, store, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Return the CID of the uploaded file
    return response.data.Hash;
  } catch (error) {
    console.error("Error uploading store to IPFS:", error);
    throw new Error("Failed to upload store to IPFS.");
  }
};
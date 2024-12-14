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
    return response.data.Hash;
  } catch (error) {
    console.error("Error uploading store to IPFS:", error);
    throw new Error("Failed to upload store to IPFS.");
  }
};

export const uploadImageToIPFS = async (file: File): Promise<string> => {
  try {
    // Create form data
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${ALCHEMY_IPFS_URL}/api/v0/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Return the IPFS URL
    return `${ALCHEMY_IPFS_URL}/ipfs/${response.data.Hash}`;
  } catch (error) {
    console.error("Error uploading image to IPFS:", error);
    throw new Error("Failed to upload image to IPFS.");
  }
};

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, Save, X } from "lucide-react";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { uploadImageToIPFS } from "~~/services/ipfsService";

interface AddProductFormData {
  name: string;
  description: string;
  image: string;
  price: string;
  quantity: string;
  category: string;
  expirationDate: string;
  originalPrice: string;
}

const initialFormData: AddProductFormData = {
  name: "",
  description: "",
  image: "",
  price: "",
  quantity: "",
  category: "",
  expirationDate: "",
  originalPrice: "",
};

const CATEGORIES = ["Bread & Pastries", "Produce", "Dairy", "Meat", "Prepared Meals", "Other"];

export default function AddProductPage() {
  const router = useRouter();
  const { address } = useAccount();
  const [formData, setFormData] = useState<AddProductFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [formErrors, setFormErrors] = useState<Partial<AddProductFormData>>({});

  const { writeContractAsync } = useScaffoldWriteContract("Product");

  // Image preview
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const validateForm = (): boolean => {
    const errors: Partial<AddProductFormData> = {};

    if (formData.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (formData.description.length < 10) {
      errors.description = "Description must be at least 10 characters";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      errors.price = "Price must be greater than 0";
    }

    if (!formData.originalPrice || parseFloat(formData.originalPrice) <= parseFloat(formData.price)) {
      errors.originalPrice = "Original price must be greater than discounted price";
    }

    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      errors.quantity = "Quantity must be greater than 0";
    }

    if (!formData.expirationDate) {
      errors.expirationDate = "Expiration date is required";
    } else {
      const expirationDate = new Date(formData.expirationDate);
      const now = new Date();
      if (expirationDate <= now) {
        errors.expirationDate = "Expiration date must be in the future";
      }
    }

    if (!imageFile && !formData.image) {
      errors.image = "Image is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      // Show upload progress notification
      const loadingId = notification.loading("Uploading image to IPFS...");

      // Upload to IPFS using Alchemy
      const ipfsUrl = await uploadImageToIPFS(file);

      // Remove loading notification
      notification.remove(loadingId);

      // Show success notification
      notification.success("Image uploaded successfully!");

      return ipfsUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      notification.error("Failed to upload image. Please try again.");
      throw error;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (formErrors[name as keyof AddProductFormData]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        notification.error("Image must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        notification.error("Please upload an image file");
        return;
      }
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      notification.error("Please fix the errors in the form");
      return;
    }

    if (!address) {
      notification.error("Please connect your wallet");
      return;
    }

    try {
      setIsSubmitting(true);

      // Upload image if exists
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
      }

      const priceInCents = BigInt(Math.floor(parseFloat(formData.price) * 100));
      const quantityBigInt = BigInt(formData.quantity);

      const productStruct = {
        price: priceInCents,
        quantity: quantityBigInt,
        retailAddr: address,
        name: formData.name,
        image: imageUrl,
        description: formData.description,
        used: false,
      };

      const tx = await writeContractAsync({
        functionName: "addNewProduct",
        args: [productStruct],
      });

      notification.success(
        <div className="flex flex-col">
          <span>Product added successfully!</span>
          <span className="text-sm">Transaction: {tx}</span>
        </div>,
      );

      router.push("/stores");
    } catch (error: any) {
      console.error("Error adding product:", error);
      notification.error(error?.message || "Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 pt-8 sm:pt-16">
      <div className="bg-base-100 rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Image</span>
            </label>
            <div className="flex flex-col items-center gap-4">
              {previewUrl ? (
                <div className="relative">
                  <img src={previewUrl} alt="Preview" className="w-full max-w-xs h-48 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setPreviewUrl("");
                    }}
                    className="btn btn-circle btn-sm absolute top-2 right-2 bg-base-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <label className="w-full max-w-xs h-48 flex flex-col items-center justify-center border-2 border-dashed border-base-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <ImagePlus className="w-12 h-12 text-base-300" />
                    <span className="mt-2 text-sm text-base-content/70">Click to upload image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                  {formErrors.image && <span className="text-error text-sm mt-1">{formErrors.image}</span>}
                </div>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className={`input input-bordered w-full ${formErrors.name ? "input-error" : ""}`}
              required
            />
            {formErrors.name && <span className="text-error text-sm mt-1">{formErrors.name}</span>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select category</option>
              {CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className={`textarea textarea-bordered h-24 ${formErrors.description ? "textarea-error" : ""}`}
              required
            />
            {formErrors.description && <span className="text-error text-sm mt-1">{formErrors.description}</span>}
          </div>

          {/* Pricing and Inventory */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Original Price (USD)</span>
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={`input input-bordered ${formErrors.originalPrice ? "input-error" : ""}`}
                required
              />
              {formErrors.originalPrice && <span className="text-error text-sm mt-1">{formErrors.originalPrice}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Discounted Price (USD)</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={`input input-bordered ${formErrors.price ? "input-error" : ""}`}
                required
              />
              {formErrors.price && <span className="text-error text-sm mt-1">{formErrors.price}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="0"
                min="1"
                className={`input input-bordered ${formErrors.quantity ? "input-error" : ""}`}
                required
              />
              {formErrors.quantity && <span className="text-error text-sm mt-1">{formErrors.quantity}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Expiration Date</span>
              </label>
              <input
                type="datetime-local"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                className={`input input-bordered ${formErrors.expirationDate ? "input-error" : ""}`}
                required
              />
              {formErrors.expirationDate && (
                <span className="text-error text-sm mt-1">{formErrors.expirationDate}</span>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-outline flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Adding Product...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Add Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { storeSchema } from "../schemas/storeSchema";
import { z } from "zod";
import { uploadStoreToIPFS } from "~~/services/ipfsService";

const AddStoreForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    image: "",
    rating: "",
    reviews: "",
    distance: "",
    address: "",
    availableUntil: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validate the input using Zod
    try {
      const validatedData = storeSchema.parse({
        id: Date.now().toString(),
        name: formValues.name,
        image: formValues.image,
        rating: parseFloat(formValues.rating),
        reviews: parseInt(formValues.reviews),
        distance: formValues.distance,
        address: formValues.address,
        availableUntil: formValues.availableUntil,
      });

      setIsSubmitting(true);

      // Upload the validated data to IPFS
      const cid = await uploadStoreToIPFS(validatedData);

      setSuccessMessage(`Store added successfully! CID: ${cid}`);
      setFormValues({
        name: "",
        image: "",
        rating: "",
        reviews: "",
        distance: "",
        address: "",
        availableUntil: "",
      });
    } catch (err: any) {
      if (err.errors) {
        setError("Validation failed: " + err.errors[0].message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Store</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formValues.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input type="text" id="image" name="image" value={formValues.image} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formValues.rating}
            step="0.1"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="reviews">Reviews:</label>
          <input
            type="number"
            id="reviews"
            name="reviews"
            value={formValues.reviews}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="distance">Distance:</label>
          <input
            type="text"
            id="distance"
            name="distance"
            value={formValues.distance}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formValues.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="availableUntil">Available Until:</label>
          <input
            type="time"
            id="availableUntil"
            name="availableUntil"
            value={formValues.availableUntil}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Add Store"}
        </button>
      </form>
    </div>
  );
};

export default AddStoreForm;

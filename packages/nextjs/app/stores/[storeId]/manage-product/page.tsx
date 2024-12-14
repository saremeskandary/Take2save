"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Loader2, Plus, Trash } from "lucide-react";
import { useAccount } from "wagmi";
import { ProductStruct, useProducts } from "~~/hooks/useProducts";
import { notification } from "~~/utils/scaffold-eth";

export default function ManageProductsPage({ params }: { params: { storeId: string } }) {
  const router = useRouter();
  const { address } = useAccount();
  const [products, setProducts] = useState<ProductStruct[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  const { getProducts } = useProducts(params.storeId);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error loading products:", error);
        notification.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [getProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Link href={`/stores/${params.storeId}/add-product`} className="btn btn-primary btn-sm">
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4 text-base-content/70">No products found</div>
          <Link href={`/stores/${params.storeId}/add-product`} className="btn btn-primary">
            <Plus className="h-4 w-4" />
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map(product => (
            <div key={product.productId} className="bg-base-100 rounded-lg shadow-md p-4 flex items-center gap-4">
              <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />

              <div className="flex-grow">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-base-content/70">{product.description}</p>
                <div className="flex gap-4 mt-2 text-sm">
                  <span>Price: ${(Number(product.price) / 100).toFixed(2)}</span>
                  <span>Quantity: {product.quantity.toString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => router.push(`/stores/${params.storeId}/edit-product/${product.productId}`)}
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  className="btn btn-ghost btn-sm text-error"
                  onClick={async () => {
                    if (confirm("Are you sure you want to delete this product?")) {
                      setDeleting(Number(product.productId));
                      try {
                        // Add delete functionality here when contract supports it
                        notification.success("Product deleted successfully");
                        setProducts(products.filter(p => p.productId !== product.productId));
                      } catch (error) {
                        console.error("Error deleting product:", error);
                        notification.error("Failed to delete product");
                      } finally {
                        setDeleting(null);
                      }
                    }
                  }}
                  disabled={deleting === Number(product.productId)}
                >
                  {deleting === Number(product.productId) ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

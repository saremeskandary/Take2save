import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function StoreDetailError() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-sm mx-auto">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Store Not Found</h2>
        <p className="text-gray-600 mb-6">
          We couldn't find the store you're looking for. It may have been removed or the link might be incorrect.
        </p>
        <div className="space-y-2">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full border border-orange-500 text-orange-500 px-6 py-2 rounded-full hover:bg-orange-50 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

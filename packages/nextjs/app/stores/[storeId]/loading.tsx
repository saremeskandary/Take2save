export default function StoreDetailLoading() {
  return (
    <div className="max-w-2xl mx-auto animate-pulse">
      {/* Header Image Skeleton */}
      <div className="h-64 bg-gray-200 mb-4" />

      {/* Store Info Skeletons */}
      <div className="px-4">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />

        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />

        <div className="h-4 bg-gray-200 rounded w-2/4 mb-6" />

        <div className="h-4 bg-gray-200 rounded w-1/3 mb-8" />

        {/* Bags Skeleton */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />

          {[1, 2, 3].map(i => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-24" />
                  <div className="h-4 bg-gray-200 rounded w-40" />
                </div>
                <div className="h-5 bg-gray-200 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

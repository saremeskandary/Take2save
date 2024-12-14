const StoreSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="h-3 bg-gray-200 rounded w-1/4 mb-4" />
      <div className="h-3 bg-gray-200 rounded w-2/4 mb-4" />
      <div className="flex justify-between">
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  </div>
);

export default function StoreLoading() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <div className="h-10 bg-gray-200 rounded-full w-full animate-pulse" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <StoreSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

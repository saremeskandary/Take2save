// app/stores/[storeId]/layout.tsx
export default function StoreDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Add any store-detail specific layout elements here */}
      {children}
    </div>
  );
}

export default function ProductSkeleton() {
  return (
    <div className="bg-white border border-stone-100 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-stone-200 w-full"></div>
      <div className="p-4 space-y-3">
          <div className="h-6 bg-stone-200 rounded w-3/4"></div>
          <div className="h-4 bg-stone-100 rounded w-1/4"></div>
      </div>
    </div>
  );
}
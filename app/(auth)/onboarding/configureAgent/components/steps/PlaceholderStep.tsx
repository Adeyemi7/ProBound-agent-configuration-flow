export default function PlaceholderStep({ title }: { title: string }) {
  return (
    <div className="animate-in fade-in">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-gray-400 mb-8">
        Configure {title.toLowerCase()} settings
      </p>
      <div className="h-64 bg-gray-50 rounded-xl" />
    </div>
  );
}

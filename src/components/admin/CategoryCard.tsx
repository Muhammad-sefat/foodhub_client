export default function CategoryCard({ name }: { name: string }) {
  return (
    <div className="bg-white border rounded-lg p-4 flex justify-between">
      <p className="font-medium">{name}</p>
      <button className="text-sm text-red-500 hover:underline">Delete</button>
    </div>
  );
}

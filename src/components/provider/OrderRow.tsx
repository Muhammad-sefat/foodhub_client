export default function OrderRow({
  id,
  customer,
  total,
  status,
}: {
  id: string;
  customer: string;
  total: number;
  status: string;
}) {
  return (
    <tr className="border-b">
      <td className="p-2">{id}</td>
      <td>{customer}</td>
      <td>${total}</td>
      <td>
        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
          {status}
        </span>
      </td>
      <td>
        <select className="border rounded px-2 py-1 text-sm">
          <option>PLACED</option>
          <option>PREPARING</option>
          <option>READY</option>
          <option>DELIVERED</option>
        </select>
      </td>
    </tr>
  );
}

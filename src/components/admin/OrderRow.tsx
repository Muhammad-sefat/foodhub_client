export default function AdminOrderRow({
  id,
  customer,
  provider,
  total,
  status,
}: {
  id: string;
  customer: string;
  provider: string;
  total: number;
  status: string;
}) {
  return (
    <tr className="border-b">
      <td className="py-2">{id}</td>
      <td>{customer}</td>
      <td>{provider}</td>
      <td>${total}</td>
      <td>{status}</td>
    </tr>
  );
}

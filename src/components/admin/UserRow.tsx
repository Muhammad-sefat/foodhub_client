export default function UserRow({
  name,
  email,
  role,
  status,
}: {
  name: string;
  email: string;
  role: string;
  status: string;
}) {
  return (
    <tr className="border-b">
      <td className="py-2">{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>
        <span
          className={`px-2 py-1 text-xs rounded ${
            status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </td>
      <td>
        <button className="text-xs text-green-600 hover:underline">
          Toggle Status
        </button>
      </td>
    </tr>
  );
}

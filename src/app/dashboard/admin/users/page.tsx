import UserRow from "@/components/admin/UserRow";

const users = [
  {
    name: "Sefat",
    email: "sefat@email.com",
    role: "CUSTOMER",
    status: "ACTIVE",
  },
  {
    name: "Pizza Palace",
    email: "pizza@foodhub.com",
    role: "PROVIDER",
    status: "ACTIVE",
  },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Users</h2>

      <div className="overflow-x-auto bg-white border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-2">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, i) => (
              <UserRow key={i} {...user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

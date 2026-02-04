/* eslint-disable @typescript-eslint/no-explicit-any */
import UserRow from "@/components/admin/UserRow";
import { AdminService } from "@/services/admin.service";

export default async function AdminUsersPage() {
  const users = await AdminService.getAllUsers();

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
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user: any) => <UserRow key={user.id} {...user} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

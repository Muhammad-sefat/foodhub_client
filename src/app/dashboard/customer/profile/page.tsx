export default function ProfilePage() {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold text-center">My Profile</h2>

      <div className="bg-white border rounded-lg p-4 space-y-3">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">Muhammad Sefat</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">sefat@gmail.com</p>
        </div>

        <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

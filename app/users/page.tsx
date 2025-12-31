import UserTables from "@/components/UserTables";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <UserTables />
    </ProtectedRoute>
  );
}

import ProductGrid from "@/components/ProductGrid";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminProducts() {
  return (
    <ProtectedRoute>
      <ProductGrid />
    </ProtectedRoute>
  );
}


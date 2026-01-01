export default function ProductDetail({ params }: { params: { id: string } }) {
  return (
    <div style={{ padding: 20, background: "#0f0f23", minHeight: "100vh", color: "white" }}>
      <h1 style={{ borderLeft: "4px solid #10b981", paddingLeft: 16 }}>
        Product #{params.id}
      </h1>
      <p>Product details page (Working!)</p>
    </div>
  );
}

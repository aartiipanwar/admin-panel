export default function UserDetail({ params }: { params: { id: string } }) {
  return (
    <div style={{ padding: 20, background: "#0f0f23", minHeight: "100vh", color: "white" }}>
      <h1 style={{ borderLeft: "4px solid #3b82f6", paddingLeft: 16 }}>
        User #{params.id}
      </h1>
      <p>User profile page (Working!)</p>
    </div>
  );
}

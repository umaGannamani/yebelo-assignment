export default function Card({ title, value }) {
  return (
    <div style={{
      padding: "20px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h4>{title}</h4>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

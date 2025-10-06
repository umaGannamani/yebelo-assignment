import { FaTachometerAlt, FaEnvelope } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div style={{ width: "220px", background: "#2f3640", color: "#fff", padding: "20px" }}>
      <h2>Dashboard</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ margin: "20px 0", display: "flex", alignItems: "center" }}>
          <FaTachometerAlt /> <span style={{ marginLeft: "10px" }}>Home</span>
        </li>
        <li style={{ margin: "20px 0", display: "flex", alignItems: "center" }}>
          <FaEnvelope /> <span style={{ marginLeft: "10px" }}>Messages</span>
        </li>
      </ul>
    </div>
  );
}

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import axios from "axios";

export default function Home() {
  const [messages, setMessages] = useState(0);

  useEffect(() => {
    // Example: fetch message count from your bridge server
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/messages-count");
        setMessages(res.data.count);
      } catch (err) {
        console.log("Error fetching messages:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Navbar />
        <div className="cards">
          <Card title="Messages" value={messages} />
          <Card title="Users" value={12} />
          <Card title="Tasks" value={5} />
          <Card title="Alerts" value={2} />
        </div>
      </div>
    </div>
  );
}

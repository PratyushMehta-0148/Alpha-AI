import React from "react";
import Trade from "./components/Trade";

function App() {
  return (
    <div style={{ fontFamily: "Segoe UI", backgroundColor: "#f4f6f9", minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>📈 CoinDCX Trading Platform</h1>
      <Trade />
    </div>
  );
}

export default App;

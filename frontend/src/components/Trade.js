import React, { useState } from "react";
import axios from "axios";

function Trade() {
  const [market, setMarket] = useState("BTCINR");
  const [quantity, setQuantity] = useState(0);
  const [side, setSide] = useState("buy");
  const [orderType, setOrderType] = useState("market");
  const [response, setResponse] = useState(null);

  const handleTrade = async () => {
    try {
      const orderData = {
        market,
        side,
        order_type: orderType,
        quantity: parseFloat(quantity),
      };

      const res = await axios.post("/place-order", orderData);

      if (res?.data) {
        setResponse(res.data);
        alert("✅ Trade executed successfully!");
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      alert("❌ Trade failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f4f7fb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Segoe UI, sans-serif",
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "500px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img src="/chart-icon.png" alt="logo" style={{ width: "40px" }} />
          <h2 style={{ color: "#2c3e50", marginTop: "10px" }}>CoinDCX Trading Platform</h2>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Market Pair</label>
          <input
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            placeholder="e.g., BTCINR"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Amount"
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <div style={{ flex: 1 }}>
            <label>Side</label>
            <select value={side} onChange={(e) => setSide(e.target.value)} style={inputStyle}>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label>Order Type</label>
            <select value={orderType} onChange={(e) => setOrderType(e.target.value)} style={inputStyle}>
              <option value="market">Market</option>
              <option value="limit">Limit</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleTrade}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2c7be5",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Execute Trade
        </button>

        {response && (
          <div style={{
            marginTop: "20px",
            backgroundColor: "#f1f5f9",
            padding: "15px",
            borderRadius: "10px",
            fontSize: "14px",
            overflowX: "auto",
          }}>
            <h4>✅ Trade Response:</h4>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  marginTop: "5px",
  fontSize: "15px"
};

export default Trade;

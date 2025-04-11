import React, { useState } from "react";
import axios from "axios";

function Trade() {
  const [market, setMarket] = useState("BTCINR");
  const [quantity, setQuantity] = useState(0);
  const [side, setSide] = useState("buy");
  const [response, setResponse] = useState(null);

  const handleTrade = async () => {
    try {
      const orderData = {
        market: market,
        side: side,
        order_type: "market_order",
        quantity: parseFloat(quantity),
      };

      const response = await axios.post("http://localhost:5000/place-order", orderData);

      if (response && response.data) {
        console.log("Trade successful:", response.data);
        setResponse(response.data);
        alert("Trade executed successfully!");
      } else {
        console.warn("Unexpected response format:", response);
        alert("Something went wrong, no data returned.");
      }
    } catch (error) {
      console.error("Trade error:", error);
      alert("Trade failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>CoinDCX Trading Panel</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>Market Pair: </label>
        <input
          value={market}
          onChange={(e) => setMarket(e.target.value)}
          placeholder="e.g. BTCINR"
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Quantity: </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Amount to buy/sell"
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Side: </label>
        <select value={side} onChange={(e) => setSide(e.target.value)}>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>
      <button onClick={handleTrade}>Execute Trade</button>

      {response && (
        <div style={{ marginTop: "20px", background: "#f5f5f5", padding: "10px" }}>
          <h3>Trade Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Trade;

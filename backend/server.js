const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files like trade.html, CSS, JS, images
app.use(express.static(path.join(__dirname, "public")));

const baseURL = "https://api.coindcx.com";

// Util function to generate headers
function getAuthHeaders(payload) {
  const body = JSON.stringify(payload);
  const signature = crypto
    .createHmac("sha256", process.env.COINDCX_SECRET)
    .update(body)
    .digest("hex");

  return {
    "X-AUTH-APIKEY": process.env.COINDCX_API_KEY,
    "X-AUTH-SIGNATURE": signature,
    "Content-Type": "application/json",
  };
}

// Route to handle placing an order
app.post("/place-order", async (req, res) => {
  try {
    const { market, side, order_type, quantity } = req.body;

    if (!market || !side || !order_type || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const payload = {
      market,
      side,
      order_type,
      quantity,
      timestamp: Date.now(),
    };

    const headers = getAuthHeaders(payload);

    const result = await axios.post(
      `${baseURL}/exchange/v1/orders/create`,
      payload,
      { headers }
    );

    res.json(result.data);
  } catch (err) {
    console.error("❌ Error placing order:", err.message || err);
    if (err.response) {
      res
        .status(err.response.status)
        .json({ message: "Trade failed", error: err.response.data });
    } else {
      res.status(500).json({ message: "Network Error", error: err.message });
    }
  }
});

// Default route: Serve the trade.html page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "trade.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

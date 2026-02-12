// PaymentPage.jsx
import React, { useState } from "react";
import axios from "axios";

const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Razorpay SDK failed to load."));
    document.body.appendChild(script);
  });
};

export default function PaymentPage() {
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({ name: "" });
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount || !mode || (mode === "upi" && !upiId) || (mode === "card" && !cardDetails.name)) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      await loadRazorpayScript();

      const resp = await axios.post("http://localhost:4000/api/create-order", {
        amount: Math.round(Number(amount) * 100),
        currency: "INR",
      });

      const { order, keyId } = resp.data;

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "My Company",
        description: "Custom Payment Page",
        order_id: order.id,
        handler: function (response) {
          axios.post("/api/verify-payment", response).then((res) => {
            if (res.data.ok) alert("Payment Successful ✅");
            else alert("Payment Verification Failed ❌");
          });
        },
        prefill:
          mode === "upi"
            ? { method: "upi", vpa: upiId }
            : { name: cardDetails.name, email: "", contact: "" },
        theme: { color: "#8B5CF6" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment could not be started.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50 p-6 animate-fadeIn">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Final Step: Payment
        </h2>
        <p className="text-center text-gray-500 mb-8">Securely complete your transaction.</p>

        {/* Amount */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 bg-gray-100 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
            placeholder="Enter amount"
          />
        </div>

        {/* Mode of Payment */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Mode of Payment</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setMode("upi")}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition ${
                mode === "upi"
                  ? "bg-purple-100 border-purple-500 text-purple-700"
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              UPI
            </button>
            <button
              onClick={() => setMode("card")}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition ${
                mode === "card"
                  ? "bg-purple-100 border-purple-500 text-purple-700"
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              Card
            </button>
          </div>
        </div>

        {/* UPI Details */}
        {mode === "upi" && (
          <div className="mb-6 animate-fadeIn">
            <label className="block text-sm font-medium text-gray-600 mb-2">UPI ID</label>
            <input
              type="text"
              placeholder="example@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
            />
          </div>
        )}

        {/* Card Details */}
        {mode === "card" && (
          <div className="mb-6 animate-fadeIn">
            <label className="block text-sm font-medium text-gray-600 mb-2">Cardholder Name</label>
            <input
              type="text"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              className="w-full p-3 bg-gray-100 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
              placeholder="Name as it appears on card"
            />
          </div>
        )}

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
        >
          {loading ? "Processing..." : `Pay ₹${amount || 0}`}
        </button>
      </div>
    </div>
  );
}

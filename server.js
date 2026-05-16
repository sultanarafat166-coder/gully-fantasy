const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://gullyfantasy:gull@966@cluster0.lckcpxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



mongoose.connect(mongoURI)
  .then(() => console.log("🎰 Gally Cricket Database Connected Successfully!"))
  .catch(err => console.log("❌ Database Connection Error: ", err));

// बेसिक चेक रूट ताकि पता चले सर्वर जिंदा है
app.get('/', (req, res) => {
  res.send("🚀 Gali Franchise Backend Server is Running Live!");
});

// विड्रॉ चेक करने का नियम (मिनिमम ₹500 और पहली बार नो KYC)
app.post('/api/withdraw', (req, res) => {
  const { amount, isFirstWithdraw } = req.body;
  
  if (!amount || amount < 500) {
    return res.status(400).json({ success: false, message: "न्यूनतम ₹500 का विड्रॉ ही संभव है!" });
  }

  if (isFirstWithdraw) {
    return res.json({ success: true, message: `🎉 सफलता! बिना KYC के आपका पहला ₹${amount} का विड्रॉ लग गया है!` });
  }

  res.json({ success: true, message: `₹${amount} की विड्रॉ रिक्वेस्ट दर्ज हो गई है।` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

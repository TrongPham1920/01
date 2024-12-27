const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Thêm mongoose để kết nối MongoDB

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Kết nối MongoDB
const MONGO_URI =
  "mongodb+srv://phamtrong1920:dM9Xj6cCOyiznYG5@trongpham.oh78fsq.mongodb.net/?retryWrites=true&w=majority&appName=Trongpham";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Kết nối MongoDB thành công!"))
  .catch((error) => console.error("Lỗi kết nối MongoDB:", error));

// Định nghĩa schema và model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

// API: Lấy danh sách sản phẩm
app.get("/api/data", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      message: "Danh sách sản phẩm",
      data: products,
    });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

// API: Tạo sản phẩm mới
app.post("/api/data", async (req, res) => {
  const { name, description, price, img } = req.body;

  if (!name || !description || !price || !img) {
    return res
      .status(400)
      .json({ error: "Name, description, price và img là bắt buộc" });
  }

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      img,
    });

    await newProduct.save();
    res.status(201).json({
      message: "Tạo sản phẩm thành công",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

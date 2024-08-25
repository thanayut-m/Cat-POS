const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const service = require("./service");

const prisma = new PrismaClient();

app.post("/product/insert", service.isLogin, async (req, res) => {
  try {
    const {
      productBarcode,
      productName,
      productCost,
      productPrice,
      productDetail,
    } = req.body;

    if (!productBarcode || !productName || !productCost || !productPrice) {
      return res.status(400).json({ message: "ข้อมูลที่จำเป็นต้องกรอกไม่ครบ" });
    }
    const result = await prisma.products.create({
      data: {
        products_barcode: productBarcode,
        products_name: productName,
        products_price: productPrice,
        products_cost: productCost,
        products_detail: productDetail || null,
      },
    });
    res.json({ result: result, message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

app.get("/product/info", service.isLogin, async (req, res) => {
  try {
    const result = await prisma.products.findMany({});

    res.json({ result: result, message: "success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/product/changeProduct",service.isLogin,async(req,res) => {
    try {
        const {products_id ,datatoUpdate} =req.body;

        const result = await prisma.products.update({
            where : {
                products_id : products_id
            },
            data: datatoUpdate
        })

        res.json({ message: "success", result: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.delete("/product/deleteProduct/:id",async (req,res ) => {
    try {
        const { id } = req.params;
        const result = await prisma.products.delete({
            where : {
                products_id: parseInt(id),
            }
        });
    
        res.json({ result: result, message: "success" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})


module.exports = app;

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const service = require("./service");

const prisma = new PrismaClient();

app.post("/product/inserts", service.isLogin, async (req, res) => {
  try {
    const result = await prisma.products.create({ data: req.body });
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

app.post("/product/changeProduct", service.isLogin, async (req, res) => {
  try {

    const result = await prisma.products.update({
      where: {
        products_id: req.body.products_id,
      },
      data :req.body
    });
    res.json({ message: "success", result: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/product/deleteProduct/:id",service.isLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.products.delete({
      where: {
        products_id: parseInt(id),
      },
    });

    res.json({ result: result, message: "success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;

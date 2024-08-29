const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const service = require("./service");
const fileUpload = require("express-fileupload");

const prisma = new PrismaClient();

app.use(fileUpload());

app.post("/productImage/inserts", service.isLogin, async (req, res) => {
  try {
    const productImage = req.files.productImage;
    const uploadPath = __dirname + "/../uploads/"+ productImage.name;

    await productImage.mv(uploadPath, err => {
        if(err) throw new Error(err);
        res.json({message: 'success'})
    })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get(
  "productImage/list/:productId",
  service.isLogin,
  async (req, res) => {}
);

app.delete(
  "productImage/delete/:productId",
  service.isLogin,
  async (req, res) => {}
);

module.exports = app;

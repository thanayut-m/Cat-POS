const express = require("express");
const { PrismaClient, Prisma } = require("@prisma/client");
const app = express();
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
Prisma.PrismaClientKnownRequestError;

app.get("/package/list", async (req, res) => {
  try {
    const results = await prisma.package.findMany({
      orderBy: [
        {
          price: "asc",
        },
      ],
    });
    res.json({ results: results });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

app.post("/package/users", async (req, res) => {
  try {
    const { email, username, password, packageId } = req.body;
    const passwordHash = await  bcrypt.hash(password,10);
    const results = await prisma.users.create({
      data: {
        email: email,
        username: username,
        password: passwordHash,
        packageId: packageId,
      },
    });
    res.json({ message: "success", results: results });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = app;

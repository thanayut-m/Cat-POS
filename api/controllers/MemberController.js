const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

app.post("/member/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log(email);
      console.log(password);
      return res.status(400).json({ error: "Email and Password is required" });
    }

    const member = await prisma.users.findUnique({
      where: { email: email },
    });

    if (member && (await bcrypt.compare(password, member.password))) {
      return res.json({ id: member.id, message: "success" });
    } else {
      res.status(401).json({ message: "Not Found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;

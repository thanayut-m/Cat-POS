const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

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

    const checke_mail = await prisma.users.findMany({
      where: { email: email },
    });

    if (checke_mail.length > 0) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
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

app.post("/package/check-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const emailLowerCase = email.toLowerCase();

  try {
    const user = await prisma.users.findUnique({
      where: { email: emailLowerCase },
    });

    if (user) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = app;

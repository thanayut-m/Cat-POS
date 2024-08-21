const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const service = require('./service')

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
      let token = jwt.sign({ user_id: member.user_id }, process.env.secret);
      return res.json({ token: token, message: "success" });
    } else {
      res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

app.get("/member/info", service.isLogin, async (req, res) => {
  try {
    const payload = jwt.decode(service.getToken(req));
    const member = await prisma.users.findUnique({
      where: {
        user_id: payload.user_id
      },
      select : {
        user_id : true,
        username : true,
        package: {
          select : {
            package_name : true
          }
        }
      }


    });

    res.json({result : member , message: 'success'})
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = app;

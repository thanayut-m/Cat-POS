const express = require('express');
const { PrismaClient , Prisma  } = require('@prisma/client');
const app = express();

const prisma = new PrismaClient();
Prisma.PrismaClientKnownRequestError

app.get('/package/list', async (req, res) => {
    try {
        const results = await prisma.package.findMany();
        res.json({results: results});
    }catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
});


module.exports = app; 
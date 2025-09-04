const express = require('express');
const caseController = require('./caseStudy.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.post("/", async (req, res) => {
    return await caseController.criarCaso(req, res);
});

router.get("/", async (req, res) => {
    await caseController.pesquisarCasos(req, res);
});

module.exports = router;
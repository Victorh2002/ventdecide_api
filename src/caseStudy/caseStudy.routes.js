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

router.put("/:id", async (req, res) => {
    await caseController.atualizarCasos(req, res);
});

router.delete("/:id", async (req, res) => {
    await caseController.deletarCasos(req, res);
});

module.exports = router;
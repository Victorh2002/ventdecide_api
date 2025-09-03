const express = require('express');
const caseController = require('./caseStudy.controller');

const router = express.Router();

router.post("/", async (req, res) => {
    return await caseController.criarCaso(req, res);
});

router.get("/", async (req, res) => {
    await caseController.pesquisarCasos(req, res);
});

module.exports = router;
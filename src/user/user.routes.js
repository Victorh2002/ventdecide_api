const express = require('express');
const userController = require('./user.controller');

const router = express.Router();

router.post("/", async (req, res) => {
    return await userController.cadastrarUsuario(req, res);
});

router.get("/", async (req, res) => {
    await userController.pesquisarTodosUsuarios(req, res);
});

router.get("/:id", async (req, res) => {
    await userController.pesquisarUsuario(req, res);
});

module.exports = router;
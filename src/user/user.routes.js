const express = require('express');
const userController = require('./user.controller');

const router = express.Router();

router.post("/cadastro", async (req, res) => {
    return await userController.cadastrarUsuario(req, res);
});

router.get("/cadastro", async (req, res) => {
    await userController.todosUsuarios(req, res);
});

module.exports = router;
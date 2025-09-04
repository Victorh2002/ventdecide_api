const express = require('express');
const userController = require('./user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post("/login", async (req, res) => {
    return await userController.loginUsuario(req, res);
});

router.post("/cadastro", async (req, res) => {
    return await userController.cadastrarUsuario(req, res);
});

router.use(authMiddleware); 

router.get("/", async (req, res) => {
    await userController.pesquisarTodosUsuarios(req, res);
});

router.get("/:id", async (req, res) => {
    await userController.pesquisarUsuario(req, res);
});

module.exports = router;
const prisma = require('../prismaClient');
const bcrypt = require('bcryptjs');

const cadastrarUsuario = async (req, res) => {
    const { email, password, name, role, professionalId, institution, gender } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Email, senha e nome são obrigatórios.' });
    }

    try {
        const userExists = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (userExists) {
        return res.status(400).json({ error: 'Este e-mail já está em uso.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword, 
            name: name,
            role: role,
            professionalId: professionalId,
            institution: institution,
            gender: gender,
        },
        });

        const userToReturn = await prisma.user.findUnique({
            where: { id: newUser.id },
            select: { id: true, email: true, name: true }
        });
        
        res.status(201).json(userToReturn);

    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
    }
};

const pesquisarTodosUsuarios = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao consultar todos os usuários:', error);
        res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
    }
};

const pesquisarUsuario = async (req, res) => {
    try {
        const users = await prisma.user.findFirst({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao consultar o usuário', error);
        res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
    }
};

module.exports = {
    cadastrarUsuario, pesquisarTodosUsuarios, pesquisarUsuario
};
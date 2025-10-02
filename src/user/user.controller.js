const prisma = require('../prismaClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const transporter = require('../utils/mailer')

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

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const payload = {
            id: user.id,
            email: user.email,
        };

        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' } 
        );

        res.json({ message: 'Login bem-sucedido!', token: token });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login' });
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

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(200).json({ message: 'Se um usuário com este email existir, um link de redefinição será enviado.' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');

        const passwordResetToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        
        const passwordResetExpires = new Date(Date.now() + 3600000); 

        await prisma.user.update({
            where: { email },
            data: {
                passwordResetToken,
                passwordResetExpires,
            },
        });

        try {
            const resetURL = `${process.env.BACKEND_URL}/reset.html?token=${resetToken}`;

            await transporter.sendMail({
                to: user.email,
                from: '"VentDecide App" <victorhugofranciscon@gmail.com>',
                subject: 'Redefinição de Senha - VentDecide',
                html: `
                    <p>Você solicitou uma redefinição de senha para sua conta no VentDecide.</p>
                    <p>Por favor, clique no link abaixo para criar uma nova senha:</p>
                    <a href="${resetURL}">Redefinir minha senha</a>
                    <p>Se você não solicitou isso, por favor, ignore este email.</p>
                `,
            });

            return res.status(200).json({ message: 'Um link de redefinição foi enviado para o seu email.' });

        } catch(err) {
            console.error('Erro ao enviar email:', err);
            
            await prisma.user.update({ 
                where: { id: user.id }, 
                data: {
                    passwordResetToken: null,
                    passwordResetExpires: null
                } 
            });

            return res.status(500).json({ error: 'Não foi possível enviar o email de redefinição.' });
        }

    } catch (error) {
        console.error('Erro no forgotPassword:', error);
        res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
    }
};

const resetPassword = async (req, res) => {
    const { password, token } = req.body;

    const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

    try {
        const user = await prisma.user.findUnique({ where: { passwordResetToken: hashedToken } });

        if (!user) {
            return res.status(400).json({ error: 'Link de recuperação de senha expirado. Gere um novo' });
        }

        if (user.passwordResetExpires < Date()) {
            await prisma.user.update({ 
                where: { id: user.id }, 
                data: {
                    passwordResetToken: null,
                    passwordResetExpires: null
                } 
            });
            res.status(400).json({ error: 'Link de recuperação de senha expirado. Gere um novo' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await prisma.user.update({ 
            where: { id: user.id }, 
            data: {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetExpires: null
            } 
        });

        return res.status(200).json({ message: 'Senha alterada com sucesso!' });
    } catch (error) {
        console.error('Erro ao resetar senha:', error);
        res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
    }
};

module.exports = {
    cadastrarUsuario,
    pesquisarTodosUsuarios,
    pesquisarUsuario,
    loginUsuario,
    forgotPassword,
    resetPassword 
};
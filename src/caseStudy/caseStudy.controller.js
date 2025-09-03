const { Prisma } = require('@prisma/client');
const prisma = require('../prismaClient');
const bcrypt = require('bcryptjs');

const criarCaso = async (req, res) => {
    const dadosDoFormulario = req.body; 

    try {
        const novoCaso = await prisma.caseStudy.create({
            data: {
                ...dadosDoFormulario, 
                authorId: 1 
            }
        });
        res.status(201).json(novoCaso);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                    return res.status(409).json({ 
                    error: "Já existe um caso de estudo com este nome para este usuário." 
                });
            }
        }
            
        console.error("Erro ao criar caso de estudo:", error);
        res.status(500).json({ error: "Ocorreu um erro no servidor." });
    }
};

const pesquisarTodosCasos = async (req, res) => {
    try {
        const casos = await prisma.caseStudy.findMany({
            where: {
                authorId: 1
            }
        });
        res.status(200).json(casos);
    } catch (error) {
        console.error('Erro ao consultar todos os casos:', error);
        res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
    }
};

const pesquisarCasos = async (req, res) => {
    const { caseName } = req.query;

    if (!caseName) {
        const todosOsCasos = await prisma.caseStudy.findMany({
            where: { authorId: 1 }
        });
        return res.json(todosOsCasos);
    }

    try {
        const caso = await prisma.caseStudy.findFirst({
            where: {
                authorId: 1,
                caseName: caseName
            }
        });

        if (!caso) {
            return res.status(404).json({ error: 'Caso de estudo não encontrado.' });
        }

        res.status(200).json(caso);
    } catch (error) {
        console.error('Erro ao consultar o caso', error);
        res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
    }
};

module.exports = {
    criarCaso, pesquisarCasos
};
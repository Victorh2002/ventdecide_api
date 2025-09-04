const { Prisma } = require('@prisma/client');
const prisma = require('../prismaClient');
const bcrypt = require('bcryptjs');

const criarCaso = async (req, res) => {
    const dadosDoFormulario = req.body;
    
    const idAutor = req.user.id;

    try {
        const novoCaso = await prisma.caseStudy.create({
            data: {
                ...dadosDoFormulario, 
                authorId: idAutor 
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

const pesquisarCasos = async (req, res) => {
    const { caseName } = req.query;

    const idAutor = req.user.id;

    if (!caseName) {
        const todosOsCasos = await prisma.caseStudy.findMany({
            where: { authorId: idAutor, deletedAt: null }
        });
        return res.json(todosOsCasos);
    }

    try {
        const caso = await prisma.caseStudy.findFirst({
            where: {
                authorId: idAutor,
                caseName: caseName,
                deletedAt: null
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

const atualizarCasos = async (req, res) => {
    const dadosDoFormulario = req.body;
    const {
        caseName,
        patientIdentifier,
        birthDate,
        gender,
        principalDiagnosis,
        height,
        previousConditions,
        sedationBlocker,
        intubationReasons,
        ph,
        paco2,
        pao2,
        hco3,
        be,
        sao2,
        na,
        cl,
        fio2_gasometry,
        pao2Fio2Ratio,
        anionGap,
        acidBaseStatus,
        ventilationMode,
        vt_vcv,
        flow_vcv,
        ti_vcv,
        pip_pcv,
        ti_pcv,
        ps_psv,
        peep_psv,
        rr,
        peep,
        fio2_ventilation,
        trigger
    } = req.body;

    const dadosParaAtualizar = {
        caseName,
        patientIdentifier,
        birthDate,
        gender,
        principalDiagnosis,
        height,
        previousConditions,
        sedationBlocker,
        intubationReasons,
        ph,
        paco2,
        pao2,
        hco3,
        be,
        sao2,
        na,
        cl,
        fio2_gasometry,
        pao2Fio2Ratio,
        anionGap,
        acidBaseStatus,
        ventilationMode,
        vt_vcv,
        flow_vcv,
        ti_vcv,
        pip_pcv,
        ti_pcv,
        ps_psv,
        peep_psv,
        rr,
        peep,
        fio2_ventilation,
        trigger
    };

    const idAutor = req.user.id;
    const idCaso = req.params.id;

    try {
        const caso = await prisma.caseStudy.update({
            where: { id: parseInt(idCaso), authorId: idAutor },
            data: dadosParaAtualizar
        });

        if (!caso) {
            return res.status(404).json({ error: 'Caso de estudo não encontrado.' });
        }

        res.status(200).json(caso);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                    return res.status(409).json({ 
                    error: "Já existe um caso de estudo com este nome para este usuário." 
                });
            }
        }

        console.error('Erro ao atualizar o caso', error);
        res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
    }
};

const deletarCasos = async (req, res) => {
    const idAutor = req.user.id;
    const idCaso = req.params.id;

    try {
        const caso = await prisma.caseStudy.update({
            where: { id: parseInt(idCaso), authorId: idAutor, deletedAt: null },
            data: { deletedAt: new Date() }
        });

        if (!caso) {
            return res.status(404).json({ error: 'Caso de estudo não encontrado ou já deletado.' });
        }

        res.status(200).json(caso);
    } catch (error) {
        console.error('Erro ao atualizar o caso', error);
        res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
    }
};

module.exports = {
    criarCaso, pesquisarCasos, atualizarCasos, deletarCasos
};
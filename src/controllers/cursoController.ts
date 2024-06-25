import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listarCursos = async (req: Request, res: Response) => {
    try {
      const cursos = await prisma.curso.findMany();
      res.status(200).json(cursos);
    } catch (error: any) {
      res.status(400).json({ mensagem: error.message });
    }
  };

export const inscreverCurso = async (req: Request, res: Response) => {
  try {
    const { nome, descricao, capa, inicio } = req.body;
    const novoCurso = await prisma.curso.create({
      data: {
        nome,
        descricao,
        capa,
        inscricoes: 0,
        inicio: new Date(inicio)
      }
    });
    res.status(201).json(novoCurso);
  } catch (error: any) {
    res.status(400).json({ mensagem: error.message });
  }
    
};

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { parseDate } from '../utils/dateUtils';


const prisma = new PrismaClient();

//cadastro de aluno
export const createAluno = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, dataNascimento } = req.body;

    // Validar se todos os campos estão presentes na requisição
    if (!nome || !email || !senha || !dataNascimento) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }

    // Converta a data de nascimento
    if (!dataNascimento) {
      return res.status(400).json({ mensagem: 'Data de nascimento não fornecida' });
    }
    
    const parsedDataNascimento = parseDate(dataNascimento);

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criação do aluno no banco de dados
    const aluno = await prisma.aluno.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
        dataNascimento: parsedDataNascimento,
        ativo: true
      }
    });

    res.status(201).json(aluno);
  } catch (error: any){
    console.error('Erro ao criar aluno', error)
    res.status(400).json({ mensagem: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    // Verificar se email e senha estão presentes na requisição
    if (!email || !senha) {
      return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
    }

    // Buscar o aluno pelo email
    const aluno = await prisma.aluno.findUnique({ where: { email } });

    if (!aluno || !(await bcrypt.compare(senha, aluno.senha))) {
      return res.status(400).json({ mensagem: 'Credenciais inválidas' });
    }

    // Verificar se aluno existe e comparar senhas
    const token = jwt.sign({ id: aluno.id }, 'secret', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    // Retornar mensagem de login bem sucedido
    res.status(200).json({ mensagem: 'Login bem sucedido' });
  } catch (error: any) {
    console.error('Erro ao fazer login:', error);
    res.status(400).json({ mensagem: error.message });
  }
};

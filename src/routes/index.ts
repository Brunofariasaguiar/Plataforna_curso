import { Router } from 'express';
import { createAluno, login } from '../controllers/alunoController';
import { listarCursos, inscreverCurso } from '../controllers/cursoController';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

// Rotas de Aluno
router.post('/aluno', createAluno);
router.post('/login', login);

// Rotas de Curso
router.get('/cursos', listarCursos);
router.post('/cursos/inscrever', authenticate, inscreverCurso);

export default router;

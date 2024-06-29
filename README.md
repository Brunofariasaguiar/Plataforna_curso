#Plataforna_curso

Importações:
express: Framework web para Node.js.
cors: Middleware para permitir requisições de outras origens (cross-origin).
cookieParser: Middleware para analisar cookies nas requisições.
router: Importa as rotas definidas em um arquivo externo chamado routes.
Criação da Aplicação Express:

export const app = express();: Cria uma instância da aplicação Express e a exporta para uso externo.
Middlewares:

app.use(cors());: Adiciona o middleware cors para permitir requisições de outras origens.
app.use(cookieParser());: Adiciona o middleware cookieParser para analisar cookies nas requisições.
app.use(express.json());: Adiciona o middleware express.json para analisar requisições com payload JSON.
app.use(router);: Usa as rotas definidas no roteador importado de ./routes.
Configuração da Porta:

const PORT = process.env.PORT || 3000;: Define a porta em que o servidor irá rodar, utilizando a variável de ambiente PORT ou, caso não definida, a porta 3000 por padrão.
Rota de Status:

app.get('/status', (req, res) => { res.status(200).send('Servidor está funcionando corretamente!'); });: Define uma rota GET /status que retorna uma resposta 200 com a mensagem "Servidor está funcionando corretamente!".
Inicialização do Servidor:

app.listen(PORT, () => { console.log(Server is running on port ${PORT}); });: Inicializa o servidor na porta definida e exibe uma mensagem no console indicando que o servidor está rodando na porta especificada.
Espero que isso ajude! Se precisar de mais alguma coisa, é só avisar.

// src/utils/dateUtils.ts
Função parseDate:

A função parseDate recebe uma string de data no formato "dd/mm/yyyy" e a converte para um objeto Date.
Parâmetros:

dateStr: string: A string que representa a data no formato "dd/mm/yyyy".
Retorno:

Date: Retorna um objeto Date correspondente à data fornecida.
Lançamento de Erros:

A função lança um erro se a string de data não for fornecida.
A função também lança um erro se a data for inválida, verificando se os componentes dia, mês e ano são válidos (dia ≤ 31, mês ≤ 12).
Passos da Função:

Verificação da String de Data: Verifica se a string de data foi fornecida. Se não, lança um erro.
Separação e Conversão: Separa a string de data nos componentes dia, mês e ano, e os converte para números usando map(Number).
Verificação de Validade: Verifica se os componentes da data são válidos (dia, mês e ano são números válidos, e os valores de dia e mês estão dentro dos limites permitidos).
Criação do Objeto Date: Cria e retorna um novo objeto Date com os componentes da data, ajustando o mês (mês - 1, pois os meses no objeto Date começam do zero).


Importações:
Router: Importa o roteador do Express.
createAluno, login: Importa funções de controle relacionadas a alunos do arquivo alunoController.
listarCursos, inscreverCurso: Importa funções de controle relacionadas a cursos do arquivo cursoController.
authenticate: Importa um middleware de autenticação do arquivo authenticate.
Instância do Roteador:

const router = Router();: Cria uma nova instância do roteador do Express.
Rotas de Aluno:

router.post('/aluno', createAluno);: Define uma rota POST para /aluno que chama a função createAluno para criar um novo aluno.
router.post('/login', login);: Define uma rota POST para /login que chama a função login para autenticar um aluno.
Rotas de Curso:

router.get('/cursos', listarCursos);: Define uma rota GET para /cursos que chama a função listarCursos para listar todos os cursos disponíveis.
router.post('/cursos/inscrever', authenticate, inscreverCurso);: Define uma rota POST para /cursos/inscrever que chama a função inscreverCurso para inscrever um aluno em um curso. Esta rota usa o middleware authenticate para garantir que o usuário esteja autenticado antes de permitir a inscrição no curso.
Exportação do Roteador:

export default router;: Exporta o roteador para que possa ser usado em outras partes da aplicação.
Este código configura um conjunto de rotas para uma aplicação Express, permitindo a criação e autenticação de alunos, bem como a listagem e inscrição em cursos, com proteção de autenticação para certas operações.

Importações:
Request, Response, NextFunction: Importa os tipos do Express para as solicitações, respostas e funções de próximo middleware.
jwt: Importa a biblioteca jsonwebtoken para trabalhar com tokens JWT.
Middleware authenticate:

Esta função middleware verifica se o usuário está autenticado ao validar o token JWT presente nos cookies da solicitação.
Parâmetros:

req: Request: O objeto de solicitação HTTP.
res: Response: O objeto de resposta HTTP.
next: NextFunction: A função que passa o controle para o próximo middleware.
Funcionamento:

Obtenção do Token: O middleware obtém o token dos cookies da solicitação usando req.cookies.token.
Verificação da Presença do Token: Se o token não estiver presente, retorna uma resposta com status 403 e uma mensagem "Não autenticado".
Verificação do Token JWT: Usa jwt.verify para verificar o token. O segredo usado para verificar o token é 'secret'.
Erro na Verificação: Se houver um erro na verificação (por exemplo, se o token for inválido), retorna uma resposta com status 403 e uma mensagem "Token inválido".
Token Válido: Se o token for válido, as informações decodificadas do token são adicionadas ao objeto de solicitação (req.user).
Próximo Middleware: Chama next() para passar o controle para o próximo middleware ou rota.
Este código é útil para proteger rotas que requerem autenticação, garantindo que apenas usuários autenticados com um token JWT válido possam acessar determinadas funcionalidades da aplicação.

Importações:

Request, Response: Importa os tipos do Express para as solicitações e respostas HTTP.
PrismaClient: Importa o cliente Prisma para interagir com o banco de dados.
Instância do PrismaClient:

const prisma = new PrismaClient();: Cria uma instância do PrismaClient para realizar operações no banco de dados.
Controlador listarCursos:

Descrição: Lista todos os cursos disponíveis no banco de dados.
Parâmetros:
req: Request: O objeto de solicitação HTTP.
res: Response: O objeto de resposta HTTP.
Funcionamento:
Tenta obter todos os cursos do banco de dados usando prisma.curso.findMany().
Retorna os cursos com status 200 (OK) em caso de sucesso.
Em caso de erro, retorna uma mensagem de erro com status 400 (Bad Request).
Controlador inscreverCurso:

Descrição: Inscreve um novo curso no banco de dados.
Parâmetros:
req: Request: O objeto de solicitação HTTP.
res: Response: O objeto de resposta HTTP.
Funcionamento:
Extrai os dados do corpo da solicitação (nome, descricao, capa, inicio).
Cria um novo curso no banco de dados com os dados fornecidos usando prisma.curso.create().
Retorna o curso criado com status 201 (Created) em caso de sucesso.
Em caso de erro, retorna uma mensagem de erro com status 400 (Bad Request).
Este código define dois controladores para gerenciar cursos em uma aplicação Express, usando o Prisma para interagir com o banco de dados. O controlador listarCursos recupera e retorna todos os cursos, enquanto o controlador inscreverCurso cria um novo curso com os dados fornecidos na solicitação.

Importações:

Request, Response: Importa os tipos do Express para as solicitações e respostas HTTP.
bcryptjs: Importa a biblioteca para hashing de senhas.
jsonwebtoken: Importa a biblioteca para trabalhar com tokens JWT.
PrismaClient: Importa o cliente Prisma para interagir com o banco de dados.
parseDate: Importa a função utilitária para analisar datas.
Instância do PrismaClient:

const prisma = new PrismaClient();: Cria uma instância do PrismaClient para realizar operações no banco de dados.
Controlador createAluno:

Descrição: Cria um novo aluno no banco de dados.
Parâmetros:
req: Request: O objeto de solicitação HTTP.
res: Response: O objeto de resposta HTTP.
Funcionamento:
Verifica se todos os campos obrigatórios (nome, email, senha, dataNascimento) estão presentes na solicitação.
Converte a data de nascimento usando parseDate.
Gera um hash da senha usando bcrypt.hash.
Cria um novo aluno no banco de dados com os dados fornecidos e o hash da senha.
Retorna o aluno criado com status 201 (Created) em caso de sucesso.
Em caso de erro, retorna uma mensagem de erro com status 400 (Bad Request).
Controlador login:

Descrição: Realiza o login de um aluno.
Parâmetros:
req: Request: O objeto de solicitação HTTP.
res: Response: O objeto de resposta HTTP.
Funcionamento:
Verifica se email e senha estão presentes na solicitação.
Busca o aluno no banco de dados pelo email fornecido.
Verifica se o aluno existe e se a senha fornecida corresponde à senha armazenada no banco de dados.
Gera um token JWT com o ID do aluno e uma expiração de 1 hora.
Define o token no cookie da resposta com a opção httpOnly para maior segurança.
Retorna uma mensagem de login bem-sucedido com status 200 (OK) em caso de sucesso.
Em caso de erro, retorna uma mensagem de erro com status 400 (Bad Request).
Este código define dois controladores para gerenciar o cadastro e login de alunos em uma aplicação Express, utilizando o Prisma para interagir com o banco de dados e bibliotecas adicionais para hashing de senhas e geração de tokens JWT.

Configurações do Prisma:

Gerador:

prisma
Copiar código
generator client {
  provider = "prisma-client-js"
}
Define que o Prisma vai gerar um cliente JavaScript para interagir com o banco de dados.
Fonte de Dados:

prisma
Copiar código
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
Define a fonte de dados como um banco de dados PostgreSQL, com a URL obtida das variáveis de ambiente.
Modelos:

Modelo Aluno:

Representa um aluno com campos para ID, nome, email (único), senha, data de nascimento, status ativo e relações com logins e cursos inscritos.
Modelo Login:

Representa um login com campos para ID, email (único) e senha, além de uma relação com o modelo Aluno baseada no email.
Modelo Curso:

Representa um curso com campos para ID, nome, descrição, capa, número de inscrições, data de início e uma relação com inscrições de cursos.
Modelo CursoInscrito:

Representa a inscrição de um aluno em um curso com campos para ID, IDs de aluno e curso, data de inscrição, status de cancelamento, e relações com os modelos Aluno e Curso.
Inclui uma restrição de unicidade para garantir que um aluno não se inscreva no mesmo curso mais de uma vez.
Explicação Adicional:
Relações:

Aluno tem uma relação um-para-muitos com Login e CursoInscrito.
Login tem uma relação muitos-para-um com Aluno baseada no campo email.
Curso tem uma relação um-para-muitos com CursoInscrito.
CursoInscrito tem relações muitos-para-um com Aluno e Curso.

Declaração de Variáveis de Ambiente:

Comentário:
plaintext
Copiar código
# As variáveis de ambiente declaradas neste arquivo são automaticamente disponibilizadas para o Prisma.
# Veja a documentação para mais detalhes: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema
Explica que as variáveis de ambiente declaradas neste arquivo estarão disponíveis automaticamente para o Prisma.
Suporte a Diferentes Bancos de Dados:

Comentário:
plaintext
Copiar código
# O Prisma suporta o formato nativo de string de conexão para PostgreSQL, MySQL, SQLite, SQL Server, MongoDB e CockroachDB.
# Veja a documentação para todas as opções de strings de conexão: https://pris.ly/d/connection-strings
Informa que o Prisma suporta vários formatos nativos de strings de conexão para diferentes bancos de dados e fornece um link para a documentação completa.
Variável DATABASE_URL:

Declaração:
plaintext
Copiar código
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/PlataformaDeCursos?schema=public"
Define a URL de conexão para o banco de dados PostgreSQL.
Formato:
postgresql://: Indica que o banco de dados é PostgreSQL.
postgres: Nome de usuário do banco de dados.
Senha do banco de dados.
@localhost: O banco de dados está hospedado localmente.
:5432: Porta padrão para conexões PostgreSQL.
/PlataformaDeCursos: Nome do banco de dados.
?schema=public: Define o esquema do banco de dados a ser utilizado.
Explicação Adicional:
Segurança:

A string de conexão contém informações sensíveis (nome de usuário e senha). Em um ambiente de produção, é importante garantir que este arquivo não seja exposto publicamente e que as variáveis de ambiente sejam gerenciadas de forma segura.
Utilização:

Esta variável de ambiente será usada pelo Prisma para se conectar ao banco de dados PostgreSQL especificado. O Prisma utiliza esta conexão para executar operações de leitura e escrita no banco de dados conforme definido no esquema Prisma.
Este arquivo de configuração define a string de conexão que o Prisma usará para se conectar ao banco de dados PostgreSQL. As variáveis de ambiente permitem uma configuração flexível e segura, especialmente em diferentes ambientes (desenvolvimento, teste, produção).

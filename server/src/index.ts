import express from 'express';
import prisma from './prisma';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { name, email, id, password } = req.body;
  const newUser = await prisma.user.create({
    data: {
      id: uuidv4(),
      email,
      name,
      password,
    },
  });
  res.json(newUser);
});

app.post('/todos', async (req, res) => {
  const { userId, content } = req.body;
  const newTodoItem = await prisma.todoItem.create({
    data: {
      id: uuidv4(),
      userId,
      content,
      isCompleted: false,
    },
  });
  res.json(newTodoItem);
});

app.get('/todos/:userId', async (req, res) => {
  const { userId } = req.params;
  const todos = await prisma.todoItem.findMany({
    where: {
      userId,
    },
  });
  res.json(todos);
});

app.patch('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  const updatedTodo = await prisma.todoItem.update({
    where: {
      id,
    },
    data: {
      isCompleted,
    },
  });
  res.json(updatedTodo);
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.todoItem.delete({
    where: {
      id,
    },
  });
  res.status(204).send();
});

app.delete('/todos/completed/:userId', async (req, res) => {
  const { userId } = req.params;
  await prisma.todoItem.deleteMany({
    where: {
      userId: userId,
      isCompleted: true,
    },
  });
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

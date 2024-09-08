import express from 'express';
import prisma from './prisma';

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
      id,
      email,
      name,
      password,
    },
  });
  res.json(newUser);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

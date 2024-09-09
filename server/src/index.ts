import express from 'express';
import userRoutes from '../routes/userRoutes';
import todoRoutes from '../routes/todoRoutes';
import { errorHandler } from '../middleware/errorHandler';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

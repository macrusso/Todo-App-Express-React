import express from 'express';
import {
  createTodo,
  getUserTodos,
  updateTodo,
  deleteTodo,
  deleteCompletedTodos,
} from '../controllers/todoController';

const router = express.Router();

router.post('/', createTodo);
router.get('/:userId', getUserTodos);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.delete('/completed/:userId', deleteCompletedTodos);

export default router;

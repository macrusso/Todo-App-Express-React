import { Todo } from '../types/ToDo';
import { FaTrash } from 'react-icons/fa';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string, isCompleted: boolean) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem = ({ todo, toggleTodo, deleteTodo }: TodoItemProps) => {
  return (
    <li
      className={`flex justify-between items-center p-4 my-2 border rounded ${
        todo.isCompleted ? 'bg-green-200 line-through' : 'bg-gray-100'
      }`}
    >
      <span
        onClick={() => toggleTodo(todo.id, todo.isCompleted)}
        className='cursor-pointer'
      >
        {todo.content}
      </span>

      <button
        onClick={() => deleteTodo(todo.id)}
        className='ml-4 text-red-200 hover:text-red-500'
      >
        <FaTrash />
      </button>
    </li>
  );
};

export default TodoItem;

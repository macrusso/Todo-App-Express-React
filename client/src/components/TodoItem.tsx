import { Todo } from '../types/ToDo';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string, isCompleted: boolean) => void;
}

const TodoItem = ({ todo, toggleTodo }: TodoItemProps) => {
  return (
    <li
      onClick={() => toggleTodo(todo.id, todo.isCompleted)}
      className={`cursor-pointer p-4 my-2 border rounded ${
        todo.isCompleted ? 'bg-green-200 line-through' : 'bg-gray-100'
      }`}
    >
      {todo.content}
    </li>
  );
};

export default TodoItem;

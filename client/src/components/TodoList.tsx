import { useState } from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/ToDo';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, content: 'Learn TypeScript', isCompleted: false },
    { id: 2, content: 'Setup Tailwind CSS', isCompleted: false },
    { id: 3, content: 'Build a Todo App', isCompleted: false },
  ]);

  // Toggle the completed state of a todo item
  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div className='max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <h1 className='text-2xl font-bold mb-4'>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

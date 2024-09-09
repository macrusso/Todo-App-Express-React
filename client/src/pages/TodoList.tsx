import { useEffect, useState } from 'react';
import TodoItem from '../components/TodoItem';
import { Todo } from '../types/ToDo';
import TodoInput from '../components/TodoInput';
import PrimaryButton from '../components/PrimaryButton';
import {
  fetchTodos,
  addTodo,
  updateTodoStatus,
  deleteTodo,
  deleteAllCompletedTodos,
} from '../service/todoService';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch todos');
        setLoading(false);
      }
    };
    loadTodos();
  }, []);

  const handleAddTodo = async (content: string) => {
    try {
      const newTodo = await addTodo(content);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  const toggleTodo = async (id: string, isCompleted: boolean) => {
    try {
      const updatedTodo = await updateTodoStatus(id, isCompleted);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const handleDeleteAllCompleted = async () => {
    try {
      await deleteAllCompletedTodos();
      setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isCompleted));
    } catch (err) {
      setError('Failed to delete all completed todos');
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className='w-[500px] mx-auto p-6 bg-white shadow-lg rounded-lg'>
          <h1 className='text-2xl font-bold mb-4'>Todo List</h1>
          <TodoInput addTodo={handleAddTodo} />
          <ul>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={handleDeleteTodo}
              />
            ))}
          </ul>
          <PrimaryButton
            onClick={handleDeleteAllCompleted}
            text='Delete all completed'
          />
        </div>
      )}
    </div>
  );
};

export default TodoList;

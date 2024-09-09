import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/ToDo';
import TodoInput from './TodoInput';

const USER_ID = '9790a4f1-115a-4ba7-88e5-b07c31ed7c6b';
const TODO_ENDPOINT = 'http://localhost:3001/todos';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${TODO_ENDPOINT}/${USER_ID}`);

      if (!response.ok) {
        throw new Error();
      }

      const data: Todo[] = await response.json();
      setTodos(data);
      setLoading(false);
    } catch (err) {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  const updateTodoStatus = async (todoId: string, isCompleted: boolean) => {
    try {
      const response = await fetch(`${TODO_ENDPOINT}/${todoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isCompleted: !isCompleted }),
      });

      if (!response.ok) {
        throw new Error();
      }

      const updatedTodo = await response.json();

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    } catch (err) {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleTodo = (id: string, isCompleted: boolean) => {
    updateTodoStatus(id, isCompleted);
  };

  const addTodo = () => {
    console.log('>>>> add todo');
  };

  const deleteAllCompleted = () => {
    console.log('>>>> add todo');
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className='w-[500px] mx-auto p-6 bg-white shadow-lg rounded-lg'>
          <h1 className='text-2xl font-bold mb-4'>Todo List</h1>
          <TodoInput addTodo={addTodo} />
          <ul>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            ))}
          </ul>
          <button
            onClick={deleteAllCompleted}
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300'
          >
            Delete all completed
          </button>
        </div>
      )}
    </>
  );
};

export default TodoList;

import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/ToDo';
import TodoInput from './TodoInput';
import PrimaryButton from './PrimaryButton';

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

  const addTodo = async (content: string) => {
    try {
      const response = await fetch(`${TODO_ENDPOINT}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: USER_ID,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      const createdTodo = await response.json();

      setTodos((prevTodos) =>
        prevTodos.concat({
          id: createdTodo.id,
          content: createdTodo.content,
          isCompleted: createdTodo.isCompleted,
        })
      );
    } catch (err) {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  const deleteAllCompleted = async () => {
    try {
      const response = await fetch(`${TODO_ENDPOINT}/completed/${USER_ID}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error();
      }

      fetchTodos();
    } catch (err) {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      const response = await fetch(`${TODO_ENDPOINT}/${todoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error();
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
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

  const handleAddTodo = (content: string) => {
    addTodo(content);
  };

  const handleDeleteAllCompleted = () => {
    deleteAllCompleted();
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  return (
    <>
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
    </>
  );
};

export default TodoList;

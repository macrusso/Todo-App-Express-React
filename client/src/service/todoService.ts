import { Todo } from '../types/ToDo';

const USER_ID = '9790a4f1-115a-4ba7-88e5-b07c31ed7c6b';
const TODO_ENDPOINT = 'http://localhost:3001/todos';

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${TODO_ENDPOINT}/${USER_ID}`);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

export const addTodo = async (content: string): Promise<Todo> => {
  const response = await fetch(`${TODO_ENDPOINT}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: USER_ID, content }),
  });

  if (!response.ok) {
    throw new Error('Failed to add todo');
  }
  return response.json();
};

export const updateTodoStatus = async (
  todoId: string,
  isCompleted: boolean
): Promise<Todo> => {
  const response = await fetch(`${TODO_ENDPOINT}/${todoId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isCompleted: !isCompleted }),
  });

  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return response.json();
};

export const deleteTodo = async (todoId: string): Promise<void> => {
  const response = await fetch(`${TODO_ENDPOINT}/${todoId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
};

export const deleteAllCompletedTodos = async (): Promise<void> => {
  const response = await fetch(`${TODO_ENDPOINT}/completed/${USER_ID}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete all completed todos');
  }
};

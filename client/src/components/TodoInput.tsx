import { useState } from 'react';

interface TodoInputProps {
  addTodo: (content: string) => void;
}

const TodoInput = ({ addTodo }: TodoInputProps) => {
  const [content, setContent] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && content.trim() !== '') {
      addTodo(content.trim());
      setContent(''); // Clear the input after submission
    }
  };

  return (
    <input
      type='text'
      value={content}
      onChange={(e) => setContent(e.target.value)}
      onKeyDown={handleKeyPress}
      placeholder='Add a new todo'
      className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
    />
  );
};

export default TodoInput;

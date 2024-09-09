interface PrimaryButtonProps {
  onClick: () => void;
  text: string;
}

const PrimaryButton = ({ onClick, text }: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300'
    >
      {text}
    </button>
  );
};

export default PrimaryButton;

export const Button = ({ children, onClick, type = 'button', className = '', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-blue-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

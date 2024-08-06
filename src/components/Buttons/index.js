export const Button = ({ className = "", ...props }) => {
  return (
    <button
      className={`${className} bg-btn-primary text-btn-primary-color rounded disabled:opacity-65`}
      {...props}
    ></button>
  );
};

export const SecondaryButton = ({ className = "", ...props }) => {
  return (
    <button
      className={`${className} w-full px-3 py-2 border border-btn-primary text-btn-primary rounded disabled:opacity-50`}
      {...props}
    ></button>
  );
};

export const AuthButton = ({ children, className = "", ...props }) => {
  return (
    <Button
      className={`${className} w-full px-3 py-2 border rounded`}
      {...props}
    >
      {children}
    </Button>
  );
};

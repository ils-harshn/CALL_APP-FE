export const Button = ({ className = "", ...props }) => {
  return (
    <button
      className={`${className} bg-btn-primary text-btn-primary-color rounded`}
      {...props}
    ></button>
  );
};

export const AuthButton = ({ children, className = "", ...props }) => {
  return (
    <Button className="w-full px-3 py-2 border rounded" {...props}>
      {children}
    </Button>
  );
};

export const Label = ({ children, className = "", ...props }) => {
  return (
    <label {...props} className={`${className} text-sm block`}>
      {children}
    </label>
  );
};

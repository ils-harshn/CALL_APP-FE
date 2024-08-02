export const TextInput = ({ className = "", ...props }) => {
  return (
    <input
      className={`${className} px-3 py-2 border rounded`}
      {...props}
    ></input>
  );
};

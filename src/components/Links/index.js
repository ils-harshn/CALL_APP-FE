import { Link } from "react-router-dom";

export const A = ({ children, href = "", className = "", ...props }) => {
  return (
    <Link to={href} className={`${className} underline`} {...props}>
      {children}
    </Link>
  );
};

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

export const IconButton = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`${className} bg-slate-100 w-10 h-10 rounded-full border flex justify-center items-center text-black hover:text-white duration-300 hover:bg-blue-400`}
      {...props}
    >
      {" "}
      {children}
    </button>
  );
};

export const IconButtonSecondary = ({
  title = "",
  children,
  className = "",
  ...props
}) => {
  return (
    <>
      <button
        className={`${className} w-10 h-10 rounded-full flex justify-center items-center`}
        {...props}
      >
        {" "}
        {children}
      </button>
      {title ? (
        <p className="text-center text-sm font-semibold text-slate-500 cursor-pointer">
          {title}
        </p>
      ) : null}
    </>
  );
};

export const BadgeIconButton = ({
  title,
  children,
  isActive = false,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${className} ${
        isActive ? "bg-blue-400 text-white" : ""
      } px-4 py-1 bg-slate-100 rounded-2xl text-slate-700 hover:text-white duration-300 hover:bg-blue-400`}
      {...props}
    >
      <div className="flex items-center text-sm">
        <div className="mr-2">{children}</div>
        <div className="font-semibold">{title}</div>
      </div>
    </button>
  );
};

export const BadgeButton = ({
  children,
  isActive = false,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${className} ${
        isActive ? "bg-blue-400 text-white" : ""
      } font-semibold px-6 py-2 bg-slate-100 rounded-xl text-slate-700 hover:text-white duration-300 hover:bg-blue-400`}
      {...props}
    >
      {children}
    </button>
  );
};

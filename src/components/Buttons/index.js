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

export const IconButton = ({
  children,
  className = "",
  isActive = false,
  ...props
}) => {
  return (
    <button
      className={`${className} ${
        isActive ? "text-white bg-blue-400" : "bg-slate-100 text-black"
      } w-10 h-10 rounded-full border flex justify-center items-center hover:text-white duration-300 hover:bg-blue-400`}
      {...props}
    >
      {" "}
      {children}
    </button>
  );
};

export const IconButtonSecondary = ({
  nref,
  btitle = "",
  title = "",
  children,
  className = "",
  ...props
}) => {
  return (
    <>
      <button
        ref={nref}
        title={btitle}
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
        isActive ? "bg-blue-400 text-white" : "bg-slate-100 text-slate-700"
      } px-4 py-1 rounded-2xl hover:text-white duration-300 hover:bg-blue-400`}
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
        isActive ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-700"
      } font-semibold px-6 py-2  rounded-xl  hover:text-blue-600 duration-300 hover:bg-blue-100`}
      {...props}
    >
      {children}
    </button>
  );
};

export const SMButton = ({
  children,
  isActive = false,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${className} ${
        isActive ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-700"
      } p-2 border rounded-lg text-xs hover:bg-blue-400 hover:text-white duration-300`}
      {...props}
    >
      {children}
    </button>
  );
};

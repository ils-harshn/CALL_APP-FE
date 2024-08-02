export const ShowFormikError = ({ formik, name, className }) => {
  const touched = formik.touched[name];
  const error = formik.errors[name];

  if (!touched || !error) {
    return null;
  }

  return <div className={`text-red-500 text-xs ${className}`}>{error}</div>;
};

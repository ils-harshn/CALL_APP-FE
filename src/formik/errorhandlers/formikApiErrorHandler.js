const formikApiErrorHandler = {
  setErrors_400: (formik, apiErrors) => {
    const formikErrors = {};
    apiErrors.forEach(({ field, message }) => {
      formikErrors[field] = message;
    });
    formik.setErrors(formikErrors);
  },
};

export default formikApiErrorHandler;

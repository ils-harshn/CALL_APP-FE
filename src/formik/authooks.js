import { useFormik } from "formik";
import * as Yup from "yup";

export const useRegisterFormik = ({ ...props }) =>
  useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        // .min(3, "Username must be at least 3 characters")
        // .max(20, "Username must not exceed 20 characters")
        .required("Username is required"),
      email: Yup.string()
        // .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        // .min(8, "Password must be at least 8 characters")
        // .matches(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        // )
        .required("Password is required"),
    }),
    ...props,
  });

export const useLoginFormik = ({ ...props }) =>
  useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    ...props,
  });

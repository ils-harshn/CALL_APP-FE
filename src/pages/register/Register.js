import React from "react";
import { Label } from "../../components/Labels";
import { TextInput } from "../../components/TextInput";
import { AuthButton } from "../../components/Buttons";
import { A } from "../../components/Links";
import { useRegisterFormik } from "../../formik/authooks";
import { ShowFormikError } from "../../components/Errors";
import docmetadata from "../../utils/docmetadata";
import { useRegisterMutation } from "../../apis/auth/queryHooks";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";
import formikApiErrorHandler from "../../formik/errorhandlers/formikApiErrorHandler";
import apierrorhandler from "../../utils/apierrorhandler";

const Form = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useRegisterMutation({
    onSuccess: (data) => {
      navigate(ROUTES.EMAIL_VERIFICATION, {
        state: data.data,
      });
    },
    onError: (error) => {
      apierrorhandler(error, {
        400: () =>
          formikApiErrorHandler.setErrors_400(
            formik,
            error.response.data.errors
          ),
      });
    },
  });

  const formik = useRegisterFormik({
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Label htmlFor="username">Username</Label>
        <TextInput
          name="username"
          placeholder="Enter Username"
          className="w-full mt-2"
          autoComplete="off"
          {...formik.getFieldProps("username")}
        />
        <ShowFormikError formik={formik} name="username" />
      </div>
      <div className="mt-4">
        <Label htmlFor="email">Email Address</Label>
        <TextInput
          name="email"
          placeholder="Enter Email Address"
          className="w-full mt-2"
          autoComplete="off"
          {...formik.getFieldProps("email")}
        />
        <ShowFormikError formik={formik} name="email" />
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <TextInput
          name="password"
          placeholder="Enter Password"
          className="w-full mt-2"
          type="password"
          autoComplete="off"
          {...formik.getFieldProps("password")}
        />
        <ShowFormikError formik={formik} name="password" />
      </div>

      <div className="mt-4">
        <AuthButton type="submit" disabled={isLoading}>
          {isLoading ? "Please Wait..." : "Sign Up"}
        </AuthButton>
      </div>

      <div className="mt-4 text-center">
        Already have an account? <A href={ROUTES.LOGIN}>Log In</A>
      </div>
    </form>
  );
};

const Register = () => {
  docmetadata({
    title: "Sign Up - SpeakEasy",
  });

  return (
    <div className="w-screen h-screen bg-auth-screen">
      <div className="min-w-[280px] max-w-[520px] h-screen bg-auth-card p-12 border-r-2">
        <div>
          <h1 className="text-2xl">
            Welcome to <span className="font-bold">SpeakEasy</span>
          </h1>
          <p>Speak freely, connect globally.</p>
          <hr className="mt-6" />
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-center mb-4">Sign Up</h2>
            <Form />
          </div>

          <hr className="mt-6" />

          <div className="mt-6">
            <p className="text-center">
              <A>Terms and conditions</A> & <A>Privacy Policy</A>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

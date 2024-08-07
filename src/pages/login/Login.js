import React from "react";
import { Label } from "../../components/Labels";
import { TextInput } from "../../components/TextInput";
import { AuthButton } from "../../components/Buttons";
import { A } from "../../components/Links";
import { useLoginFormik } from "../../formik/authooks";
import { ShowFormikError } from "../../components/Errors";
import docmetadata from "../../utils/docmetadata";
import ROUTES from "../../routes";
import { useLoginMutation } from "../../apis/auth/queryHooks";
import apierrorhandler from "../../utils/apierrorhandler";
import formikApiErrorHandler from "../../formik/errorhandlers/formikApiErrorHandler";
import notify from "../../utils/notify";

const Form = () => {
  const { mutate, isLoading } = useLoginMutation({
    onSuccess: (values) => {
      localStorage.setItem("token", values.token);
      notify.info("Logged in successfully!");
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

  const handleSubmit = (values) => {
    mutate(values);
  };

  const formik = useLoginFormik({
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-4">
        <Label>Email Address</Label>
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
        <Label>Password</Label>
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
          {isLoading ? "Please Wait..." : "Log In"}
        </AuthButton>
      </div>

      <div className="mt-4 text-center">
        Don't have an account, consider <A href={ROUTES.REGISTER}>Sign Up</A>
      </div>
    </form>
  );
};

const Login = () => {
  docmetadata({
    title: "Sign In - SpeakEasy",
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
            <h2 className="text-lg font-semibold text-center mb-4">Sign In</h2>
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

export default Login;

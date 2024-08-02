import React, { useState } from "react";
import { Label } from "../../components/Labels";
import { TextInput } from "../../components/TextInput";
import { AuthButton } from "../../components/Buttons";
import { A } from "../../components/Links";
import { useRegisterFormik } from "../../formik/authooks";
import { ShowFormikError } from "../../components/Errors";

const OTPVerification = ({ data }) => {
  return (
    <form>
      <div>
        <p>Email have been sent to your email address.</p>
        <p>Please enter the OTP provided in the email.</p>
      </div>
      <div className="mt-4">
        <Label>
          Verify OTP for <span className="font-semibold">({data.email})</span>
        </Label>
        <TextInput name="otp" placeholder="Enter OTP" className="w-full mt-2" />
      </div>

      <div className="mt-4">
        <AuthButton type="submit">Verify</AuthButton>
      </div>
    </form>
  );
};

const AskDetails = ({ onSubmit }) => {
  const formik = useRegisterFormik({
    onSubmit: onSubmit,
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
        <AuthButton type="submit">Sign Up</AuthButton>
      </div>

      <div className="mt-4 text-center">
        Already have an account? <A href="/login">Log In</A>
      </div>
    </form>
  );
};

const Form = () => {
  const [data, setData] = useState();

  const onDetails = (values) => {
    setData(values);
  };

  if (data) return <OTPVerification data={data} />;

  return <AskDetails onSubmit={onDetails} />;
};

const Register = () => {
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

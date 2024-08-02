import React from "react";
import { Label } from "../../components/Labels";
import { TextInput } from "../../components/TextInput";
import { AuthButton } from "../../components/Buttons";
import { A } from "../../components/Links";

const Form = () => {
  return (
    <form>
      <div className="mt-4">
        <Label htmlFor="email">Email Address</Label>
        <TextInput
          id="email"
          placeholder="Enter Email Address"
          className="w-full mt-2"
          autoComplete="off"
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <TextInput
          id="password"
          placeholder="Enter Password"
          className="w-full mt-2"
          type="password"
          autoComplete="off"
        />
      </div>

      <div className="mt-4">
        <AuthButton>Log In</AuthButton>
      </div>

      <div className="mt-4 text-center">
        Don't have an account, consider <A href="/signup">Sign Up</A>
      </div>
    </form>
  );
};

const Login = () => {
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

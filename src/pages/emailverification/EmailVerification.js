import { useEffect, useState } from "react";
import { AuthButton, SecondaryButton } from "../../components/Buttons";
import { TextInput } from "../../components/TextInput";
import { Label } from "../../components/Labels";
import { A } from "../../components/Links";
import docmetadata from "../../utils/docmetadata";
import ROUTES from "../../routes";
import { useLocation, useNavigate } from "react-router-dom";
import authvalidators from "../../validators/authvalidators";
import { useVerifyEmailFormik } from "../../formik/authooks";
import { ShowFormikError } from "../../components/Errors";
import {
  useResendVerifyEmailOTPMutation,
  useVerifyEmailMutation,
} from "../../apis/auth/queryHooks";
import apierrorhandler from "../../utils/apierrorhandler";
import formikApiErrorHandler from "../../formik/errorhandlers/formikApiErrorHandler";
import notify from "../../utils/notify";

const ResendOTP = ({ data, formik }) => {
  const RESEND_OTP_AFTER = 30;
  const [resendDisabled, setResendDisabled] = useState(true);
  const [showAlternative, setShowAlternative] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_OTP_AFTER);

  const { mutate, isLoading } = useResendVerifyEmailOTPMutation({
    onSuccess: () => {
      notify.info("OTP resend successfully");
      setResendDisabled(true);
      setShowAlternative(true);
    },
    onError: (error) => {
      setResendDisabled(true);
      apierrorhandler(error, {
        400: () =>
          formikApiErrorHandler.setErrors_400(
            formik,
            error.response.data.errors
          ),
      });
    },
  });

  const handleResendOTP = () => {
    mutate({
      email: data.email,
    });
  };

  useEffect(() => {
    let timer;
    if (resendDisabled && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
      setCountdown(RESEND_OTP_AFTER);
    }
    return () => clearInterval(timer);
  }, [resendDisabled, countdown]);

  return (
    <>
      <div className="mt-4">
        <SecondaryButton
          type="button"
          disabled={resendDisabled || isLoading}
          onClick={handleResendOTP}
        >
          {resendDisabled ? `Resend OTP (${countdown}s)` : "Resend OTP"}
        </SecondaryButton>
      </div>

      {showAlternative === true ? (
        <>
          <p className="text-center mt-4">or</p>
          <div className="mt-4 text-center">
            Not receiving OTP,{" "}
            <A
              href={ROUTES.REGISTER}
              title="You can again try signing up with a new email!"
            >
              maybe your entered email is wrong?
            </A>
          </div>
        </>
      ) : null}
    </>
  );
};

const Form = ({ data }) => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useVerifyEmailMutation({
    onSuccess: () => {
      notify.info("Account created successfully");
      notify.info("You can now login!");
      navigate(ROUTES.LOGIN);
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

  const formik = useVerifyEmailFormik({
    onSubmit: (values) => {
      mutate({
        email: data.email,
        otp: values.otp,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <p>Email have been sent to your email address.</p>
        <p>Please enter the OTP provided in the email.</p>
      </div>
      <div className="mt-4">
        <Label>
          Verify OTP for <span className="font-semibold">({data.email})</span>
        </Label>
        <TextInput
          name="otp"
          placeholder="Enter OTP"
          className="w-full mt-2"
          {...formik.getFieldProps("otp")}
        />
        <ShowFormikError formik={formik} name="otp" />
      </div>

      <div className="mt-4">
        <AuthButton type="submit" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
        </AuthButton>
      </div>
      <ResendOTP data={data} formik={formik} />
    </form>
  );
};

const EmailVerification = () => {
  docmetadata({
    title: "Verify Email - SpeakEasy",
  });

  const data = useLocation().state;
  const isValidData = authvalidators.emailVerificationState.isValidSync(data);

  if (isValidData)
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
              <h2 className="text-lg font-semibold text-center mb-4">
                Verify your email
              </h2>
              <Form data={data} />
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
  else return <A href={ROUTES.REGISTER}>No Data Found</A>;
};

export default EmailVerification;

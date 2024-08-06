import * as Yup from "yup";

const authvalidators = {
  emailVerificationState: Yup.object().shape({
    email: Yup.string().email().required(),
  }),
};

export default authvalidators;

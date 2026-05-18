import * as Yup from "yup";

import { LockIcon, MailIcon } from "@/assets";
import { CustomButton, CustomFormikInput, FormikWrapper } from "@/components";
import { AppUrls } from "@/constants";
import { useAppDispatch } from "@/redux";
import { Link } from "react-router-dom";
import { getAuthData, handleSignIn } from "../auth-slice/auth-slice";
import { useSelector } from "react-redux";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Email must be valid")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is not valid",
    )
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const LoginForm = () => {
  const { isAuthLoading } = useSelector(getAuthData);
  const dispatch = useAppDispatch();

  const initialValues = {
    email: "admin@example.com",
    password: "Admin@12345",
  };

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(handleSignIn(values));
  };

  return (
    <FormikWrapper
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginValidationSchema}
      Component={() => (
        <div className="flex flex-col gap-y-8">
          <CustomFormikInput
            name="email"
            label="Email"
            isMandatory
            placeholder="Enter your email"
            leftIcon={
              <div className="p-2 px-3 bg-white rounded-leaf ">
                <MailIcon size={20} stroke="orange" />
              </div>
            }
          />

          <CustomFormikInput
            isMandatory
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            leftIcon={
              <div className="p-2 px-3 bg-white rounded-leaf ">
                <LockIcon size={20} stroke="orange" />
              </div>
            }
          />

          <CustomButton size="lg" isLoading={isAuthLoading}>
            Sign In
          </CustomButton>

          <Link
            to={AppUrls.FORGOT_PASSWORD}
            className="text-center w-fit mx-auto"
          >
            Forgot password?
          </Link>
        </div>
      )}
    />
  );
};

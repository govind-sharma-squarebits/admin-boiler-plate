import * as Yup from "yup";

import { CustomButton, CustomFormikInput, FormikWrapper } from "@/components";
import { MailIcon, LockIcon } from "@/assets";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux";
import { setAuthenticated } from "../auth-slice/auth-slice";

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
  const dispatch = useAppDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const { mutate: loginMutation } = useMutation({
    mutationFn: async (data: typeof initialValues) => {
      console.log("data", data);
      dispatch(setAuthenticated(true));
    },
  });

  const handleSubmit = (values: typeof initialValues) => {
    loginMutation(values);
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

          <CustomButton size="lg">Sign In</CustomButton>
        </div>
      )}
    />
  );
};

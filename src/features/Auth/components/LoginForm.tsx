import * as Yup from "yup";

import { CustomFormikInput, FormikWrapper } from "@/components";

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
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <FormikWrapper
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginValidationSchema}
      Component={() => (
        <div className="flex flex-col gap-y-8">
          <CustomFormikInput name="email" label="Email" />
          <CustomFormikInput name="password" label="Password" />
        </div>
      )}
    />
  );
};

import { MailIcon } from "@/assets";
import { CustomButton, CustomFormikInput, FormikWrapper } from "@/components";
import { AppUrls } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Email must be valid")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is not valid",
    )
    .required("Email is required"),
});

export const ForgotPasswordForm = () => {
  const initialValues = {
    email: "",
  };

  const { mutate: forgotPasswordMutation } = useMutation({
    mutationFn: async (data: typeof initialValues) => {
      console.log("data", data);
    },
  });

  const handleSubmit = (values: typeof initialValues) => {
    forgotPasswordMutation(values);
  };

  return (
    <FormikWrapper
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={forgotPasswordValidationSchema}
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

          <CustomButton size="lg">Submit</CustomButton>

          <Link to={AppUrls.LOGIN} className="text-center w-fit mx-auto">
            Back to login
          </Link>
        </div>
      )}
    />
  );
};

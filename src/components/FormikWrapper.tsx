import type { FormikWrapperProps } from "@/types";
import { Form, Formik, type FormikValues } from "formik";

export const FormikWrapper = <T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  Component,
  ...props
}: FormikWrapperProps<T>) => {
  return (
    <Formik<T>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      {...props}
    >
      {(formik) => {
        return (
          <Form autoComplete="off" style={{ width: "100%" }} method="post">
            {Component(formik)}
          </Form>
        );
      }}
    </Formik>
  );
};

import type { FormikConfig, FormikHelpers, FormikProps, FormikValues } from "formik";

export interface FormikWrapperProps<T extends FormikValues> {
    initialValues: T;
    validationSchema?: FormikConfig<T>["validationSchema"];
    onSubmit: (
        values: T,
        formikHelpers: FormikHelpers<T>
    ) => void | Promise<void>;
    Component: (formik: FormikProps<T>) => React.ReactNode;
}

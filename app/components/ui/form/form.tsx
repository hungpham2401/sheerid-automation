import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import classNames from "classnames";
import { Label } from "~/components/ui/label/label";
import styles from "./form.module.css";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={classNames(styles.item, className)} {...props} />
    </FormItemContext.Provider>
  );
};
FormItem.displayName = "FormItem";

const FormLabel: React.FC<React.ComponentProps<typeof LabelPrimitive.Root>> = ({ className, ...props }) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={classNames(styles.label, error && styles.labelError, className)}
      htmlFor={formItemId}
      {...props}
    />
  );
};
FormLabel.displayName = "FormLabel";

const FormControl: React.FC<React.ComponentProps<typeof Slot>> = ({ ...props }) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
};
FormControl.displayName = "FormControl";

const FormDescription: React.FC<React.ComponentProps<"p">> = ({ className, ...props }) => {
  const { formDescriptionId } = useFormField();

  return <p id={formDescriptionId} className={classNames(styles.description, className)} {...props} />;
};
FormDescription.displayName = "FormDescription";

const FormMessage: React.FC<React.ComponentProps<"p">> = ({ className, children, ...props }) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p id={formMessageId} className={classNames(styles.message, className)} {...props}>
      {body}
    </p>
  );
};
FormMessage.displayName = "FormMessage";

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };

import React from "react";
import { Form, Checkbox } from "antd";
import { Controller, FieldError } from "react-hook-form";

interface CheckboxInputProps {
  name: string;
  label?: string;
  control: any; // Replace `any` with the specific type from react-hook-form
  errors?: FieldError;
  defaultChecked?: boolean;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  name,
  label,
  control,
  errors,
  defaultChecked = false,
}) => {
  return (
    <Form.Item
      validateStatus={errors ? "error" : ""}
      help={errors?.message}
    >
      <Controller
        name={name}
        control={control}
        defaultValue={defaultChecked}
        render={({ field }) => (
          <Checkbox {...field} checked={field.value}>
            {label}
          </Checkbox>
        )}
      />
    </Form.Item>
  );
};

export default CheckboxInput;

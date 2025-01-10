import React from "react";
import { Form, Input } from "antd";
import { Controller, FieldError } from "react-hook-form";

interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  control: any; // Replace `any` with the specific type from react-hook-form
  errors?: FieldError;
  disabled?: boolean;
  type?: "text" | "password" | "number";
  [key: string]: any; // Accept additional props dynamically
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  placeholder,
  control,
  errors,
  type = "text",
  disabled = false,
  ...props
}) => {
  return (
    <Form.Item
      label={label}
      validateStatus={errors ? "error" : ""}
      help={errors?.message}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password {...field} placeholder={placeholder} {...props} disabled={disabled} />
          ) : (
            <Input {...field} placeholder={placeholder}  {...props} type={type} disabled={disabled} />
          )
        }
      />
    </Form.Item>
  );
};

export default TextInput;

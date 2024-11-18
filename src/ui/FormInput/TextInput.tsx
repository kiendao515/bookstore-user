import React from "react";
import { Form, Input } from "antd";
import { Controller, FieldError } from "react-hook-form";

interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  control: any; // Replace `any` with the specific type from react-hook-form
  errors?: FieldError;
  type?: "text" | "password";
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  placeholder,
  control,
  errors,
  type = "text",
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
            <Input.Password {...field} placeholder={placeholder} />
          ) : (
            <Input {...field} placeholder={placeholder} />
          )
        }
      />
    </Form.Item>
  );
};

export default TextInput;

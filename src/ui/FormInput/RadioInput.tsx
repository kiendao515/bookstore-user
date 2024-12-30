import React from "react";
import { Controller, FieldError } from "react-hook-form";
import { Form, Radio, Space } from "antd";

interface RadioInputProps {
    name: string;
    label: string;
    control: any; // React Hook Form's control object
    errors?: FieldError; // React Hook Form's errors object
    options: { label: string; value: any }[]; // Array of radio options
    rules?: any; // Validation rules for the field
    direction?: "vertical" | "horizontal"; // Layout direction of the radios
    [key: string]: any; // Accept additional props dynamically
}

const RadioInput: React.FC<RadioInputProps> = ({
    name,
    label,
    control,
    errors,
    options,
    rules = {},
    direction = "vertical",
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
                rules={rules}
                render={({ field }) => (
                    <Radio.Group {...field}>
                        <Space direction={direction}>
                            {options.map((option) => (
                                <Radio key={option.value} value={option.value}>
                                    {option.label}
                                </Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                )}
            />
        </Form.Item>
    );
};

export default RadioInput;

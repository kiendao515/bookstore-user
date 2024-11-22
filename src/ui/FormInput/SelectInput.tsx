import { Select, Form } from 'antd';
import { Controller } from 'react-hook-form';

interface SelectInputProps {
    name: string;
    label: string;
    placeholder?: string;
    control: any;
    options: { value: string | number; label: string }[];
    errors?: any;
    [key: string]: any; // Accept additional props dynamically
}

const SelectInput: React.FC<SelectInputProps> = ({ name, label, placeholder, control, options, errors, ...props }) => {
    return (
        <Form.Item
            label={label}
            validateStatus={errors ? 'error' : ''}
            help={errors?.message}
        >
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <Select
                        placeholder={placeholder}
                        {...field}
                        status={fieldState.error ? 'error' : ''}
                        options={options}
                        {...props}
                    />
                )}
            />
        </Form.Item>
    );
};

export default SelectInput;

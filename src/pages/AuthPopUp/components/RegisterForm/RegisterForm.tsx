import { useState } from "react";
import { Button, Form, message, Typography } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import { userRegisterRequest } from "@/api/auth";
import { IFormValue, IRegisterFormProps } from "./interface";
import TextInput from "@/ui/FormInput/TextInput";
import CheckboxInput from "@/ui/FormInput/CheckBoxInput";

const { Text } = Typography;

const RegisterForm = (props: IRegisterFormProps) => {
    const { setIndex } = props;
    const [errMsg, setErrMsg] = useState("");

    const schema = yup.object().shape({
        email: yup
            .string()
            .trim()
            .email("Please enter a valid email.")
            .required("Email is required.")
            .max(100, "Email must be less than 100 characters."),
        full_name: yup
            .string()
            .trim()
            .required("Full name is required.")
            .max(100, "Full name must be less than 100 characters."),
        password: yup
            .string()
            .required("Password is required.")
            .min(6, "Password must contain at least 6 characters.")
            .max(20, "Password must be less than 20 characters."),
        confirm_password: yup
            .string()
            .required("Please confirm your password.")
            .oneOf([yup.ref("password")], "Passwords must match."),
        policy: yup
            .boolean()
            .oneOf([true], "You must accept the privacy policy.")
            .required(),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormValue>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const { mutate, isLoading } = useMutation(userRegisterRequest, {
        onSuccess: (data) => {
            if (data.result) {
                setIndex(3); // Navigate to success step
            } else {
                setErrMsg(data.reason);
            }
        },
        onError: (error: any) => {
        message.error(error?.response?.data?.message || "Registration failed.");
        },
    });

    const onSubmit = (values: IFormValue) => {
        mutate(values);
    };

    return (
        <Form
            layout="vertical"
            style={{ maxWidth: 600, margin: "0 auto" }}
            onFinish={handleSubmit(onSubmit)}
            autoComplete="off"
        >
            <TextInput
                name="email"
                label="Email"
                placeholder="Enter your email"
                control={control}
                errors={errors.email}
            />
            <TextInput
                name="full_name"
                label="Full Name"
                placeholder="Enter your full name"
                control={control}
                errors={errors.full_name}
            />
            <TextInput
                name="password"
                label="Password"
                placeholder="Enter your password"
                control={control}
                errors={errors.password}
                type={"password"}
            />
            <TextInput
                name="confirm_password"
                label="Confirm Password"
                placeholder="Confirm your password"
                control={control}
                errors={errors.confirm_password}
                type={"password"}
            />
            <CheckboxInput
                name="policy"
                label="I agree to the Privacy Policy and Terms of Service"
                control={control}
                errors={errors.policy}
            />
            {errMsg && <Text type="danger">{errMsg}</Text>}
            <Button type="primary" htmlType="submit" loading={isLoading} block>
                Register
            </Button>
        </Form>
    );
};

export default RegisterForm;

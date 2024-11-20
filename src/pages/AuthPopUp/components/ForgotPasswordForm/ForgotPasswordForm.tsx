import { sendResetPassword } from "@/api/auth";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { IForgotPasswordForm, IFormValue } from "./interface";
import { Button, Form, message, Typography } from "antd";
import TextInput from "@/ui/FormInput/TextInput";

const { Text } = Typography;

const ForgotPasswordForm = (props: IForgotPasswordForm) => {
    const { setIndex } = props;

    const schema = yup.object().shape({
        email: yup
            .string()
            .trim()
            .email("This must be a valid email.")
            .required("This field is required.")
            .max(100, "Email must be less than 100 characters."),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormValue>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const { mutate, isLoading } = useMutation(sendResetPassword, {
        onSuccess: (data) => {
            if (data.result) {
                message.success(data.reason);
            } else {
                message.error(data.reason);
            }
        },
        onError: (error: any) => {
            message.error(error?.response?.data?.message || "An error occurred.");
        },
    });

    const onSubmit = (values: IFormValue) => {
        mutate(values);
    };

    return (
        <Form
            layout="vertical"
            style={{ maxWidth: 400, margin: "0 auto" }}
            onFinish={handleSubmit(onSubmit)}
        >
            <TextInput
                name="email"
                label="Email"
                placeholder="Enter your email"
                control={control}
                errors={errors.email}
            />

            <Form.Item>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Button type="link" onClick={() => setIndex(1)} style={{ padding: 0 }}>
                        Quay về trang đăng nhập
                    </Button>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Gửi
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default ForgotPasswordForm;
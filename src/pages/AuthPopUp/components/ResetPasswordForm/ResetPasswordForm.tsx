import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Form, Typography } from "antd";
import * as yup from "yup";
import TextInput from "@/ui/FormInput/TextInput";
import { IFormValue, IResetPasswordForm } from "./interface";
import { resetPassword } from "@/api/auth";

const { Text } = Typography;

const ResetPasswordForm = (props: IResetPasswordForm) => {
    const { setIndex } = props;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") || "";

    const schema = yup.object().shape({
        new_password: yup
            .string()
            .trim()
            .required("This field is required.")
            .min(6, "Password must be at least 6 characters.")
            .max(100, "Password must be less than 100 characters."),
        confirm_password: yup
            .string()
            .trim()
            .required("This field is required.")
            .oneOf([yup.ref("new_password")], "Passwords must match."),
        token: yup.string().required("Token is required."),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormValue>({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            token,
        },
    });

    const { mutate, isLoading } = useMutation(resetPassword, {
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message);
                setIndex(1);
                navigate("/?is_change_pwd_success=1");
            } else {
                toast.error(data.message);
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "An error occurred.");
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
                name="new_password"
                label="Mật khẩu mới"
                placeholder="Enter your new password"
                control={control}
                errors={errors.new_password}
                type={"password"}
            />

            <TextInput
                name="confirm_password"
                label="Xác nhận mật khẩu"
                placeholder="Confirm your new password"
                control={control}
                errors={errors.confirm_password}
                type={"password"}
            />

            <input type="hidden" value={token} {...control.register("token")} />

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} block>
                    Gửi
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ResetPasswordForm;

import { useEffect, useState } from "react";
import { Button, Form, Typography, Space, notification } from "antd";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "react-query";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { COOKIES, setCookies } from "@/utils/cookies";
import { setAuth } from "@/store/duck/auth/slice";
import { setToggleByKey } from "@/store/duck/togglePopUp/slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { IFormValue, ILoginForm } from "./interface";
import { userLoginRequest } from "@/api/auth";
import TextInput from "@/ui/FormInput/TextInput";
import CheckboxInput from "@/ui/FormInput/CheckBoxInput";

const { Text } = Typography;

const LoginForm = (props: ILoginForm) => {
    const { setIndex } = props; // Use `setIndex` to navigate between forms
    const [api, contextHolder] = notification.useNotification();
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const { toggleAuth } = useAppSelector((state) => state.togglePopUp);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (searchParams.get("is_confirm_success") === "1") {
            toast.success("Registration confirmed successfully!");
        }
    }, [searchParams]);

    const schema = yup.object().shape({
        email: yup
            .string()
            .trim()
            .email("Please enter a valid email.")
            .required("Email is required.")
            .max(100, "Email must be less than 100 characters."),
        password: yup
            .string()
            .required("Password is required.")
            .min(6, "Password must be at least 6 characters.")
            .max(20, "Password must be less than 20 characters."),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormValue>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const { mutate, isLoading } = useMutation(userLoginRequest, {
        onSuccess: (data) => {
            if (data.result) {
                dispatch(setAuth({ user: data.data.user }));
                setCookies(COOKIES.token, data.data.token);
                api.open({
                    message: "Success",
                    description: "You have successfully logged in.",
                    icon: <i className="ri-checkbox-circle-line" />,
                })
                dispatch(setToggleByKey({ key: "toggleAuth", value: !toggleAuth }));
                navigate(location.pathname, { replace: true });
            } else {
                api.open({
                    message: "Login Failed",
                    description: data.reason,
                    icon: <i className="ri-error-warning-line" />,
                    type: "error",
                })
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Login failed.");
        },
    });

    const onSubmit = (values: IFormValue) => {
        mutate(values);
    };

    return (
        <>
            {contextHolder}
            <Form
                layout="vertical"
                style={{ maxWidth: 400, margin: "0 auto" }}
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
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    control={control}
                    errors={errors.password}
                    type="password"
                />
                {errorMsg && <Text type="danger">{errorMsg}</Text>}
                <CheckboxInput
                    name="remember"
                    label="Remember me"
                    control={control}
                    errors={errors.remember}
                />
                <Form.Item>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Button type="primary" htmlType="submit" loading={isLoading} block>
                            Submit
                        </Button>
                        <Button type="link" onClick={() => setIndex(4)} block>
                            Forgot Password?
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginForm;

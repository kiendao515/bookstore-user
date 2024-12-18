import NarrowIcon from "@/icons/NarrowIcon";
import { IChangePasswordProps, IFormValue } from "./interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "react-query";
import { changePassword } from "@/api/auth";
import toast from "react-hot-toast";
import { COOKIES, removeCookies } from "@/utils/cookies";
import { useAppDispatch } from "@/hooks/useRedux";
import { setLogout } from "@/store/duck/auth/slice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Button, Typography } from "antd";
import TextInput from "@/ui/FormInput/TextInput";

const { Text } = Typography;

const ChangePassword = (props: IChangePasswordProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        old_password: yup.string().required("This field is required.").max(100),
        new_password: yup.string().required("This field is required.").max(100),
        confirm_new_password: yup.string().required("This field is required.").max(100),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormValue>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const { mutate, isLoading } = useMutation(changePassword, {
        onSuccess: () => {
            toast.success("Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại.");
            removeCookies(COOKIES.user);
            removeCookies(COOKIES.token);
            dispatch(setLogout());
            navigate("/");
        },
        onError: () => {
            toast.error("Mật khẩu cũ không đúng hoặc xảy ra lỗi.");
        },
    });

    const onHandleSubmit = async (values: IFormValue) => {
        if (values.new_password !== values.confirm_new_password) {
            toast.error("Mật khẩu và mật khẩu xác nhận phải giống nhau");
            return;
        }
        mutate(values);
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1280);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            {!isMobile && (
                <Text className="mobile-title" style={{ color: "#888888" }}>[ đổi mật khẩu ]</Text>
            )}
            <Form
                layout="vertical"
                onFinish={handleSubmit(onHandleSubmit)}
                style={{ marginTop: isMobile ? 20 : 30, paddingBottom: 200 }}
            >
                <TextInput
                    name="old_password"
                    label="Mật khẩu cũ"
                    placeholder="Nhập mật khẩu cũ"
                    control={control}
                    errors={errors.old_password}
                    type="password"
                />

                <TextInput
                    name="new_password"
                    label="Mật khẩu mới"
                    placeholder="Nhập mật khẩu mới"
                    control={control}
                    errors={errors.new_password}
                    type="password"
                />

                <TextInput
                    name="confirm_new_password"
                    label="Xác nhận lại mật khẩu"
                    placeholder="Xác nhận mật khẩu mới"
                    control={control}
                    errors={errors.confirm_new_password}
                    type="password"
                />

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        icon={<NarrowIcon />}
                        style={{
                            marginTop: isMobile ? 30 : 70,
                            width: isMobile ? "100%" : 92,
                            height: isMobile ? 35 : 30,
                        }}
                    >
                        Lưu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePassword;

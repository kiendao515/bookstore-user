import { Form, Button, Typography, notification } from "antd";
import NarrowIcon from "@/icons/NarrowIcon";
import { IFormValue, IUserInfoProps } from "./interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { updateUserInfo, useUserProfile } from "@/api/auth";
import { useEffect, useState } from "react";
import moment from "moment";
import { useMutation } from "react-query";
import { phoneRegExp } from "@/utils/constant";
import { useAppDispatch } from "@/hooks/useRedux";
import { setAuth } from "@/store/duck/auth/slice";
import TextInput from "@/ui/FormInput/TextInput";
import DateInput from "@/ui/FormInput/DateInput";

const { Text } = Typography;

const UserInfo = (props: IUserInfoProps) => {
    const dispatch = useAppDispatch();
    const [reload, setReload] = useState(0);
    const { user } = useUserProfile(reload);

    const schema = yup.object().shape({
        full_name: yup.string().trim().required("Vui lòng nhập họ tên").max(100),
        date_of_birth: yup.date().required("Vui lòng nhập ngày sinh").max(new Date()),
        phone_number: yup
            .string()
            .matches(phoneRegExp, "Số điện thoại không hợp lệ.")
            .required("Vui lòng nhập số điện thoại"),
    });

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1280);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const formMethod = useForm<IFormValue>({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {},
    });

    useEffect(() => {
        formMethod.reset({
            email: user?.data?.email,
            full_name: user?.data?.full_name,
            phone_number: user?.data?.phone_number,
            date_of_birth: user?.data?.date_of_birth
                ? moment(user.data.date_of_birth)
                : undefined,
        });
    }, [user, formMethod]);

    const { mutate, isLoading } = useMutation(updateUserInfo, {
        onSuccess: (data) => {
            if (data.result) {
                notification.success({
                    message: "Cập nhật thông tin thành công",
                });
                dispatch(
                    setAuth({
                        user: data.data,
                    })
                );
                setReload((prev) => prev + 1);
            } else {
                notification.error({
                    message: "Có lỗi xảy ra khi cập nhật",
                });
            }
        },
        onError: (error: any) => {
            notification.error({
                message: error?.response?.data?.message || "Cập nhật thất bại",
            });
        },
    });

    const onHandleSubmit = (value: IFormValue) => {
        mutate({
            full_name: value.full_name,
            date_of_birth: moment(value.date_of_birth).format("YYYY-MM-DD HH:mm:ss"),
            phone_number: value.phone_number,
        });
    };

    return (
        <div style={{ width: "100%" }}>
            {!isMobile && <Text style={{ color: "#888888" }}>[ Thông tin cá nhân ]</Text>}
            <Form
                layout="vertical"
                onFinish={formMethod.handleSubmit(onHandleSubmit)}
                style={{
                    marginTop: isMobile ? 20 : 30,
                    paddingBottom: 200,
                }}
            >
                <TextInput
                    name="email"
                    label="Email đăng nhập"
                    placeholder="Email đăng nhập"
                    disabled
                    control={formMethod.control}
                    errors={formMethod.formState.errors.email}
                />

                <TextInput
                    name="full_name"
                    label="Họ và Tên"
                    placeholder="Họ tên"
                    control={formMethod.control}
                    errors={formMethod.formState.errors.full_name}
                />

                <TextInput
                    name="phone_number"
                    label="Số điện thoại"
                    placeholder="Số điện thoại"
                    control={formMethod.control}
                    errors={formMethod.formState.errors.phone_number}
                />

                <DateInput
                    name="date_of_birth"
                    label="Ngày sinh"
                    placeholder="Ngày sinh"
                    control={formMethod.control}
                    errors={formMethod.formState.errors.date_of_birth}
                    showTime // Additional prop to show time picker
                    disabledDate={(current) => current && current > moment().endOf('day')} // Disable future dates
                />


                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    style={{
                        marginTop: isMobile ? 38 : 70,
                        width: isMobile ? "100%" : 92,
                        height: isMobile ? 35 : 30,
                    }}
                >
                    Lưu
                </Button>
            </Form>
        </div>
    );
};

export default UserInfo;

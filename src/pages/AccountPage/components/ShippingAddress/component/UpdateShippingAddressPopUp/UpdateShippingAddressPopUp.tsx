import * as yup from "yup";
import { IFormValue, IUpdateShippingAddressPopUp } from "./interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDistricts, useProvinces, useWards } from "@/api/order/queries";
import NarrowIcon from "@/icons/NarrowIcon";
import { updateShipment, useShippingAddressDetail } from "@/api/shipment";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { Form, Button, Checkbox, Space } from "antd";
import TextInput from "@/ui/FormInput/TextInput";
import SelectInput from "@/ui/FormInput/SelectInput";
import toast from "react-hot-toast";

const UpdateShippingAddressPopUp = (props: IUpdateShippingAddressPopUp) => {
    const { setReload, setToggle, id, reload } = props;
    const { shippingAddress } = useShippingAddressDetail(id, reload);

    const schema = yup.object().shape({
        full_name: yup.string().required("Vui lòng nhập thông tin").max(100),
        phone_number: yup.string().required("Vui lòng nhập thông tin").max(100),
        province_code: yup.string().required("Vui lòng nhập thông tin").max(100),
        district_code: yup.string().required("Vui lòng nhập thông tin").max(100),
        ward_code: yup.string().required("Vui lòng nhập thông tin").max(100),
        street: yup.string().required("Vui lòng nhập thông tin").max(100),
        default: yup.boolean().required("vui lòng chọn giá trị"),
    });

    const formMethod = useForm<IFormValue>({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {},
    });

    const { provinces } = useProvinces();
    const provinceCode = formMethod.watch("province_code");
    const districtCode = formMethod.watch("district_code");
    const { districts } = useDistricts(provinceCode || "");
    const { wards } = useWards(districtCode || "");

    useEffect(() => {
        if (shippingAddress?.data) {
            formMethod.reset({
                full_name: shippingAddress?.data?.full_name || "",
                phone_number: shippingAddress?.data?.phone_number || "",
                province_code: shippingAddress?.data?.province?.code || "",
                district_code: shippingAddress?.data?.district?.code || "",
                ward_code: shippingAddress?.data?.ward?.code || "",
                street: shippingAddress?.data?.street || "",
                default: shippingAddress?.data?.default || false,
            });
        }
    }, [shippingAddress, formMethod]);

    const { mutate, isLoading } = useMutation(updateShipment, {
        onSuccess: (data) => {
            if (data.result) {
                toast.success("Cập nhật địa chỉ giao hàng thành công");
                setReload((prev) => prev + 1);
                setToggle(false);
            } else {
                toast.error("Có lỗi khi cập nhật địa chỉ giao hàng");
            }
        },
        onError: () => {
            toast.error("Có lỗi khi cập nhật địa chỉ giao hàng");
        },
    });

    const onHandleSubmit = async (values: IFormValue) => {
        mutate({ ...values, id });
    };

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "900px",
                margin: "0 auto",
            }}
        >
            <Form
                layout="vertical"
                onFinish={formMethod.handleSubmit(onHandleSubmit)}
            >
                <TextInput
                    name="full_name"
                    label="Họ và Tên"
                    placeholder="Tên khách hàng"
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

                <SelectInput
                    name="province_code"
                    label="Tỉnh/Thành phố"
                    placeholder="Chọn tỉnh/thành phố"
                    control={formMethod.control}
                    options={(provinces?.data || []).map((province) => ({
                        value: province.code,
                        label: province.full_name,
                    }))}
                    errors={formMethod.formState.errors.province_code}
                />

                <SelectInput
                    name="district_code"
                    label="Quận/Huyện"
                    placeholder="Chọn quận/huyện"
                    control={formMethod.control}
                    options={(districts?.data || []).map((district) => ({
                        value: district.code,
                        label: district.full_name,
                    }))}
                    errors={formMethod.formState.errors.district_code}
                />

                <SelectInput
                    name="ward_code"
                    label="Xã/Phường"
                    placeholder="Chọn xã/phường"
                    control={formMethod.control}
                    options={(wards?.data || []).map((ward) => ({
                        value: ward.code,
                        label: ward.full_name,
                    }))}
                    errors={formMethod.formState.errors.ward_code}
                />

                <TextInput
                    name="street"
                    label="Số nhà, tên đường"
                    placeholder="Số nhà, tên đường"
                    control={formMethod.control}
                    errors={formMethod.formState.errors.street}
                />

                <Form.Item>
                    <Space>
                        <Checkbox {...formMethod.register("default")}>
                            Địa chỉ mặc định
                        </Checkbox>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            icon={<NarrowIcon />}
                        >
                            Cập nhật
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateShippingAddressPopUp;

import React, { useEffect, useMemo, useState } from "react";
import { Form, Input, Button, Select, Radio, Typography, Card, Divider, Space, Row, Col, message, FormProps } from "antd";
import MainLayout from "@/layout";
import { useDistricts, useFee, useProvinces, useWards } from "@/api/order/queries";
import { Controller, useForm } from "react-hook-form";
import { getUser } from "@/store/duck/auth/slice";
import { useAppSelector } from "@/hooks/useRedux";
import { calculateFee, createNewOrder, ICreateOrderRes } from "@/api/order";
import { useLocation, useNavigate } from "react-router-dom";
import { handleStatusBook } from "@/utils/common";
import { useShippingAddressDetail, useShippingAddresses } from "@/api/shipment";
import PopUp from "@/ui/PopUp/PopUp";
import ShippingAddressPopUp from "./components/ShippingAddressPopUp/ShippingAddressPopUp";
import TextInput from "@/ui/FormInput/TextInput";
import SelectInput from "@/ui/FormInput/SelectInput";

const { Title, Text } = Typography;

const Checkout = () => {
    const formMethod = useForm();
    const { watch, setValue, handleSubmit } = formMethod;
    const [selectedId, setSelectedId] = useState<string>();
    const { provinces } = useProvinces();
    const { districts } = useDistricts(watch("province_code") || "");
    const { wards } = useWards(watch("district_code") || "");
    const [provinceName, setProvinceName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const user = useAppSelector(getUser);
    const [fee, setFee] = useState(25000)
    const location = useLocation();
    const [reload, setReload] = useState(0);
    const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };
    const { shippingAddress } = useShippingAddressDetail(selectedId);
    const [toggleAddress, setToggleAddress] = useState(false);
    const { shippingAddresses } = useShippingAddresses({});
    const feeBody = useMemo(() => ({
        address: watch("street") || "",
        province: provinceName,
        district: districtName,
        weight: 2000,
        value: totalPrice,
    }), [districtName]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchFee = async () => {
            try {
                const rs = await calculateFee(feeBody);
                setFee(rs.data);
            } catch (error) {
                console.error("Failed to fetch fee:", error);
            }
        };

        if (feeBody.province && feeBody.district) {
            fetchFee();
        }
    }, [feeBody]);
    useEffect(() => {
        if (user.id != "") {
            formMethod.reset({
                customer_email: user.email
            })
        }
        if (shippingAddresses?.success) {
            if (shippingAddresses.data.length == 0) {
                return;
            }

            let shippingAddress = shippingAddresses?.data?.find((item) => item.default == true);
            if (!shippingAddress) {
                shippingAddress = shippingAddresses?.data[0];
            }
            formMethod.reset({
                customer_email: user.email || "",
                customer_name: shippingAddress?.full_name || "",
                customer_phone: shippingAddress?.phone_number || "",
                province_code: shippingAddress?.province.code || "",
                district_code: shippingAddress?.district.code || "",
                ward_code: shippingAddress?.ward.code || "",
                street: shippingAddress?.street || "",
            })
        }

    }, [shippingAddresses]);

    useEffect(() => {
        if (user.id != "") {
            formMethod.reset({
                customer_email: user.email
            })
        }
        if (shippingAddress?.data) {
            formMethod.reset({
                customer_email: user.email || "",
                customer_name: shippingAddress?.data?.full_name || "",
                customer_phone: shippingAddress?.data?.phone_number || "",
                province_code: shippingAddress?.data?.province.code || "",
                district_code: shippingAddress?.data?.district.code || "",
                ward_code: shippingAddress?.data?.ward.code || "",
                street: shippingAddress?.data?.street || "",
            })
            return;
        }
    }, [shippingAddress])

    useEffect(() => {
        if (shippingAddress?.data) {
            formMethod.reset({
                customer_email: user.email || "",
                customer_name: shippingAddress?.data?.full_name || "",
                customer_phone: shippingAddress?.data?.phone_number || "",
                province_code: shippingAddress?.data?.province?.code || "",
                district_code: shippingAddress?.data?.district?.code || "",
                ward_code: shippingAddress?.data?.ward?.code || "",
                street: shippingAddress?.data?.street || "",
            })
            return;
        }
        if (shippingAddresses?.success) {
            if (shippingAddresses.data.length == 0) {
                return;
            }

            let shippingAddress = shippingAddresses?.data?.find((item) => item.default == true);
            if (!shippingAddress) {
                shippingAddress = shippingAddresses?.data[0];
            }
            formMethod.reset({
                customer_email: user.email || "",
                customer_name: shippingAddress?.full_name || "",
                customer_phone: shippingAddress?.phone_number || "",
                province_code: shippingAddress?.province.code || "",
                district_code: shippingAddress?.district.code || "",
                ward_code: shippingAddress?.ward.code || "",
                street: shippingAddress?.street || "",
            })
        }
    }, [provinces, districts, wards]);

    const handleCheckout = async (values: any) => {
        console.log(values);
        const orderPayload = {
            customer_name: values.customerName,
            customer_phone: values.phone,
            email: user.email,
            order_items: cartItems.map((item: any) => ({
                book_inventory_id: item.book_inventory_id,
                quantity: item.quantity
            })),
            payment_method: values.paymentMethod === "cod" ? false : true,
            note: values.note || "",
            province_code: watch("province_code"),
            district_code: watch("district_code"),
            ward_code: watch("ward_code"),
            street: values.street,
        };

        try {
            const response = await createNewOrder(orderPayload);
            if (response.result) {
                message.success("Đặt hàng thành công!");
                if (values.paymentMethod !== "cod" && response.data != null && typeof response.data === 'string') {
                    window.location.href = response.data;
                } else if (typeof response.data == 'object') {
                    navigate("/order-result?orderId=" + response.data.orderCode);
                }

            }else{
                message.error(response?.reason)
            }
        } catch (error) {
            console.error("Failed to create order:", error);
            message.error("Đặt hàng thất bại. Vui lòng thử lại!");
        }
    };
    return (
        <MainLayout>
            <div style={{ padding: "20px" }}>
                <Form layout="vertical" onFinish={handleCheckout}>
                    <Row gutter={24}>
                        <Col xs={24} lg={14}>
                            <Card bordered style={{ marginBottom: "20px" }}>
                                <Title level={4} style={{ marginBottom: "20px" }}>
                                    Thông tin khách hàng
                                </Title>
                                <TextInput
                                    name="customer_name"
                                    label="Họ và Tên"
                                    placeholder="Tên khách hàng"
                                    control={formMethod.control}
                                    errors={formMethod.formState.errors.full_name}
                                />

                                <TextInput
                                    name="customer_phone"
                                    label="Số điện thoại"
                                    placeholder="Số điện thoại"
                                    control={formMethod.control}
                                    errors={formMethod.formState.errors.phone_number}
                                />
                                <Form.Item
                                    label="Email"
                                    name="email"
                                // rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ" }]}
                                >
                                    <Input value={user.email} defaultValue={user.email} disabled />
                                </Form.Item>
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
                                />
                                <Form.Item label="Ghi chú giao hàng" name="note">
                                    <Input.TextArea rows={3} placeholder="Ghi chú giao hàng (nếu có)" />
                                </Form.Item>
                                {
                                    user.id != "" && (
                                        <div className='mb-[5px] mt-[5px] w-full'>
                                            <button type='button' className="text-black bg-[#DFDFDF] hover:bg-[#9BC3FF] w-full xl:w-fit h-[42px] px-[5px]" onClick={() => setToggleAddress(!toggleAddress)}>
                                                chọn địa chỉ khác
                                            </button>
                                        </div>
                                    )

                                }
                            </Card>
                        </Col>

                        <Col xs={24} lg={10}>
                            <Card bordered>
                                <Title level={4} style={{ marginBottom: "20px" }}>
                                    Thông tin đơn hàng
                                </Title>
                                <div>
                                    {cartItems.map((item: any) => (
                                        <div
                                            key={item.id}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <Text>{item.name}</Text>
                                            <Text>x{item.quantity}</Text>
                                            <Text>{handleStatusBook(item.type)}</Text>
                                            <Text>{(item.price * item.quantity).toLocaleString()}đ</Text>
                                        </div>
                                    ))}
                                    <Divider />
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <Text>Tạm tính</Text>
                                        <Text>{totalPrice.toLocaleString()}đ</Text>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <Text>Phí vận chuyển</Text>
                                        <Text>{fee.toLocaleString()}đ</Text>
                                    </div>
                                    <Divider />
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <Text>Tổng cộng</Text>
                                        <Text style={{ color: "#1E90FF", fontSize: "18px" }}>
                                            {(totalPrice + fee).toLocaleString()}đ
                                        </Text>
                                    </div>
                                </div>
                            </Card>

                            <Card bordered style={{ marginTop: "20px" }}>
                                <Title level={4}>Phương thức thanh toán</Title>
                                <Form.Item
                                    name="paymentMethod"
                                    rules={[{ required: true, message: "Chọn phương thức thanh toán" }]}
                                >
                                    <Radio.Group>
                                        <Space direction="vertical">
                                            <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
                                            <Radio value="online">Chuyển khoản online</Radio>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>
                                <Space style={{ marginTop: "20px" }}>
                                    <Button onClick={() => console.log("Go Back")}>Quay lại</Button>
                                    <Button type="primary" htmlType="submit">
                                        Đặt hàng
                                    </Button>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </Form>
                {
                    toggleAddress && (
                        <div>
                            <PopUp toggle={toggleAddress} setToggle={() => setToggleAddress(!toggleAddress)}>
                                <ShippingAddressPopUp
                                    reload={reload}
                                    setSelectedId={setSelectedId}
                                    toggleAddress={toggleAddress}
                                    setToggleAddress={setToggleAddress}
                                />
                            </PopUp>
                        </div>

                    )
                }
            </div>
        </MainLayout>

    );
};

export default Checkout;

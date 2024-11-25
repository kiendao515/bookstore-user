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

const { Title, Text } = Typography;

const Checkout = () => {
    const formMethod = useForm();
    const { watch, setValue, handleSubmit } = formMethod;
    const { provinces } = useProvinces();
    const { districts } = useDistricts(watch("province_code") || "");
    const { wards } = useWards(watch("district_code") || "");
    const [provinceName, setProvinceName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const user = useAppSelector(getUser);
    const [fee, setFee] = useState(25000)
    const location = useLocation();
    const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };
    console.log(cartItems);
    
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
    function isICreateOrder(obj: any): obj is ICreateOrderRes {
        return obj && typeof obj === "object" && "result" in obj && "reason" in obj && "data" in obj;
    }

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
            if(response.result){
                message.success("Đặt hàng thành công!");
                if(values.paymentMethod !== "cod" && response.data != null && typeof response.data === 'string'){
                    window.location.href = response.data;
                }else if(typeof response.data == 'object'){
                    navigate("/order-confirmation", { state: { orderId: response.data?.id } });
                }
                
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
                                <Form.Item
                                    label="Họ và tên"
                                    name="customerName"
                                    rules={[{ required: true, message: "Vui lòng nhập tên người nhận" }]}
                                >
                                    <Input placeholder="Họ và tên" />
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="phone"
                                    rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
                                >
                                    <Input addonBefore="+84" type="number" placeholder="Số điện thoại" />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                // rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ" }]}
                                >
                                    <Input value={user.email} defaultValue={user.email} disabled />
                                </Form.Item>
                                <Form.Item
                                    label="Tỉnh/Thành phố"
                                    name="province"
                                    rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
                                >
                                    <Select
                                        placeholder="Chọn tỉnh/thành phố"
                                        options={provinces?.data?.map((province: any) => ({
                                            value: province.code,
                                            label: province.full_name,
                                        }))}
                                        onChange={(value, option) => {
                                            setProvinceName(option?.label);
                                            setValue("province_code", value);
                                            setValue("district_code", "");
                                            setValue("ward_code", "");
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Quận/Huyện"
                                    name="district"
                                    rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
                                >
                                    <Select
                                        placeholder="Chọn quận/huyện"
                                        options={districts?.data?.map((district: any) => ({
                                            value: district.code,
                                            label: district.full_name,
                                        }))}
                                        onChange={(value, option) => {
                                            setDistrictName(option?.label);
                                            setValue("district_code", value);
                                            setValue("ward_code", "");
                                        }}
                                        disabled={!watch("province_code")}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Xã/Phường"
                                    name="ward"
                                    rules={[{ required: true, message: "Vui lòng chọn xã/phường" }]}
                                >
                                    <Select
                                        placeholder="Chọn xã/phường"
                                        options={wards?.data?.map((ward: any) => ({
                                            value: ward.code,
                                            label: ward.full_name,
                                        }))}
                                        onChange={(value, option) => {
                                            setValue("ward_code", value);
                                        }}
                                        disabled={!watch("district_code")}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Địa chỉ cụ thể"
                                    name="street"
                                    rules={[{ required: true, message: "Vui lòng nhập địa chỉ cụ thể" }]}
                                >
                                    <Input placeholder="Số nhà, tên đường" />
                                </Form.Item>
                                <Form.Item label="Ghi chú giao hàng" name="note">
                                    <Input.TextArea rows={3} placeholder="Ghi chú giao hàng (nếu có)" />
                                </Form.Item>
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
            </div>
        </MainLayout>

    );
};

export default Checkout;

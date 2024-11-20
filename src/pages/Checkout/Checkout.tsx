import React, { useState } from "react";
import { Form, Input, Button, Select, Radio, Typography, Card, Divider, Space, Row, Col } from "antd";
import MainLayout from "@/layout";
import { useDistricts, useProvinces, useWards } from "@/api/order/queries";
import { useForm } from "react-hook-form";

const { Title, Text } = Typography;

const Checkout = () => {
    const formMethod = useForm();
    const { watch, control, handleSubmit } = formMethod;
    const onFinish = (values: any) => {
        console.log("Form Submitted: ", values);
    };

    const totalPrice = 270300; // Example total price
    const shippingFee = 25000;

    const { provinces } = useProvinces();;
    const { districts } = useDistricts(formMethod.watch("province_code") || "");
    const { wards } = useWards(formMethod.watch("district_code") || "");

    return (
        <MainLayout>
            <div style={{ padding: "20px" }}>
                <Row gutter={24}>
                    {/* Left Column: Customer Information */}
                    <Col xs={24} lg={14}>
                        <Card bordered style={{ marginBottom: "20px" }}>
                            <Title level={4} style={{ marginBottom: "20px" }}>
                                Thông tin khách hàng
                            </Title>
                            <Form layout="vertical" onFinish={onFinish}>
                                <Form.Item
                                    label="Họ và tên"
                                    name="customerName"
                                    rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
                                >
                                    <Input placeholder="Họ và tên" />
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="phone"
                                    rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
                                >
                                    <Input addonBefore="+84" placeholder="Số điện thoại" />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ" }]}
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    label="Tỉnh/Thành phố"
                                    name="province"
                                    rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
                                >
                                    <Select
                                        placeholder="Chọn tỉnh/thành phố"
                                        
                                        options={provinces?.data.map((province: any) => ({
                                            value: province.code,
                                            label: province.full_name,
                                        }))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Quận/Huyện"
                                    name="district"
                                    rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
                                >
                                    <Select
                                        placeholder="Chọn quận/huyện"
                                        onChange={handleDistrictChange}
                                        options={districts}
                                        disabled={!selectedProvince}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Xã/Phường"
                                    name="ward"
                                    rules={[{ required: true, message: "Vui lòng chọn xã/phường" }]}
                                >
                                    <Select
                                        placeholder="Chọn xã/phường"
                                        options={wards}
                                        disabled={!selectedDistrict}
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
                            </Form>
                        </Card>
                    </Col>

                    {/* Right Column: Order Summary */}
                    <Col xs={24} lg={10}>
                        <Card bordered>
                            <Title level={4} style={{ marginBottom: "20px" }}>
                                Thông tin đơn hàng
                            </Title>
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                    <Text>Mái Đừng Xa Tôi</Text>
                                    <Text>x1</Text>
                                    <Text>270,300đ</Text>
                                </div>
                                <Divider />
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                    <Text>Tạm tính</Text>
                                    <Text>{totalPrice.toLocaleString()}đ</Text>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                    <Text>Phí vận chuyển</Text>
                                    <Text>{shippingFee.toLocaleString()}đ</Text>
                                </div>
                                <Divider />
                                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                                    <Text>Tổng cộng</Text>
                                    <Text style={{ color: "#1E90FF", fontSize: "18px" }}>
                                        {(totalPrice + shippingFee).toLocaleString()}đ
                                    </Text>
                                </div>
                            </div>
                        </Card>

                        <Card bordered style={{ marginTop: "20px" }}>
                            <Title level={4}>Phương thức thanh toán</Title>
                            <Form layout="vertical">
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
                            </Form>
                            <Space style={{ marginTop: "20px" }}>
                                <Button onClick={() => console.log("Go Back")}>Quay lại</Button>
                                <Button type="primary" htmlType="submit">
                                    Đặt hàng
                                </Button>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div>
        </MainLayout>
    );
};

export default Checkout;

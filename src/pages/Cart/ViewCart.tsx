import React, { useState, useEffect } from "react";
import { Table, Button, InputNumber, Card, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { handleStatusBook } from "@/utils/common";
import { AMOUNT_FREE_SHIP } from "@/utils/constant";
import MainLayout from "@/layout";

const { Text } = Typography;

const ViewCart = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fake data giỏ hàng
    const [cartItems, setCartItems] = useState([
        {
            id: "1",
            name: "Sách Truyện Kiều",
            type: "Mới",
            quantity: 1,
            price: 83000,
            image: "https://via.placeholder.com/80", // URL ảnh giả lập
        },
        {
            id: "2",
            name: "Sách C Programming",
            type: "Cũ",
            quantity: 2,
            price: 120000,
            image: "https://via.placeholder.com/80",
        },
        {
            id: "3",
            name: "Sách Harry Potter",
            type: "Mới",
            quantity: 1,
            price: 150000,
            image: "https://via.placeholder.com/80",
        },
    ]);

    const incrementQuantity = (id: string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (id: string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleRemoveItem = (id: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const columns = [
        {
            title: "Sản phẩm",
            dataIndex: "name",
            key: "name",
            render: (text: string, record: any) => (
                <Space size="middle">
                    <img src={record.image} alt={text} style={{ width: 50, height: 50 }} />
                    <Text>{text}</Text>
                </Space>
            ),
        },
        {
            title: "Tình trạng",
            dataIndex: "type",
            key: "type",
            render: (type: string) => <Text>{handleStatusBook(type)}</Text>,
        },
        {
            title: "Số lượng",
            key: "quantity",
            dataIndex: "quantity",
            render: (quantity: number, record: any) => (
                <Space>
                    <Button
                        onClick={() => decrementQuantity(record.id)}
                        size="small"
                        disabled={quantity <= 1}
                    >
                        -
                    </Button>
                    <InputNumber value={quantity} readOnly style={{ width: 30 }} />
                    <Button onClick={() => incrementQuantity(record.id)} size="small">
                        +
                    </Button>
                </Space>
            ),
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (price: number) => <Text>{price.toLocaleString()} đ</Text>,
        },
        {
            title: "Thành tiền",
            key: "total",
            render: (text: any, record: any) => (
                <Text>{(record.price * record.quantity).toLocaleString()} đ</Text>
            ),
        },
        {
            title: "Thao tác",
            key: "action",
            render: (text: any, record: any) => (
                <Button type="link" danger onClick={() => handleRemoveItem(record.id)}>
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <MainLayout>
            <div style={{ padding: "20px" }}>
                <Table
                    dataSource={cartItems}
                    columns={columns}
                    rowKey={(record) => record.id}
                    pagination={false}
                />
                <Card
                    style={{ marginTop: 20 }}
                    bodyStyle={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div>
                        {AMOUNT_FREE_SHIP - totalPrice > 0 && (
                            <Text type="secondary">
                                Mua thêm{" "}
                                <Text strong>{(AMOUNT_FREE_SHIP - totalPrice).toLocaleString()} đ</Text>{" "}
                                để được freeship.
                            </Text>
                        )}
                    </div>
                    <div>
                        <Text strong>Tổng thanh toán: {totalPrice.toLocaleString()} đ</Text>
                        <Button
                            type="primary"
                            style={{ marginLeft: 20 }}
                            onClick={() => navigate("/checkout")}
                        >
                            Thanh toán
                        </Button>
                    </div>
                </Card>
            </div>
        </MainLayout>
    );
};

export default ViewCart;

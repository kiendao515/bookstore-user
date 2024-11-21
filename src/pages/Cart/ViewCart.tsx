import React, { useState, useEffect } from "react";
import { Table, Button, InputNumber, Card, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { handleStatusBook } from "@/utils/common";
import { AMOUNT_FREE_SHIP } from "@/utils/constant";
import MainLayout from "@/layout";
import { useCart } from "@/api/order/queries";

const { Text } = Typography;
interface CartItem {
    id: string;
    name: string;
    type: string;
    quantity: number;
    price: number;
    image: string;
    book_inventory_id: string
}
const ViewCart = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { data } = useCart();
    console.log(data);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fake data giỏ hàng
    const [cartItems, setCartItems] = useState<CartItem[]>([]); // State giỏ hàng
    useEffect(() => {
        // Chuyển đổi dữ liệu từ API thành dữ liệu phù hợp với bảng
        if (data?.data) {
            const mappedItems: CartItem[] = data.data.map((item: any) => ({
                id: item.id,
                name: item.book.name,
                type: item.type,
                quantity: item.quantity,
                price: item.price || 0, 
                image: item.book.coverImage,
                book_inventory_id: item.book_inventory_id
            }));
            setCartItems(mappedItems);
        }
    }, [data]);
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
            title: "Đơn giá",
            dataIndex: "price",
            key: "price",
            render: (price: number) => <Text>{price.toLocaleString()} đ</Text>,
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
                            onClick={() => navigate("/checkout",{ state: { cartItems, totalPrice }})}
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

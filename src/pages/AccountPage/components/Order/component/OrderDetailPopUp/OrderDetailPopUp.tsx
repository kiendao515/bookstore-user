import { Typography, Divider, List, Space, Row, Col, Spin } from "antd";
import moment from "moment";
import { handleOrderStatus, handleStatusBook } from "@/utils/common";
import { useOrderDetail } from "@/api/order/queries";
import IOrderDetailPopUp from "./interface";

const { Text, Title } = Typography;

const OrderDetailPopUp = (props: IOrderDetailPopUp) => {
    const { id } = props;
    const { order, isLoading } = useOrderDetail(id); // `isLoading` từ hook

    return (
        <Spin spinning={isLoading} tip="Đang tải dữ liệu...">
            <div
                style={{
                    width: "100%",
                    maxWidth: "900px",
                    padding: "24px",
                    background: "#f9f9f9",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
            >
                {/* Header */}
                <Title
                    level={4}
                    style={{
                        textAlign: "center",
                        marginBottom: "24px",
                        color: "#333",
                        fontWeight: "600",
                    }}
                >
                    Chi tiết đơn hàng
                </Title>

                {order ? (
                    <>
                        {/* Shipping Information */}
                        <Text style={{ fontWeight: "700", fontSize: "14px" }}>
                            Thông tin nhận hàng
                        </Text>
                        <Row gutter={[16, 8]} style={{ marginBottom: "16px" }}>
                            <Col span={24}>
                                <Space direction="vertical">
                                    <Text>
                                        <strong style={{ color: "#1E71FF" }}>{order?.data.customer_name}</strong>{" "}
                                        | {order?.data.customer_phone}
                                    </Text>
                                    <Text>{order?.data.address}</Text>
                                </Space>
                            </Col>
                        </Row>

                        {/* Order Information */}
                        <Text style={{ fontWeight: "700", fontSize: "14px" }}>
                            Thông tin đơn hàng
                        </Text>
                        <Row gutter={[16, 8]} style={{ marginBottom: "16px" }}>
                            <Col span={8}>
                                <Text style={{ fontWeight: "500", color: "#666" }}>Mã đơn hàng</Text>
                            </Col>
                            <Col span={16} style={{ textAlign: "right" }}>
                                <Text>{order?.data.order_code}</Text>
                            </Col>
                            <Col span={8}>
                                <Text style={{ fontWeight: "500", color: "#666" }}>Ngày tạo đơn</Text>
                            </Col>
                            <Col span={16} style={{ textAlign: "right" }}>
                                <Text>{moment(order?.data.created_at).format("DD/MM/YYYY")}</Text>
                            </Col>
                            <Col span={8}>
                                <Text style={{ fontWeight: "500", color: "#666" }}>Tình trạng đơn</Text>
                            </Col>
                            <Col span={16} style={{ textAlign: "right" }}>
                                <Text>{handleOrderStatus(order?.data.status || "")}</Text>
                            </Col>
                            <Col span={8}>
                                <Text style={{ fontWeight: "500", color: "#666" }}>Hãng vận chuyển</Text>
                            </Col>
                            <Col span={16} style={{ textAlign: "right" }}>
                                <Text>{order?.data.shipping_company}</Text>
                            </Col>
                        </Row>

                        {/* Book Details */}
                        <Text style={{ fontWeight: "700", fontSize: "14px" }}>
                            Chi tiết sách
                        </Text>
                        <List
                            dataSource={order?.data.order_items}
                            renderItem={(book) => (
                                <List.Item
                                    style={{
                                        borderRadius: "6px",
                                        backgroundColor: "#fff",
                                        marginBottom: "8px",
                                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                                    }}
                                >
                                    <Row align="middle" style={{ width: "100%" }}>
                                        <Col span={10}>
                                            <Text
                                                ellipsis={{ tooltip: book.bookName }}
                                                style={{ fontWeight: "500" }}
                                            >
                                                {book.bookName}
                                            </Text>
                                        </Col>
                                        <Col span={4} style={{ textAlign: "center" }}>
                                            <Text>{handleStatusBook(book.type)}</Text>
                                        </Col>
                                        <Col span={4} style={{ textAlign: "center" }}>
                                            <Text>x{book.quantity}</Text>
                                        </Col>
                                        <Col span={6} style={{ textAlign: "right" }}>
                                            <Text>{book.price.toLocaleString()}đ</Text>
                                        </Col>
                                    </Row>
                                </List.Item>
                            )}
                        />

                        {/* Pricing Summary */}
                        <Text style={{ fontWeight: "700", fontSize: "14px" }}>
                            Tổng kết
                        </Text>
                        <Row gutter={[16, 8]}>
                            <Col span={8}>
                                <Text style={{ fontWeight: "500", color: "#666" }}>Phí ship</Text>
                            </Col>
                            <Col span={16} style={{ textAlign: "right" }}>
                                <Text>{order?.data.shipping_fee.toLocaleString()}đ</Text>
                            </Col>
                            <Col span={8}>
                                <Text style={{ fontWeight: "600", color: "#333" }}>Tổng cộng</Text>
                            </Col>
                            <Col span={16} style={{ textAlign: "right" }}>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        color: "#FF4D4F",
                                    }}
                                >
                                    {order?.data.total_amount.toLocaleString()}đ
                                </Text>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <Text>Không có dữ liệu đơn hàng.</Text>
                )}
            </div>
        </Spin>
    );
};

export default OrderDetailPopUp;

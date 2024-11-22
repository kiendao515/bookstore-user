import { Typography, Divider, List, Space, Row, Col } from "antd";
import moment from "moment";
import { handleOrderStatus, handleStatusBook } from "@/utils/common";
import { useOrderDetail } from "@/api/order/queries";
import IOrderDetailPopUp from "./interface";

const { Text, Title } = Typography;

const OrderDetailPopUp = (props: IOrderDetailPopUp) => {
    const { id } = props;
    const { order } = useOrderDetail(id);

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "900px",
            }}
        >
            {/* Shipping Information */}
            <Title level={4} style={{ color: "#888888" }}>
                [ Thông tin nhận hàng ]
            </Title>
            <Divider />
            <Row style={{ marginBottom: "14px" }}>
                <Col span={24}>
                    <Space direction="vertical">
                        <Space>
                            <Text style={{ color: "#1E71FF" }}>{order?.data.customer_name}</Text>
                            <Text>|</Text>
                            <Text>{order?.data.customer_phone}</Text>
                        </Space>
                        <Text>
                            {`${order?.data.street}, ${order?.data.ward.full_name}, ${order?.data.district.full_name}, ${order?.data.province.full_name}`}
                        </Text>
                    </Space>
                </Col>
            </Row>

            {/* Order Information */}
            <Title level={4} style={{ color: "#888888" }}>
                [ Thông tin đơn hàng ]
            </Title>
            <Divider />
            <Row gutter={[16, 8]}>
                <Col span={12}>
                    <Text style={{ color: "#888888" }}>Mã đơn hàng</Text>
                </Col>
                <Col span={12}>
                    <Text>{order?.data.order_code}</Text>
                </Col>
                <Col span={12}>
                    <Text style={{ color: "#888888" }}>Ngày tạo đơn</Text>
                </Col>
                <Col span={12}>
                    <Text>{moment(order?.data.created_at).format("DD/MM/YYYY")}</Text>
                </Col>
                <Col span={12}>
                    <Text style={{ color: "#888888" }}>Tình trạng đơn</Text>
                </Col>
                <Col span={12}>
                    <Text>{handleOrderStatus(order?.data.status || "")}</Text>
                </Col>
            </Row>

            {/* Book Details */}
            <Divider />
            <Title level={4} style={{ color: "#888888" }}>
                [ Chi tiết sách ]
            </Title>
            <List
                dataSource={order?.data.book_orders}
                renderItem={(book) => (
                    <List.Item>
                        <Row style={{ width: "100%" }}>
                            <Col span={10}>
                                <Text
                                    ellipsis={{
                                        tooltip: book.name,
                                    }}
                                >
                                    {book.name}
                                </Text>
                            </Col>
                            <Col span={4}>
                                <Text>{handleStatusBook(book.type)}</Text>
                            </Col>
                            <Col span={4}>
                                <Text>x{book.quantity}</Text>
                            </Col>
                            <Col span={6} style={{ textAlign: "right" }}>
                                <Text>{(book.price * book.quantity).toLocaleString()}đ</Text>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />

            {/* Pricing Summary */}
            <Divider />
            <Title level={4} style={{ color: "#888888" }}>
                [ Tổng kết ]
            </Title>
            <Row gutter={[16, 8]}>
                <Col span={12}>
                    <Text style={{ color: "#888888" }}>Tổng tiền sách</Text>
                </Col>
                <Col span={12}>
                    <Text>{order?.data.total_book_price.toLocaleString()}đ</Text>
                </Col>
                <Col span={12}>
                    <Text style={{ color: "#888888" }}>Phí ship</Text>
                </Col>
                <Col span={12}>
                    <Text>{order?.data.shipping_fee.toLocaleString()}đ</Text>
                </Col>
                <Col span={12}>
                    <Text style={{ color: "#888888" }}>Tổng cộng</Text>
                </Col>
                <Col span={12}>
                    <Text>{order?.data.total_price.toLocaleString()}đ</Text>
                </Col>
            </Row>
        </div>
    );
};

export default OrderDetailPopUp;

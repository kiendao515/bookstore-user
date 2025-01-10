import React, { useState } from "react";
import { Modal, List, Button, Typography, message } from "antd";
import { ICombinedOrder } from "@/api/order";

const { Text } = Typography;


interface CombinedOrderProps {
    visible: boolean;
    onClose: () => void;
    setIsModalVisible: (isModalVisible: boolean) => void
    orders: ICombinedOrder[];
    onSelect: (order: ICombinedOrder) => void;
}

const CombinedOrder: React.FC<CombinedOrderProps> = ({ visible, onClose, orders, onSelect, setIsModalVisible }) => {
    const [selectedOrder, setSelectedOrder] = useState<ICombinedOrder | null>(null);

    const handleConfirm = () => {
        if (selectedOrder) {
            onSelect(selectedOrder);
            onClose();
        } else {
            message.error("Vui lòng chọn một đơn hàng để gom!");
        }
    };

    return (
        <Modal
            title="Chọn đơn hàng để gom"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="success" onClick={() => {
                    setSelectedOrder(null)
                    setIsModalVisible(false)
                }}>
                    Đơn gom mới
                </Button>,
                <Button
                    key="cancel"
                    onClick={() => {
                        setSelectedOrder(null)
                        setIsModalVisible(false)
                    }}
                    style={{ backgroundColor: "red", color: "white" }}>
                    Hủy
                </Button>,
                <Button key="confirm" type="primary" onClick={handleConfirm}>
                    Xác nhận
                </Button>,
            ]}
        >
            <List
                dataSource={orders}
                renderItem={(order) => (
                    <List.Item
                        onClick={() => setSelectedOrder(order)}
                        style={{
                            cursor: "pointer",
                            padding: "10px",
                            border: selectedOrder?.order_code === order.order_code ? "2px solid #1890ff" : "1px solid #f0f0f0",
                            borderRadius: "8px",
                            backgroundColor: selectedOrder?.order_code === order.order_code ? "#e6f7ff" : "white",
                            transition: "all 0.3s ease",
                            marginTop: "5px"
                        }}
                    >
                        <List.Item.Meta
                            title={<Text strong>{`Đơn hàng ${order.order_code}`}</Text>}
                            description={
                                <div>
                                    <div>
                                        <Text>{`Người nhận: ${order.customer_name}đ`}</Text>
                                    </div>
                                    <div>
                                        <Text>{`Số điện thoại: ${order.customer_phone}đ`}</Text>
                                    </div>
                                    <div>
                                        <Text>{`Địa chỉ: ${order.street}, ${order.ward.full_name}, ${order.district.full_name}, ${order.province.full_name}`}</Text>
                                    </div>
                                    <div>
                                        <text style={{ fontWeight: "bold", color: "black" }}>{`Tổng giá trị: ${order.total_amount.toLocaleString()}đ`}</text>
                                    </div>

                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default CombinedOrder;

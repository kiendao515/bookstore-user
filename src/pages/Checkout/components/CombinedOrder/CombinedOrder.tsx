import React, { useState } from "react";
import { Modal, List, Button, Typography, message } from "antd";
import { ICombinedOrder } from "@/api/order";

const { Text } = Typography;


interface CombinedOrderProps {
    visible: boolean;
    onClose: () => void;
    orders: ICombinedOrder[];
    onSelect: (orderId: string) => void;
}

const CombinedOrder: React.FC<CombinedOrderProps> = ({ visible, onClose, orders, onSelect }) => {
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

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
                <Button key="cancel" onClick={onClose}>
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
                        onClick={() => setSelectedOrder(order.order_code)}
                        style={{
                            cursor: "pointer",
                            padding: "10px",
                            border: selectedOrder === order.order_code ? "2px solid #1890ff" : "1px solid #f0f0f0",
                            borderRadius: "8px",
                            backgroundColor: selectedOrder === order.order_code ? "#e6f7ff" : "white",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <List.Item.Meta
                            title={<Text strong>{`Đơn hàng ${order.order_code}`}</Text>}
                            description={<Text>{`Tổng giá trị: ${order.total_amount.toLocaleString()}đ`}</Text>}
                        />
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default CombinedOrder;

import { useEffect, useState } from "react";
import { IOrderProps } from "./interface";
import { handleOrderStatus } from "@/utils/common";
import OrderDetailPopUp from "./component/OrderDetailPopUp/OrderDetailPopUp";
import { useOrders } from "@/api/order/queries";
import moment from "moment";
import { Modal, Table, Typography, Button, Image, Space, Tag } from "antd";

const { Text } = Typography;

const Order = (props: IOrderProps) => {
    const [toggleDetail, setToggleDetail] = useState(false);
    const [reload, setReload] = useState(0);
    const { orders } = useOrders({ reload });
    const [selectedId, setSelectedId] = useState<string>();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1280);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const columns = [
        {
            title: "Đơn hàng",
            dataIndex: "orderCode",
            key: "orderCode",
            render: (_: any, record: any) => (
                <Text >
                    {record.orderCode}...
                </Text>
            ),
        },
        {
            title: "Tình trạng",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={status === "DONE" ? "green" : "volcano"}>
                    {handleOrderStatus(status)}
                </Tag>
            ),
            align: "center",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (_: any, record: any) =>
                `${record.quantity} quyển`,
            align: "center",
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (price: number) =>
                price ? (
                    <Text style={{ fontWeight: "bold" }}>
                        {price.toLocaleString()}đ
                    </Text>
                ) : (
                    <Text>Chưa thanh toán</Text>
                ),
            align: "center",
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date: string) => (
                <Text>{moment(date).format("DD/MM/YYYY")}</Text>
            ),
            align: "center",
        },
        {
            title: "",
            key: "action",
            render: (_: any, record: any) => (
                <Button
                    type="link"
                    style={{ color: "#007bff" }}
                    onClick={() => {
                        setToggleDetail(true);
                        setSelectedId(record.id);
                    }}
                >
                    chi tiết
                </Button>
            ),
            align: "center",
        },
    ];

    const dataSource = orders?.data.map((order: any) => ({
        key: order.id,
        orderCode: order.order_code,
        status: order.status,
        quantity: Array.isArray(order.order_items)
        ? order.order_items.reduce((total: number, item: any) => total + item.quantity, 0) : 0,
        totalAmount: order.total_amount,
        createdAt: order.created_at,
        id: order.id,
    }));

    return (
        <>
            <div>
                <div style={{ marginTop: 30, paddingBottom: 200 }}>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        rowKey="key"
                        bordered
                        style={{ background: "#fff" }}
                    />
                </div>
            </div>
            <Modal
                open={toggleDetail}
                onCancel={() => setToggleDetail(false)}
                footer={null}
            >
                {selectedId && <OrderDetailPopUp id={selectedId} />}
            </Modal>
        </>
    );
};

export default Order;

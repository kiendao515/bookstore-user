import { useEffect, useState } from "react";
import { IOrderProps } from "./interface";
import { handleOrderStatus } from "@/utils/common";
import OrderDetailPopUp from "./component/OrderDetailPopUp/OrderDetailPopUp";
import { useOrders } from "@/api/order/queries";
import moment from "moment";
import { Modal, Table, Typography, Button, Image, Space } from "antd";

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
            dataIndex: "orderBook",
            key: "orderBook",
            render: (text: string, record: any) => (
                <Space>
                    <Image
                        src={
                            record.book_orders.length > 0
                                ? record.book_orders[0].thumbnail
                                : ""
                        }
                        alt="Book"
                        width={80}
                        height={80}
                        style={{ display: record.book_orders.length > 0 ? "block" : "none" }}
                    />
                    <Text>
                        {text.length > 18 ? `${text.slice(0, 18)}...` : text}
                    </Text>
                </Space>
            ),
        },
        {
            title: "Tình trạng",
            dataIndex: "status",
            key: "status",
            render: (status: string) => <Text>{handleOrderStatus(status)}</Text>,
            align: "center",
        },
        ...(isMobile
            ? []
            : [
                  {
                      title: "Số lượng",
                      dataIndex: "quantity",
                      key: "quantity",
                      render: (quantity: number) => <Text>{quantity} quyển</Text>,
                      align: "center",
                  },
              ]),
        {
            title: "Tổng tiền",
            dataIndex: "total_price",
            key: "total_price",
            render: (price: number) => <Text>{price.toLocaleString()}đ</Text>,
            align: "center",
        },
        {
            title: "Ngày tạo",
            dataIndex: "created_at",
            key: "created_at",
            render: (date: string) => <Text>{moment(date).format("DD/MM/YYYY")}</Text>,
            align: "center",
        },
        {
            title: "",
            key: "action",
            render: (_: any, record: any) => (
                <Button
                    type="link"
                    onClick={() => {
                        setToggleDetail(true);
                        setSelectedId(record.id);
                    }}
                >
                    Chi tiết
                </Button>
            ),
            align: "center",
        },
    ];

    const dataSource = orders?.data.map((order: any) => ({
        key: order.id,
        orderBook:
            order.book_orders.length > 1
                ? order.book_orders.map((book: any) => book.name).join(", ")
                : order.book_orders.map((book: any) => book.name).join(","),
        status: order.status,
        quantity: order.book_orders.reduce((total: number, book: any) => total + book.quantity, 0),
        total_price: order.total_price,
        created_at: order.created_at,
        id: order.id,
        book_orders: order.book_orders,
    }));

    return (
        <>
            <div>
                {!isMobile && <Text style={{ color: "#888888" }}>[ đơn hàng ]</Text>}
                <div style={{ marginTop: 30, paddingBottom: 200 }}>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        rowKey="key"
                        bordered
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
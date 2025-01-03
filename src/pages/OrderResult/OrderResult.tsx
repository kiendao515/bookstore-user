import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import SuccessOrderIcon from '@/icons/SuccessOrdderIcon';
import { useEffect, useState } from 'react';
import FailOrderIcon from '@/icons/FailOrderIcon';
const { Title, Text } = Typography;
import MainLayout from '@/layout';
import { Button, Spin, Typography } from 'antd';
import { useOrderDetail } from '@/api/order/queries';
import { clearCart } from '@/api/order';

const OrderResult = () => {
    let [searchParams] = useSearchParams();
    const [orderStatus, setOrderStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [orderId, setOrderId] = useState<string>("");
    const { order } = useOrderDetail(orderId);
    useEffect(() => {
        setOrderId(searchParams.get("orderId") || "");
    }, [searchParams.get("orderId")])

    useEffect(() => {
        if (order?.data?.payment_type && (order?.data?.status == "READY_TO_PACKAGE" || order?.data?.status == "COMBINED_ORDER")) {
            setLoading(false)
            setOrderStatus(true)
            clearCart();
            return;
        }

        if (order?.data?.payment_type && order?.data?.status == "CREATED") {
            setLoading(false)
            setOrderStatus(false);
            return;
        }

        if (order?.data?.status === 'CREATED' && order?.data?.payment_type == false) {
            setLoading(false)
            setOrderStatus(true)
            return;
        }

        if (order?.message) {
            toast.error(order.message);
        }
    }, [order]);


    return (
        <MainLayout>
            <div className="flex justify-center items-center mb-10">

                {loading ? (
                    <Spin size="default" />
                ) : orderStatus ? (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginTop: "50px",
                            textAlign: "center",
                        }}
                    >
                        <img
                            src="./assets/images/order-success.png"
                            alt="Order Success Icon"
                            style={{
                                maxWidth: "540px",
                                marginBottom: "20px",
                                height: "auto",
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                            }}
                        >
                            <SuccessOrderIcon />
                            <Title
                                level={2}
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    margin: 0,
                                }}
                            >
                                {order?.data?.status == "READY_TO_PACKAGE" ? "Đặt hàng thành công!":"Gom đơn hàng thành công!"}
                                
                            </Title>
                        </div>
                        <Text
                            style={{
                                fontSize: "16px",
                                color: "#555",
                                marginTop: "10px",
                                maxWidth: "500px",
                            }}
                        >
                            Để chỉnh sửa chi tiết đơn hàng, vui lòng liên hệ trong vòng 48 giờ.
                        </Text>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginTop: "50px",
                            textAlign: "center",
                        }}
                    >
                        <img
                            src="./assets/images/order-fail.png"
                            alt="Order Fail Icon"
                            style={{
                                maxWidth: "540px",
                                marginBottom: "20px",
                                height: "auto",
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                            }}
                        >
                            <FailOrderIcon />
                            <Title
                                level={2}
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    margin: 0,
                                }}
                            >
                                Thanh toán thất bại!
                            </Title>
                        </div>
                        <Button
                            type="primary"
                            style={{
                                marginTop: "20px",
                                backgroundColor: "#FFA500",
                                borderColor: "#FFA500",
                                color: "#fff",
                                width: "220px",
                                height: "40px",
                                marginBottom: "10px",
                                fontWeight: "bold",
                            }}
                            onClick={() => {
                                console.log("Thanh toán lại");
                            }}
                        >
                            Thanh toán lại
                        </Button>
                        <Button
                            style={{
                                marginTop: "10px",
                                marginBottom: "100px",
                                backgroundColor: "#f5f5f5",
                                borderColor: "#d9d9d9",
                                color: "#555",
                                width: "220px",
                                height: "40px",
                                fontWeight: "bold",
                            }}
                            onClick={() => {
                                console.log("Hủy đơn hàng");
                            }}
                        >
                            Hủy đơn hàng
                        </Button>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default OrderResult;
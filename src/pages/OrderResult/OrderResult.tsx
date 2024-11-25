import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useOrderDetail } from '@/api/order/queries';
import { retryPayment } from '@/api/order';
import SuccessOrderIcon from '@/icons/SuccessOrdderIcon';
import { useEffect, useState } from 'react';
import FailOrderIcon from '@/icons/FailOrderIcon';
import { API_URL } from '@/utils/constant';
import { Client } from '@stomp/stompjs';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/store/duck/cart/slice';
import QrPopUp from '../Checkout/components/QrPopUp/QrPopUp';
const { Title, Text } = Typography;
import MainLayout from '@/layout';
import { Button, Spin, Typography } from 'antd';

const OrderResult = () => {
    let [searchParams] = useSearchParams();
    const [orderStatus, setOrderStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [reload, setReload] = useState(0);
    const [orderId, setOrderId] = useState<string>("");
    const { order } = useOrderDetail(orderId);
    useEffect(() => {
        setOrderId(searchParams.get("orderId") || "");
    }, [searchParams.get("orderId")])

    // useEffect(() => {
    //     if (!order?.data?.id || order?.data?.id == "") {
    //         return;
    //     }

    //     const socket = new SockJS(API_URL + '/socket');
    //     const stompClient = new Client({
    //         webSocketFactory: () => socket,
    //         reconnectDelay: 5000,
    //     });
    //     stompClient.onConnect = () => {
    //         console.log('Connected to WebSocket');
    //         stompClient.subscribe(`/topic/balance-updates/${order?.data?.id}`, (message) => {
    //             if (message.body) {
    //                 if (message.body.includes("TRANSACTION_SUCCESS")) {
    //                     dispatch(clearCart());
    //                     navigate("/order-result?orderId=" + message.body.split("_")[2])
    //                 }
    //             }
    //         });
    //         stompClient.subscribe(`/topic/payment-failed/${order?.data?.id}`, (message) => {
    //             if (message.body) {
    //                 if (message.body.includes("TRANSACTION_FAILED")) {
    //                     navigate("/order-result?orderId=" + (message.body.split("_").length >= 3 ? message.body.split("_")[2] : ""), {
    //                         state: {
    //                             error: message.body.split("_").length >= 4 ? message.body.split("_")[3] : ""
    //                         }
    //                     })
    //                 }
    //             }
    //         });
    //     };
    //     stompClient.activate();
    //     return () => {
    //         stompClient.deactivate();
    //     };
    // }, []);
    // const onRetry = async () => {
    //     if (!orderId) {
    //         return;
    //     }
    //     let data = await retryPayment(orderId);

    //     if (data.success) {
    //         setQrCode(data?.data?.qr_code_url);
    //         setReload(reload + 1);
    //         setOpen(true);
    //     }
    // };

    useEffect(() => {
        console.log(order);

        if (order?.data?.payment_type && order?.data?.status == "READY_TO_PACKAGE") {
            setLoading(false)
            setOrderStatus(true)
            dispatch(clearCart());
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
            <div className="flex justify-center items-center">

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
                                Đặt hàng thành công!
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
                                    marginTop:"10px",
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
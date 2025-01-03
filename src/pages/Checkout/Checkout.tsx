import { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Typography, Card, Divider, Space, Row, Col, message, FormProps, Switch, Modal, List } from "antd";
import MainLayout from "@/layout";
import { useCombinedOrder, useDistricts, useProvinces, useWards } from "@/api/order/queries";
import { useForm } from "react-hook-form";
import { getUser } from "@/store/duck/auth/slice";
import { useAppSelector } from "@/hooks/useRedux";
import { calculateCombinedOrderFee, calculateFee, clearCart, createNewOrder } from "@/api/order";
import { useLocation, useNavigate } from "react-router-dom";
import { handleStatusBook } from "@/utils/common";
import { useShippingAddressDetail, useShippingAddresses } from "@/api/shipment";
import PopUp from "@/ui/PopUp/PopUp";
import ShippingAddressPopUp from "./components/ShippingAddressPopUp/ShippingAddressPopUp";
import TextInput from "@/ui/FormInput/TextInput";
import SelectInput from "@/ui/FormInput/SelectInput";
import { useUserProfile } from "@/api/auth";
import * as yup from "yup";
import { IFormValue } from "./interface";
import { yupResolver } from "@hookform/resolvers/yup";
import RadioInput from "@/ui/FormInput/RadioInput";
import CombinedOrder from "./components/CombinedOrder/CombinedOrder";

const { Title, Text } = Typography;
interface Order {
    id: string;
    totalAmount: number;
}
const Checkout = () => {
    const [selectedId, setSelectedId] = useState<string>();
    const user = useAppSelector(getUser);
    const { user: customer } = useUserProfile()
    const [fee, setFee] = useState(25000)
    const location = useLocation();
    const [reload] = useState(0);
    const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };
    const { shippingAddress } = useShippingAddressDetail(selectedId);
    const [toggleAddress, setToggleAddress] = useState(false);
    const { shippingAddresses } = useShippingAddresses({});
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [maxDiscount, setMaxDiscount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [orderStatus, setOrderStatus] = useState(2); // Trạng thái đơn hàng
    const [isModalVisible, setIsModalVisible] = useState(false); // Hiển thị popup
    const [selectedOrder, setSelectedOrder] = useState(""); // Đơn được chọn để gom
    const orders = useCombinedOrder();
    const schema = yup.object().shape({
        customer_email: yup
            .string()
            .trim()
            .required("Email là bắt buộc")
            .email("Định dạng email không hợp lệ"),
        customer_name: yup
            .string()
            .trim()
            .required("Tên khách hàng là bắt buộc")
            .min(2, "Tên phải có ít nhất 2 ký tự")
            .max(100, "Tên không được vượt quá 100 ký tự"),
        customer_phone: yup
            .string()
            .trim()
            .required("Số điện thoại là bắt buộc")
            .matches(
                /^[0-9]{10,15}$/,
                "Số điện thoại phải từ 10 đến 15 chữ số và chỉ bao gồm số"
            ),
        province_code: yup
            .string()
            .trim()
            .required("Mã tỉnh/thành là bắt buộc")
            .min(2, "Mã tỉnh/thành phải có ít nhất 2 ký tự")
            .max(10, "Mã tỉnh/thành không được vượt quá 10 ký tự"),
        district_code: yup
            .string()
            .trim()
            .required("Mã quận/huyện là bắt buộc")
            .min(2, "Mã quận/huyện phải có ít nhất 2 ký tự")
            .max(10, "Mã quận/huyện không được vượt quá 10 ký tự"),
        ward_code: yup
            .string()
            .trim()
            .required("Mã phường/xã là bắt buộc")
            .min(2, "Mã phường/xã phải có ít nhất 2 ký tự")
            .max(10, "Mã phường/xã không được vượt quá 10 ký tự"),
        street: yup
            .string()
            .trim()
            .required("Tên đường là bắt buộc")
            .min(5, "Tên đường phải có ít nhất 5 ký tự")
            .max(200, "Tên đường không được vượt quá 200 ký tự"),
        discount_point: yup
            .number()
            .typeError("Vui lòng nhập điểm giảm giá")
            .optional()
            .min(0, "Điểm giảm giá không được âm")
            .max(maxDiscount, "Số điểm không hợp lệ - Tối đa " + maxDiscount)
            .integer("Điểm giảm giá phải là số nguyên"),
        payment_method: yup
            .number()
            .required("Phương thức thanh toán là bắt buộc")
            .oneOf([1, 2], "Phương thức thanh toán phải là 1 hoặc 2"),
        note: yup
            .string()
            .optional()
            .max(200, "Ghi chú không được vượt quá 200 ký tự"),
    });
    const handleOrderStatusChange = async (value: any) => {
        setOrderStatus(value);
        console.log(value);

        if (value == 1) {
            setFee(0);
        } else {
            // đi tính phí đơn gom
            const feePayload = {
                order_items: cartItems.map((item: any) => ({
                    book_inventory_id: item.book_inventory_id,
                    quantity: item.quantity
                })),
                province_code: watch("province_code"),
                district_code: watch("district_code"),
                ward_code: watch("ward_code"),
                street: watch('street'),
                related_order_id: selectedOrder
            };
            let fee = await calculateCombinedOrderFee(feePayload)
            console.log(fee);
            setFee(fee.data);
        }
    };

    const handleSelectOrder = (orderId: string) => {
        setSelectedOrder(orderId);
        console.log("Đơn hàng được chọn:", orderId);
    };


    const formMethod = useForm<IFormValue>({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {},
    });

    const { watch } = formMethod;
    const { provinces } = useProvinces();
    const { districts } = useDistricts(watch("province_code") || "");
    const { wards } = useWards(watch("district_code") || "");

    useEffect(() => {
        formMethod.reset({
            discount_point: maxDiscount,
            payment_method: 1,
            customer_email: user.email,
        })
    }, [customer])

    useEffect(() => {
        if (user.id != "") {
            formMethod.reset({
                customer_email: user.email,
                discount_point: maxDiscount,
            })
        }
        if (shippingAddresses?.success) {
            if (shippingAddresses.data.length == 0) {
                return;
            }

            let shippingAddress = shippingAddresses?.data?.find((item) => item.default == true) || shippingAddresses?.data[0];
            const fetchFee = async () => {
                try {
                    const rs = await calculateFee({
                        address: watch("street") || "",
                        province: shippingAddress?.province?.full_name,
                        district: shippingAddress?.district?.full_name,
                        weight: 2000,
                        value: totalPrice,
                    });
                    setFee(rs.data);
                } catch (error) {
                    console.error("Failed to fetch fee:", error);
                }
            };
            fetchFee();

            formMethod.reset({
                customer_email: user.email || "",
                customer_name: shippingAddress?.full_name || "",
                customer_phone: shippingAddress?.phone_number || "",
                province_code: shippingAddress?.province.code || "",
                district_code: shippingAddress?.district.code || "",
                ward_code: shippingAddress?.ward.code || "",
                street: shippingAddress?.street || "",
                discount_point: customer?.data?.point || 0
            })
        }

    }, [shippingAddresses]);

    useEffect(() => {
        if (user.id != "") {
            formMethod.reset({
                customer_email: user.email,
                discount_point: maxDiscount,
            })
        }
        if (shippingAddress?.data) {
            formMethod.reset({
                customer_email: user.email || "",
                customer_name: shippingAddress?.data?.full_name || "",
                customer_phone: shippingAddress?.data?.phone_number || "",
                province_code: shippingAddress?.data?.province.code || "",
                district_code: shippingAddress?.data?.district.code || "",
                ward_code: shippingAddress?.data?.ward.code || "",
                street: shippingAddress?.data?.street || "",
                discount_point: customer?.data?.point || 0
            })
            const fetchFee = async () => {
                try {
                    const rs = await calculateFee({
                        address: watch("street") || "",
                        province: shippingAddress?.data.province?.full_name,
                        district: shippingAddress?.data.district?.full_name,
                        weight: 2000,
                        value: totalPrice,
                    });
                    setFee(rs.data);
                } catch (error) {
                    console.error("Failed to fetch fee:", error);
                }
            };
            fetchFee();
            return;
        }
    }, [shippingAddress])

    useEffect(() => {
        if (shippingAddress?.data) {
            formMethod.reset({
                customer_email: user.email || "",
                customer_name: shippingAddress?.data?.full_name || "",
                customer_phone: shippingAddress?.data?.phone_number || "",
                province_code: shippingAddress?.data?.province?.code || "",
                district_code: shippingAddress?.data?.district?.code || "",
                ward_code: shippingAddress?.data?.ward?.code || "",
                street: shippingAddress?.data?.street || "",
                discount_point: maxDiscount,
            })
            return;
        }
        if (shippingAddresses?.success) {
            if (shippingAddresses.data.length == 0) {
                return;
            }

            let shippingAddress = shippingAddresses?.data?.find((item) => item.default == true);
            if (!shippingAddress) {
                shippingAddress = shippingAddresses?.data[0];
            }
            formMethod.reset({
                customer_email: user.email || "",
                customer_name: shippingAddress?.full_name || "",
                customer_phone: shippingAddress?.phone_number || "",
                province_code: shippingAddress?.province.code || "",
                district_code: shippingAddress?.district.code || "",
                ward_code: shippingAddress?.ward.code || "",
                street: shippingAddress?.street || "",
                discount_point: maxDiscount,
            })
        }
    }, [provinces, districts, wards]);

    const handleCheckout = async (values: IFormValue) => {
        setIsLoading(true);

        const orderPayload = {
            customer_name: watch('customer_name'),
            customer_phone: watch('customer_phone'),
            email: user.email,
            order_items: cartItems.map((item: any) => ({
                book_inventory_id: item.book_inventory_id,
                quantity: item.quantity
            })),
            payment_method: values.payment_method === 1 ? false : true,
            note: values.note || "",
            province_code: watch("province_code"),
            district_code: watch("district_code"),
            ward_code: watch("ward_code"),
            street: watch('street'),
            discount_point: watch("discount_point"),
            combined_order: orderStatus,
            related_order_id: selectedOrder
        };

        try {
            const response = await createNewOrder(orderPayload);
            if (response.result) {
                message.success("Đặt hàng thành công!");
                if (values.payment_method !== 1 && response.data != null && typeof response.data === 'string') {
                    window.location.href = response.data;
                    setIsLoading(false);
                } else if (typeof response.data == 'object') {
                    navigate("/order-result?orderId=" + response.data.orderCode);
                    await clearCart();
                }

            } else {
                message.error(response?.reason)
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Failed to create order:", error);
            message.error("Đặt hàng thất bại. Vui lòng thử lại!");
        }

        setIsLoading(false);
    };

    useEffect(() => {

        if (totalPrice + fee < (customer?.data?.point || 0)) {
            setMaxDiscount(totalPrice + fee)
            formMethod.setValue("discount_point", totalPrice + fee || 0)
        } else {
            setMaxDiscount(customer?.data?.point || 0)
            formMethod.setValue("discount_point", customer?.data?.point || 0)
        }

    }, [totalPrice, fee, customer?.data?.point])

    useEffect(() => {
        setTotalAmount(totalPrice + fee - (formMethod.getValues("discount_point") || 0))
    }, [totalPrice, fee, watch("discount_point")])

    return (
        <MainLayout>
            <div style={{ paddingTop: "20px" }}>
                <Form layout="vertical" onFinish={formMethod.handleSubmit(handleCheckout)}>
                    <Row gutter={24}>
                        <Col xs={23} lg={14}>
                            <Card bordered style={{ marginBottom: "20px" }}>
                                <Title level={4} style={{ marginBottom: "20px" }}>
                                    Thông tin khách hàng
                                </Title>
                                <TextInput
                                    name="customer_name"
                                    label="Họ và Tên"
                                    placeholder="Tên khách hàng"
                                    control={formMethod.control}
                                    errors={formMethod.formState.errors.customer_name}
                                />

                                <TextInput
                                    name="customer_phone"
                                    label="Số điện thoại"
                                    placeholder="Số điện thoại"
                                    control={formMethod.control}
                                    errors={formMethod.formState.errors.customer_phone}
                                />
                                <TextInput
                                    name="customer_email"
                                    label="Email"
                                    placeholder="Email"
                                    control={formMethod.control}
                                    errors={formMethod.formState.errors.customer_phone}
                                    disabled
                                />

                                <SelectInput
                                    name="province_code"
                                    label="Tỉnh/Thành phố"
                                    placeholder="Chọn tỉnh/thành phố"
                                    control={formMethod.control}
                                    options={(provinces?.data || []).map((province) => ({
                                        value: province.code,
                                        label: province.full_name,
                                    }))}
                                    errors={formMethod.formState.errors.province_code}
                                />

                                <SelectInput
                                    name="district_code"
                                    label="Quận/Huyện"
                                    placeholder="Chọn quận/huyện"
                                    control={formMethod.control}
                                    options={(districts?.data || []).map((district) => ({
                                        value: district.code,
                                        label: district.full_name,
                                    }))}
                                    errors={formMethod.formState.errors.district_code}
                                />

                                <SelectInput
                                    name="ward_code"
                                    label="Xã/Phường"
                                    placeholder="Chọn xã/phường"
                                    control={formMethod.control}
                                    options={(wards?.data || []).map((ward) => ({
                                        value: ward.code,
                                        label: ward.full_name,
                                    }))}
                                    errors={formMethod.formState.errors.ward_code}
                                />

                                <TextInput
                                    name="street"
                                    label="Số nhà, tên đường"
                                    placeholder="Số nhà, tên đường"
                                    control={formMethod.control}
                                    errors={formMethod.formState.errors.street}
                                />
                                <Form.Item label="Ghi chú giao hàng" name="note">
                                    <Input.TextArea rows={3} placeholder="Ghi chú giao hàng (nếu có)" />
                                </Form.Item>
                                {
                                    user.id != "" && (
                                        <div className='mb-[5px] mt-[5px] w-full'>
                                            <button type='button' className="text-black bg-[#DFDFDF] hover:bg-[#9BC3FF] w-full xl:w-fit h-[42px] px-[5px]" onClick={() => setToggleAddress(!toggleAddress)}>
                                                chọn địa chỉ khác
                                            </button>
                                        </div>
                                    )

                                }
                            </Card>
                        </Col>
                        <Col xs={23} lg={10}>
                            <Card bordered>
                                <Title level={4} style={{ marginBottom: "20px" }}>
                                    Thông tin đơn hàng
                                </Title>
                                <div>
                                    {cartItems.map((item: any) => (
                                        <div
                                            key={item.id}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <Text>{item.name}</Text>
                                            <Text>x{item.quantity}</Text>
                                            <Text>{handleStatusBook(item.type)}</Text>
                                            <Text>{(item.price * item.quantity).toLocaleString()}đ</Text>
                                        </div>
                                    ))}
                                    <Divider />
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <Text>Tạm tính</Text>
                                        <Text>{totalPrice.toLocaleString()}đ</Text>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <Text>Phí vận chuyển</Text>
                                        <Text>{fee.toLocaleString()}đ</Text>
                                    </div>
                                    <Divider />
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <Text>Tổng cộng</Text>
                                        <Text style={{ color: "#1E90FF", fontSize: "18px" }}>
                                            {(totalAmount).toLocaleString()}đ
                                        </Text>
                                    </div>
                                </div>
                            </Card>

                            <Card bordered>
                                <Title level={4}> Thông tin nhận hàng</Title>
                                <Radio.Group
                                    onChange={(e) => handleOrderStatusChange(e.target.value)}
                                    value={orderStatus}
                                    style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                                >
                                    <Radio value="3">Đơn lẻ</Radio>
                                    <Radio value="1" disabled={watch("payment_method") == 1} onClick={() => setIsModalVisible(!isModalVisible)}>Đơn gom (chờ gom thêm)</Radio>
                                    <Radio value="2" disabled={watch("payment_method") == 1} onClick={() => setIsModalVisible(!isModalVisible)}>Đơn gom (đã gom đủ)</Radio>
                                </Radio.Group>
                            </Card>
                            <Card bordered style={{ marginTop: "20px" }}>
                                <Title level={4}>Dùng điểm thưởng <Text className="italic">(Mỗi điểm tương ứng 1đ)</Text></Title>

                                <TextInput
                                    name="discount_point"
                                    label={`Số điểm - Tối đa ${maxDiscount} điểm`}
                                    placeholder="Nhập số điểm (nếu có)"
                                    control={formMethod.control}
                                    min={0}
                                    max={customer?.data.point || 0}
                                    type="number"
                                    errors={formMethod.formState.errors.discount_point}

                                />
                                <Title level={4}>Phương thức thanh toán</Title>
                                <RadioInput
                                    name="payment_method"
                                    label=""
                                    control={formMethod.control}
                                    errors={formMethod.formState.errors.payment_method}
                                    options={[
                                        { label: "Thanh toán khi nhận hàng (COD)", value: 1 },
                                        { label: "Thanh toán trực tuyến", value: 2 },
                                    ]}
                                    rules={{ required: "Please select a payment method" }}
                                />
                                <Space style={{ marginTop: "20px" }}>
                                    <Button onClick={() => console.log("Go Back")}>Quay lại</Button>
                                    <Button type="primary" htmlType="submit" loading={isLoading}>
                                        Đặt hàng
                                    </Button>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </Form>
                {
                    toggleAddress && (
                        <div>
                            <PopUp toggle={toggleAddress} setToggle={() => setToggleAddress(!toggleAddress)}>
                                <ShippingAddressPopUp
                                    reload={reload}
                                    setSelectedId={setSelectedId}
                                    toggleAddress={toggleAddress}
                                    setToggleAddress={setToggleAddress}
                                />
                            </PopUp>
                        </div>

                    )
                }
                {
                    isModalVisible && orders?.data?.length > 0 && (
                        <CombinedOrder
                            visible={isModalVisible}
                            onClose={() => setIsModalVisible(false)}
                            orders={orders?.data || []}
                            onSelect={handleSelectOrder}
                        />
                    )
                }
            </div>
        </MainLayout>

    );
};

export default Checkout;

import { useEffect, useState } from "react";
import { IShippingAddressProps } from "./interface";
import UpdateShippingAddressPopUp from "./component/UpdateShippingAddressPopUp";
import CreateShippingAddressPopUp from "./component/CreateShippingAddressPopUp";
import NarrowIcon from "@/icons/NarrowIcon";
import { useShippingAddresses } from "@/api/shipment";
import { Modal, Button, Typography, List, Row, Col, Tag } from "antd";

const { Text } = Typography;

const ShippingAddress = (props: IShippingAddressProps) => {
    const [toggleDetail, setToggleDetail] = useState(false);
    const [selectedId, setSelectedId] = useState<string>();
    const [toggleCreate, setToggleCreate] = useState(false);
    const [reload, setReload] = useState(0);
    const { shippingAddresses } = useShippingAddresses({ reload });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1280);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <div>
                {!isMobile ? (
                    <Row justify="space-between" align="middle">
                        <Text style={{ color: "#888888", fontSize: "16px" }}>
                            [ địa chỉ nhận hàng ]
                        </Text>
                        <Button
                            type="default"
                            icon={<NarrowIcon />}
                            onClick={() => setToggleCreate(!toggleCreate)}
                        >
                            Thêm mới
                        </Button>
                    </Row>
                ) : (
                    <Button
                        type="default"
                        icon={<NarrowIcon />}
                        onClick={() => setToggleCreate(!toggleCreate)}
                        style={{
                            width: "100%",
                            marginTop: 30,
                        }}
                    >
                        Thêm mới
                    </Button>
                )}
                <div style={{ marginTop: 30, paddingBottom: 200 }}>
                    <List
                        dataSource={shippingAddresses?.data}
                        renderItem={(shippingAddress) => (
                            <List.Item
                                style={{
                                    borderBottom: "1px solid #e0e0e0",
                                    marginBottom: 20,
                                    paddingBottom: 15,
                                }}
                                key={shippingAddress.id}
                            >
                                <div style={{ width: "100%" }}>
                                    <Row justify="space-between" align="top">
                                        <Col style={{ flex: 1 }}>
                                            <div style={{ fontSize: 16, fontWeight: "bold" }}>
                                                Họ tên: {shippingAddress.full_name}
                                            </div>
                                            <div style={{ marginTop: 5 }}>
                                                Địa chỉ: {`${shippingAddress.street}, ${shippingAddress.district?.full_name || ""
                                                    }, ${shippingAddress.province?.full_name || ""}`}
                                            </div>
                                            <div style={{ marginTop: 5 }}>Số điện thoại: {shippingAddress.phone_number}</div>
                                        </Col>
                                        <Col>
                                            {shippingAddress.default && (
                                                <Tag color="green" style={{ marginBottom: 10 }}>
                                                    Địa chỉ mặc định
                                                </Tag>
                                            )}
                                            <Button
                                                type="link"
                                                style={{
                                                    color: "#1E71FF",
                                                    fontWeight: 500,
                                                }}
                                                onClick={() => {
                                                    setSelectedId(shippingAddress.id);
                                                    setToggleDetail(true);
                                                }}
                                            >
                                                Chỉnh sửa địa chỉ
                                            </Button>
                                            <Button
                                                type="link"
                                                danger
                                                onClick={() => handleDelete(shippingAddress.id)}
                                            >
                                                Xóa
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>

            </div>
            <Modal
                open={toggleDetail}
                onCancel={() => setToggleDetail(false)}
                footer={null}
            >
                <UpdateShippingAddressPopUp
                    setReload={setReload}
                    id={selectedId}
                    setToggle={setToggleDetail}
                    reload={reload}
                />
            </Modal>
            <Modal
                open={toggleCreate}
                onCancel={() => setToggleCreate(false)}
                footer={null}
            >
                <CreateShippingAddressPopUp
                    setReload={setReload}
                    setToggle={setToggleCreate}
                />
            </Modal>
        </>
    );
};

export default ShippingAddress;

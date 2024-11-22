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
                                    borderBottom: "1px solid #888888",
                                    marginBottom: 20,
                                    paddingBottom: 10,
                                }}
                                key={shippingAddress.id}
                            >
                                <div style={{ width: "100%" }}>
                                    <Row justify="space-between" align="middle">
                                        <Col>
                                            <Row gutter={10}>
                                                <Col style={{ color: "#1E71FF" }}>
                                                    {shippingAddress.full_name}
                                                </Col>
                                                <Col>|</Col>
                                                <Col>{shippingAddress.phone_number}</Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Button
                                                type="link"
                                                style={{ color: "#888888", fontStyle: "italic" }}
                                                onClick={() => {
                                                    setSelectedId(shippingAddress.id);
                                                    setToggleDetail(true);
                                                }}
                                            >
                                                Sửa
                                            </Button>
                                        </Col>
                                    </Row>
                                    <div style={{ marginTop: 5 }}>
                                        {`${shippingAddress.street}, ${shippingAddress.district.full_name}`}
                                    </div>
                                    <div style={{ marginTop: 5 }}>
                                        {`${shippingAddress.ward.full_name}, ${shippingAddress.province.full_name}`}
                                    </div>
                                    {shippingAddress.default && (
                                        <Tag
                                            color="blue"
                                            style={{ marginTop: 5, fontStyle: "italic" }}
                                        >
                                            Mặc định
                                        </Tag>
                                    )}
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

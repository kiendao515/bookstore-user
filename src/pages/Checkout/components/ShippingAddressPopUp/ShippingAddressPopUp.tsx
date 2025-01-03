import { useEffect, useState } from "react";
import { Modal, List, Button, Typography, Space, Divider } from "antd";
import { IShippingAddressPopUpProps } from "./interface";
import NarrowIcon from "@/icons/NarrowIcon";
import { useShippingAddresses } from "@/api/shipment";

const { Text } = Typography;

const ShippingAddressPopUp = (props: IShippingAddressPopUpProps) => {
    const { reload, setSelectedId, toggleAddress, setToggleAddress } = props;
    const { shippingAddresses } = useShippingAddresses({ reload });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1280);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSelectAddress = (id: string) => {
        setSelectedId(id);
        setToggleAddress(false);
    };

    return (
        <Modal
            visible={toggleAddress}
            onCancel={() => setToggleAddress(false)}
            footer={null}
            title="Danh sách địa chỉ đã lưu"
            centered

        >
            <List
                dataSource={shippingAddresses?.data || []}
                renderItem={(shippingAddress) => (
                    <List.Item>
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Text>
                                <b>{shippingAddress.full_name}</b> | {shippingAddress.phone_number}
                            </Text>
                            <Text>{`${shippingAddress.street}, ${shippingAddress.district.full_name}`}</Text>
                            <Text>{`${shippingAddress.ward.full_name}, ${shippingAddress.province.full_name}`}</Text>
                            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                                <div>
                                    {shippingAddress.default && (
                                        <Text type="secondary" italic>
                                            Mặc định
                                        </Text>
                                    )}
                                </div>
                                <Button
                                    type="primary"
                                    onClick={() => handleSelectAddress(shippingAddress.id)}
                                    icon={<NarrowIcon />}
                                >
                                    Chọn
                                </Button>
                            </div>
                            <Divider />
                        </Space>
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default ShippingAddressPopUp;

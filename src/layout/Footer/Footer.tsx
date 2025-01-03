import { FacebookOutlined, InstagramOutlined, MailOutlined, PhoneOutlined, TikTokOutlined } from "@ant-design/icons";
import { Col, Layout, Row, Typography } from "antd";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;
const AppFooter = (props: IFooterProps) => {
    const { } = props;
    return (
        <Footer
            style={{
                backgroundColor: "#004aad",
                color: "#fff",
                textAlign: "center",
                padding: "20px 0"
            }}
        >
            <div className="flex-grow 2xl:w-[1500px] 2xl:mx-[auto] xl:w-[1149px] xl:mx-auto lg:mx-[50px] mx-[19px]">
                <Row gutter={[16, 16]} justify="space-between">
                    {/* Cột 1 */}
                    <Col xs={24} md={6}>
                        <Title level={5} style={{ color: "#fff", marginBottom: "16px", textAlign: "left" }}>
                            Về chúng tôi
                        </Title>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "2", textAlign: "left" }}>
                            <li><Link href="/introduction" style={{ color: "#fff" }}>Giới thiệu Hộp</Link></li>
                            <li><Link href="/store" style={{ color: "#fff" }}>Cửa hàng</Link></li>
                            <li><Link href="/offers" style={{ color: "#fff" }}>Thông báo - Ưu đãi</Link></li>
                        </ul>
                    </Col>
                    <Col xs={24} md={6}>
                        <Title level={5} style={{ color: "#fff", marginBottom: "16px", textAlign: "left" }}>
                            Trợ giúp
                        </Title>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "2", textAlign: "left" }}>
                            <li><Link href="/policy" style={{ color: "#fff" }}>Chính sách mua hàng - Bảo mật</Link></li>
                            <li><Link href="/complaints" style={{ color: "#fff" }}>Khiếu nại</Link></li>
                            <li><Link href="/resell" style={{ color: "#fff" }}>Thu mua - Ký gửi</Link></li>
                        </ul>
                    </Col>
                    <Col xs={24} md={6}>
                        <Title level={5} style={{ color: "#fff", marginBottom: "16px", textAlign: "left" }}>
                            Mạng xã hội
                        </Title>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "2", textAlign: "left" }}>
                            <li>
                                <Link href="https://facebook.com" style={{ color: "#fff", display: "flex", alignItems: "center", gap: "5px" }}>
                                    <FacebookOutlined /> Facebook
                                </Link>
                            </li>
                            <li>
                                <Link href="https://tiktok.com" style={{ color: "#fff", display: "flex", alignItems: "center", gap: "5px" }}>
                                    <TikTokOutlined /> Tiktok
                                </Link>
                            </li>
                            <li className="flex items-center gap-[5px]">
                                <Link href="https://instagram.com" style={{ color: "#fff", display: "flex", alignItems: "center", gap: "5px" }}>
                                    <InstagramOutlined /> Instagram
                                </Link>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={24} md={6}>
                        <Title level={5} style={{ color: "#fff", marginBottom: "16px", textAlign: "left" }}>
                            Thông tin liên hệ
                        </Title>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "2", textAlign: "left" }}>
                            <li>
                                <Text style={{ color: "#fff" }}>
                                    Ngách 21 - Ngõ 238 Âu Cơ, Quảng An, Tây Hồ, Hà Nội, Việt Nam
                                </Text>
                            </li>
                            <li className="flex items-center gap-[5px]">
                                <PhoneOutlined /> <Text style={{ color: "#fff" }}>+84 98 220 36 56</Text>
                            </li>
                            <li className="flex items-center gap-[5px]">
                                <MailOutlined /> <Text style={{ color: "#fff" }}>hieusachhop@gmail.com</Text>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <div style={{ marginTop: "24px", borderTop: "1px solid #fff", paddingTop: "10px" }}>
                    <Text style={{ color: "#fff" }}>Copyright 2024. All Rights Reserved</Text>
                </div>
            </div>
        </Footer>
    )
}

export default AppFooter;
import { FacebookOutlined, InstagramOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
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
                padding: "40px 100px",
                textAlign: "center",
            }}
        >
            <Row gutter={[16, 16]} justify="space-between">
                {/* Cột 1 */}
                <Col xs={24} md={6}>
                    <Title level={5} style={{ color: "#fff", marginBottom: "16px" }}>
                        Về chúng tôi
                    </Title>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "2" }}>
                        <li><Link href="/introduction" style={{ color: "#fff" }}>Giới thiệu Hộp</Link></li>
                        <li><Link href="/store" style={{ color: "#fff" }}>Cửa hàng</Link></li>
                        <li><Link href="/offers" style={{ color: "#fff" }}>Thông báo - Ưu đãi</Link></li>
                    </ul>
                </Col>
                {/* Cột 2 */}
                <Col xs={24} md={6}>
                    <Title level={5} style={{ color: "#fff", marginBottom: "16px" }}>
                        Trợ giúp
                    </Title>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "2" }}>
                        <li><Link href="/policy" style={{ color: "#fff" }}>Chính sách mua hàng - Bảo mật</Link></li>
                        <li><Link href="/complaints" style={{ color: "#fff" }}>Khiếu nại</Link></li>
                        <li><Link href="/resell" style={{ color: "#fff" }}>Thu mua - Ký gửi</Link></li>
                    </ul>
                </Col>
                {/* Cột 3 */}
                <Col xs={24} md={6}>
                    <Title level={5} style={{ color: "#fff", marginBottom: "16px" }}>
                        Mạng xã hội
                    </Title>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "2" }}>
                        <li>
                            <Link href="https://facebook.com" style={{ color: "#fff" }}>
                                <FacebookOutlined /> Facebook
                            </Link>
                        </li>
                        <li>
                            <Link href="https://tiktok.com" style={{ color: "#fff" }}>
                                <InstagramOutlined /> Tiktok
                            </Link>
                        </li>
                        <li>
                            <Link href="https://instagram.com" style={{ color: "#fff" }}>
                                <InstagramOutlined /> Instagram
                            </Link>
                        </li>
                    </ul>
                </Col>
                {/* Cột 4 */}
                <Col xs={24} md={6}>
                    <Title level={5} style={{ color: "#fff", marginBottom: "16px" }}>
                        Thông tin liên hệ
                    </Title>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "2" }}>
                        <li>
                            <Text style={{ color: "#fff" }}>
                                Địa chỉ: Ngách 21 - Ngõ 238 Âu Cơ, Quảng An, Tây Hồ, Hà Nội, Việt Nam
                            </Text>
                        </li>
                        <li>
                            <PhoneOutlined /> <Text style={{ color: "#fff" }}>+84 98 220 36 56</Text>
                        </li>
                        <li>
                            <MailOutlined /> <Text style={{ color: "#fff" }}>hieusachhop@gmail.com</Text>
                        </li>
                    </ul>
                </Col>
            </Row>
            <div style={{ marginTop: "24px", borderTop: "1px solid #fff", paddingTop: "10px" }}>
                <Text style={{ color: "#fff" }}>Copyright 2024. All Rights Reserved</Text>
            </div>
        </Footer>
    )
}

export default AppFooter;
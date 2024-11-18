import { IConfirmRegistrationPopUpProps } from "./interface";
import { Typography, Space, Row, Col } from "antd";

const { Text } = Typography;

const ConfirmRegistrationPopUp = (props: IConfirmRegistrationPopUpProps) => {
  return (
    <Row
      justify="center"
      align="middle"
    >
      <Col>
        <Space
          direction="vertical"
          align="center"
          size="large"
          style={{ textAlign: "center" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "185px",
              height: "185px",
            }}
          >
            <img
              src="/assets/icons/box_logo.svg"
              alt="Logo"
              style={{ width: "85px", height: "81px" }}
            />
          </div>
          <Text style={{ fontSize: "16px", color: "#595959" }}>
            Vui lòng kiểm tra email và xác nhận để hoàn thành việc tạo tài khoản.
          </Text>
        </Space>
      </Col>
    </Row>
  );
};

export default ConfirmRegistrationPopUp;

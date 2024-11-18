import { useEffect, useState } from "react";
import { Button, Col, Row, Space } from "antd";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ConfirmRegistrationPopUp from "./components/ConfirmRegistrationPopUp/ConfirmRegistrationPopUp";
import ResetPasswordForm from "./components/ResetPasswordForm";
import { useSearchParams } from "react-router-dom";
import { IAuthPopUpProps } from "./interface";

const AuthPopUp = (props: IAuthPopUpProps) => {
  const [index, setIndex] = useState(1);
  const [searchParams] = useSearchParams();
  const isResetPwd = searchParams.get("is_reset_pwd");
  const isConfirmSuccess = searchParams.get("is_confirm_success");
  const isChangePwdSuccess = searchParams.get("is_change_pwd_success");

  useEffect(() => {
    if (isResetPwd === "1") {
      setIndex(5);
      return;
    }
    if (isConfirmSuccess === "1" || isChangePwdSuccess === "1") {
      setIndex(1);
      return;
    }
  }, [isResetPwd, isConfirmSuccess, isChangePwdSuccess]);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Row justify="center" gutter={[16, 16]}>
        <Col span={24}>
          <Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
            {[1, 2].includes(index) && (
              <>
                <Button type={index === 1 ? "primary" : "default"} onClick={() => setIndex(1)}>
                  Đăng nhập
                </Button>
                <Button type={index === 2 ? "primary" : "default"} onClick={() => setIndex(2)}>
                  Tạo tài khoản
                </Button>
              </>
            )}
            {[4, 5].includes(index) && (
              <Button type={index === 4 || index === 5 ? "primary" : "default"} onClick={() => setIndex(4)}>
                Quên mật khẩu
              </Button>
            )}
          </Space>
        </Col>
        <Col span={24}>
          {index === 1 && <LoginForm setIndex={setIndex} />}
          {index === 2 && <RegisterForm setIndex={setIndex} />}
          {index === 3 && <ConfirmRegistrationPopUp />}
          {index === 4 && <ForgotPasswordForm setIndex={setIndex} />}
          {index === 5 && <ResetPasswordForm setIndex={setIndex} />}
        </Col>
      </Row>
    </div>
  );
};

export default AuthPopUp;

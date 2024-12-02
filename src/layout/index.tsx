import PopUp from "@/ui/PopUp/PopUp";
import Footer from "./Footer";
import Header from "./Header";
import FindBook from "@/pages/FindBook";
import CartPopUp from "@/pages/CartPopUp";
import WelcomeSection from "./Welcome/Welcome";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { setToggleByKey } from "@/store/duck/togglePopUp/slice";
import AuthPopUp from "@/pages/AuthPopUp";
import { Modal } from "antd";

const MainLayout = (props: IMainLayoutProps) => {
    const { children } = props;
    let [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const isResetPwd = searchParams.get("is_reset_pwd");
    const isConfirmSuccess = searchParams.get("is_confirm_success");
    const isChangePwdSuccess = searchParams.get("is_change_pwd_success");
    const { toggleAuth, toggleFindBook, toggleCart } = useAppSelector((state: RootState) => state.togglePopUp);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if ((isResetPwd == "1" && token) || isConfirmSuccess == "1" || isChangePwdSuccess == "1") {
            dispatch(setToggleByKey({
                key: "toggleAuth",
                value: true
            }))
        }
    }, [isResetPwd, isConfirmSuccess, isChangePwdSuccess]);

    return (
        <div>
            <div className="flex flex-col min-h-screen">
    <Header />
    <div className="flex-grow mx-[100px]">
        {children}
    </div>
    <Footer />
</div>

            {
                toggleFindBook &&
                <div>
                    <PopUp toggle={toggleFindBook} setToggle={() => dispatch(setToggleByKey({ key: 'toggleFindBook', value: !toggleFindBook }))}>
                        <FindBook />
                    </PopUp>
                </div>
            }
            {
                toggleCart && (
                    <div>
                        <PopUp toggle={toggleCart} setToggle={() => dispatch(setToggleByKey({ key: 'toggleCart', value: !toggleCart }))}>
                            <CartPopUp />
                        </PopUp>
                    </div>
                )
            }
            {
                toggleAuth && ( // Use isAuthPopupOpen instead
                    <div>
                        <Modal open={toggleAuth} onCancel={() => dispatch(setToggleByKey({ key: 'toggleAuth', value: !toggleAuth }))} footer={null}>
                            <AuthPopUp />
                        </Modal>
                    </div>
                )
            }
        </div>
    )
}

export default MainLayout;
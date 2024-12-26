import PopUp from "@/ui/PopUp/PopUp";
import Footer from "./Footer";
import Header from "./Header";
import FindBook from "@/pages/FindBook";
import CartPopUp from "@/pages/CartPopUp";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { setToggleByKey } from "@/store/duck/togglePopUp/slice";
import AuthPopUp from "@/pages/AuthPopUp";
import { Modal } from "antd";
import { IWebContent, setWebContents } from "@/store/duck/webContent/slice";
import { useWebContents } from "@/api/webContent";

const MainLayout = (props: IMainLayoutProps) => {
    const { children } = props;
    let [searchParams] = useSearchParams();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const token = searchParams.get("token");
    const isResetPwd = searchParams.get("is_reset_pwd");
    const { webContents } = useWebContents({})
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

    useEffect(() => {
        let contents: IWebContent[] = []
        if (!webContents?.data) {
            return;
        }
        for (let i = 0; i < webContents.data.length; i++) {
            let webContent = webContents.data[i];
            contents.push({
                key: webContent.key,
                property: webContent.property,
                image: webContent.image,
                title: webContent.title,
                value: webContent.value
            })
        }
        dispatch(setWebContents({
            contents: contents
        }))
    }, [webContents])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <div className="flex flex-col min-h-screen w-full">
                <Header />
                <div className="h-[70px]"></div>
                <div className="flex-grow 2xl:w-[1500px] 2xl:mx-[auto] xl:w-[1149px] xl:mx-auto lg:mx-[50px] mx-[19px]">
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
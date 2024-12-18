import MenuBar from "./components/MenuBar/MenuBar";
import { useEffect, useState } from "react";
import UserInfo from "./components/UserInfo/UserInfo";
import ChangePassword from "./components/ChangePassword/ChangePassword";
// import FavoriteBook from "./components/FavoriteBook/FavoriteBook";
import Order from "./components/Order/Order";
import ShippingAddress from "./components/ShippingAddress/ShippingAddress";
import { useSearchParams } from "react-router-dom";
import MenuBarMobile from "./components/MenuBarMobile/MenuBarMobile";
import MainLayout from "@/layout";
import FavoriteBook from "./components/FavoriteBook/FavoriteBook";

const AccountPage = () => {
    const [searchParams] = useSearchParams()
    const [index, setIndex] = useState(searchParams.get("index") ? Number(searchParams.get("index")) : 1)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1280);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <MainLayout>
            <div>
                {
                    isMobile && (
                        <MenuBarMobile index={index} setIndex={setIndex} />
                    )
                }
                <div className="grid grid-cols-1 xl:grid-cols-4 pb-[50px] xl:pb-[220px] mt-[10px] xl:mt-[40px] gap-[50px]">
                    {
                        !isMobile && (
                            <div className="col-span-1 ">
                                <MenuBar index={index} setIndex={setIndex} />
                            </div>
                        )
                    }
                    {index == 1 &&
                        <div className={`col-span-2`}>
                            <UserInfo />
                        </div>
                    }
                    {index == 2 &&
                        <div className={`col-span-2`}>
                            <ShippingAddress />
                        </div>
                    }
                    {index == 3 &&
                        <div className={`col-span-2`}>
                            <ChangePassword />
                        </div>
                    }
                    {index == 4 &&
                        <div className={`col-span-3`}>
                            <FavoriteBook />
                        </div>
                    }
                    {index == 5 &&
                        <div className={`col-span-3`}>
                            <Order />
                        </div>
                    }
                </div>
            </div>
        </MainLayout>
    )
}

export default AccountPage;
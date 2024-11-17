import PopUp from "@/ui/PopUp/PopUp";
import Footer from "./Footer";
import Header from "./Header";
import FindBook from "@/pages/FindBook";
import { useState } from "react";
import CartPopUp from "@/pages/CartPopUp";
import WelcomeSection from "./Welcome/Welcome";

const MainLayout = (props: IMainLayoutProps) => {
    const { children } = props;
    const [toggleFindBook, setToggleFindBook] = useState<boolean>(false);
    const [toggleCart, setToggleCart] = useState<boolean>(false);
    return (
        <div>
            <div className="flex flex-col w-full">
                <Header
                    toggleFindBook={toggleFindBook}
                    setToggleFindBook={setToggleFindBook}
                    toggleCart={toggleCart}
                    setToggleCart={setToggleCart}
                />
                <WelcomeSection/>
                <div className="mx-[100px]">
                    {children}
                </div>
                <Footer />
            </div>
            {
                toggleFindBook &&
                <div>
                    <PopUp toggle={toggleFindBook} setToggle={setToggleFindBook}>
                        <FindBook />
                    </PopUp>
                </div>

            }
            {
                toggleCart && (
                    <div>
                        <PopUp toggle={toggleCart} setToggle={setToggleCart}>
                            <CartPopUp />
                        </PopUp>
                    </div>

                )
            }
        </div>
    )
}

export default MainLayout;
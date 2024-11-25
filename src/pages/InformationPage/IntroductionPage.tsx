
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuBar from "./component/MenuBar/MenuBar";
import Introduction from "./component/Introduction/Introduction";
import Policy from "./component/Policy/Policy";
import Compliant from "./component/Compliant/Compliant";
import MenuBarMobile from "./component/MenuBarMobile/MenuBarMobile";
import MainLayout from "@/layout";

const IntroductionPage = () => {
    const [searchParams] = useSearchParams()
    const [index, setIndex] = useState(1)
    const [title, setTitle] = useState("giới thiệu")
    useEffect(() => {
        setIndex(searchParams.get("index") ? Number(searchParams.get("index")) : 1)
        if (searchParams.get("index") == "1") {
            setTitle("Hộp tự giới thiệu")
        } else if (searchParams.get("index") == "2") {
            setTitle("chính sách")
        } else if (searchParams.get("index") == "3") {
            setTitle("khiếu nại")
        }

    }, [searchParams.get("index")])

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
                {/* {
                    isMobile && (
                        <div className="h-[45px] mobile-regular border-b-[1px] border-[#8C8C8C] border-solid flex items-center sticky top-[50px] z-20 bg-layout">
                            <text className="text-[#8C8C8C] mobile-regular" >[ {title} ]</text>
                        </div>
                    )
                } */}
                {
                    isMobile && (
                        <MenuBarMobile index={index} setIndex={setIndex} />
                    )
                }

                <div className="grid grid-cols-2 xl:grid-cols-4 pb-[220px] mt-[40px]">
                    {
                        !isMobile && (
                            <div className="col-span-1 ">
                                <MenuBar index={index} setIndex={setIndex} />
                            </div>

                        )
                    }
                    {index == 1 &&
                        <div className={`col-span-2`}>
                            <Introduction />
                        </div>
                    }
                    {index == 2 &&
                        <div className={`col-span-2`}>
                            <Policy />
                        </div>
                    }
                    {index == 3 &&
                        <div className={`col-span-2`}>
                            <Compliant />
                        </div>
                    }
                </div>
            </div>
        </MainLayout>
    )
}

export default IntroductionPage;
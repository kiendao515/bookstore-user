import { useEffect, useState } from "react";
import { IIntroductionProps } from "./interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getContent } from "@/utils/common";
import { ContentKeyEnum } from "@/utils/enum/content-key.enum";

const Introduction = (props: IIntroductionProps) => {
    const { } = props;
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);
    const { contents = [] } = useSelector((state: RootState) => state.webContent)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1280);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="w-full xl:w-[576px]">
            {
                !isMobile && (
                    <text className="mobile-title text-[#888888]">[ Hộp tự giới thiệu ]</text>
                )
            }
            <div className="w-fullxl:w-[576px] mt-[22px] mobile-regular" dangerouslySetInnerHTML={{ __html: getContent(contents, ContentKeyEnum.INTRODUCTION) }} />
        </div>

    )
}

export default Introduction;
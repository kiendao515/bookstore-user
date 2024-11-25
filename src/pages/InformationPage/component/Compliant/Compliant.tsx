import { useEffect, useState } from "react";
import { ICompliantProps } from "./interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getContent } from "@/utils/common";
import { ContentKeyEnum } from "@/utils/enum/content-key.enum";

const Compliant = (props: ICompliantProps) => {
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
                    <text className="title text-[#888888]">[ khiếu nại ]</text>
                )
            }
            <div className="w-full xl:w-[576px] mt-[22px]" dangerouslySetInnerHTML={{ __html: getContent(contents, ContentKeyEnum.COMPLAINT) }} />
            <div className="mt-[38px]" dangerouslySetInnerHTML={{ __html: getContent(contents, ContentKeyEnum.COMPLAINT_LINK) }} />
        </div >
    )
}

export default Compliant;
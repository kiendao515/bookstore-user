import { useState } from "react";
import { IPolicyProps } from "./interface";
import ToggleDown from "@/icons/ToggleDown";
import ToggleUp from "@/icons/ToggleUp";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { ContentKeyEnum } from "@/utils/enum/content-key.enum";
import { getContent } from "@/utils/common";

const Policy = (props: IPolicyProps) => {
    const { } = props;
    const [toggleBuyingPolicy, setToggleBuyingPolicy] = useState(false);
    const [togglePolicy, setTogglePolicy] = useState(false);
    const { contents = [] } = useSelector((state: RootState) => state.webContent)

    return (
        <div className="w-full xl:w-[666px]">
            <div className="w-full xl:w-[666px]">
                <div className="flex gap-[10px] items-center w-full xl:w-[666px] border-b-[1px] border-black border-solid">
                    <div>
                        <text className="text-[24px] leading-[28px] text-[#888888]" onClick={() => setTogglePolicy(!togglePolicy)}>[ chính sách mua hàng ]</text>
                    </div>
                    {
                        toggleBuyingPolicy && (
                            <div>
                                <ToggleUp fill="#8C8C8C" className="w-[15px] h-[8px] z-20 hover:cursor-pointer" onClick={() => setToggleBuyingPolicy(false)} />
                            </div>
                        )
                    }
                    {
                        !toggleBuyingPolicy && (
                            <div>
                                <ToggleDown color="#888888" fill="#8C8C8C" strokeColor="#888888" className="w-[15px] h-[8px] z-20  hover:cursor-pointer" onClick={() => setToggleBuyingPolicy(true)} />
                            </div>
                        )
                    }

                </div>
                {
                    toggleBuyingPolicy && (
                        <div className="mt-[15px] mobile-regular" dangerouslySetInnerHTML={{ __html: getContent(contents, ContentKeyEnum.BUYING_POLICY) }} />
                    )
                }
            </div>
            <div className="w-full xl:w-[666px] mt-[25px]">
                <div className="flex gap-[10px] items-center w-full xl:w-[666px]  border-b-[1px] border-black border-solid">
                    <div className="w-full">
                        <text className="text-[24px] leading-[28px] text-[#888888]" onClick={() => setTogglePolicy(!togglePolicy)}>[ chính sách bảo mật ]</text>
                    </div>
                    {
                        togglePolicy && (
                            <div>
                                <ToggleUp className="w-[15px] h-[8px] z-20 text-[#888888] hover:cursor-pointer" onClick={() => setTogglePolicy(false)} />
                            </div>
                        )
                    }
                    {
                        !togglePolicy && (
                            <div>
                                <ToggleDown className="w-[15px] h-[8px] z-20 text-[#888888] hover:cursor-pointer" onClick={() => setTogglePolicy(true)} />
                            </div>
                        )
                    }

                </div>
                {
                    togglePolicy && (
                        <div className="mt-[15px] mobile-regular" dangerouslySetInnerHTML={{ __html: getContent(contents, ContentKeyEnum.SECURITY_POLICY) }} />
                    )
                }
            </div>
        </div>

    )
}

export default Policy;
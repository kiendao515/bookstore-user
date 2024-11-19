import { useEffect, useState } from "react";
import { IShippingAddressPopUpProps } from "./interface";
import NarrowIcon from "@/icons/NarrowIcon";
import { useShippingAddresses } from "@/api/shipment";

const ShippingAddressPopUp = (props: IShippingAddressPopUpProps) => {
    const { reload, setSelectedId, toggleAddress, setToggleAddress } = props;
    const { shippingAddresses } = useShippingAddresses({ reload });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1280);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col justify-center w-screen h-[100vh] xl:w-[900px] xl:h-[600px] px-[20px] xl:px-[100px]">
            <div>
                <div className="mt-[30px] pb-[20px] h-[80vh] xl:h-[400px] overflow-y-scroll no-scrollbar">
                    {
                        shippingAddresses?.data.map((shippingAddress) => {
                            return (
                                <div className={`w-full border-b-[1px] border-[#888888] mt-[20px] pb-[20px]`}>
                                    <div className="flex justify-between">
                                        <div className="flex gap-[10px]">
                                            <div className="text-[#1E71FF]">{shippingAddress.full_name}</div>
                                            <div>|</div>
                                            <div>{shippingAddress.phone_number}</div>
                                        </div>
                                        {
                                            !isMobile && (
                                                <div className="mt-[5px]">
                                                    <button type="button" className="italic hover:bg-white flex gap-[10px] items-center" onClick={() => {
                                                        setSelectedId(shippingAddress?.id)
                                                        setToggleAddress(!toggleAddress)
                                                    }}>
                                                        <NarrowIcon className="w-[20px] h-[16px] text-[18px] fill-current" />
                                                        chọn
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="mt-[5px]">{`${shippingAddress.street}, ${shippingAddress.district.full_name}`}</div>
                                    <div className="mt-[5px]">{`${shippingAddress.ward.full_name}, ${shippingAddress.province.full_name}`}</div>
                                    {
                                        isMobile && (
                                            <div className="mt-[5px]">
                                                <button className="italic hover:bg-white flex gap-[10px] items-center bg-[#9BC3FF]" onClick={() => {
                                                    setSelectedId(shippingAddress?.id)
                                                    setToggleAddress(!toggleAddress)
                                                }}>
                                                    <NarrowIcon className="w-[20px] h-[16px] text-[18px] fill-current" />
                                                    chọn
                                                </button>
                                            </div>
                                        )
                                    }
                                    {shippingAddress.default && <div className="italic bg-neon w-fit mt-[5px]">mặc định</div>}
                                </div>
                            )

                        })
                    }
                </div>
                <div className="w-full flex justify-end mt-[10px]">
                    <button className="flex justify-center items-center gap-[5px] bg-white text-black xl:w-[108px] w-full h-[42px]">
                        <NarrowIcon type="button" className="w-[20px] h-[16px] text-[18px] fill-current" />
                        lưu
                    </button>

                </div>

            </div>
        </div>
    )
}

export default ShippingAddressPopUp;
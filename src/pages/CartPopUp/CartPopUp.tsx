import FormButton from "@/ui/FormButton";

const CartPopUp = () => {
    return (
        <div className="flex w-screen h-screen justify-end">
            <div className="flex w-[350px] h-screen bg-white px-[15px]">
                <div className="w-full mt-[50px]">
                    <div className="flex  justify-end border-b-[1px] border-[#A8A8A8] pb-[15px]">
                        <text>Gio hang - 3</text>
                    </div>
                    <div className="mt-[23px] h-[608px] border-b-[1px] border-[#A8A8A8] overflow-y-scroll no-scrollbar">
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8].map(i => {
                                return (
                                    <div className="flex flex-col gap-[12px] mt-[30px]">
                                        <text>Những người châu Âu</text>
                                        <div className="flex justify-between">
                                            <text>1 x 167000d</text>
                                            <div>Xoa</div>
                                        </div>
                                    </div>

                                )
                            })
                        }

                    </div>
                    <div className="flex justify-between mt-[20px]">
                        <text>Tam tinh</text>
                        <text>260000d</text>
                    </div>
                    <div className="h-[48px] mt-[20px]">
                        <FormButton label="xem don hang" />
                    </div>

                    <div className="h-[48px] mt-[20px]">
                        <FormButton label="thanh toan" />
                    </div>

                </div>
            </div>
        </div>
    );
}
export default CartPopUp;
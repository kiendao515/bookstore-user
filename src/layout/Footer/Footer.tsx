const Footer = (props: IFooterProps) => {
    const { } = props;
    return (
        <div className="grid grid-cols-3 justify-between mx-[100px] pb-[84px] pt-[10px] border-t-[1px] border-black">
            <div className="flex flex-col gap-[5px]">
                <div>Chính sách mua hàng</div>
                <div>Khiếu nại</div>
                <div>Thông báo</div>
                <div>Ký gửi sách</div>
            </div>
            <div className="flex flex-col gap-[5px]">
                <div>Đ/C: ngách 21 Ng. 238 Đ. Âu Cơ, Quảng An, Tây Hồ, Hà Nội, Việt Nam</div>
                <div>08:00 - 19:00</div>
                <div>Thứ Sáu, thứ Bảy, Chủ nhật</div>
            </div>
            <div className="flex justify-end ">
                <div>

                </div>
                <div className="flex flex-col gap-[5px]">
                    <div>+84 98 220 36 56</div>
                    <div>hieusachhop@gmail.com</div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
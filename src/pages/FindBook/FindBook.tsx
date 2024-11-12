import Button from "@/ui/Button";
import FormButton from "@/ui/FormButton";
import TextBox from "@/ui/TextBox";
import { useEffect } from "react";

const FindBook = () => {
    useEffect(() => {
        console.log("hmm")
    }, [])

    return (
        <div className="grid grid-cols-2 gap-[150px] w-[1460px] h-[700px] px-[80px] py-[40px] bg-white">
            <div>
                <TextBox label="Ho Ten" placeholder="nhap ten sach..." />
                <div className="flex gap-[10px]">
                    <TextBox label="SDT" placeholder="nhap so dien thoai..." />
                    <TextBox label="Email" placeholder="nhap email..." />
                </div>

                <div className="mt-[49px]">
                    <div className="flex">
                        <TextBox label="Ten sach" placeholder="Nhap ten sach" />
                        <TextBox label="Tac gia" placeholder="Nhap ten tac gia" />

                    </div>
                    <div className="flex">
                        <TextBox label="Ten sach" placeholder="Nhap ten sach" />
                        <TextBox label="Tac gia" placeholder="Nhap ten tac gia" />

                    </div>
                    <div className="mt-[150px]">
                        <Button label="+ them" />
                    </div>
                </div>
            </div>
            <div>
                <div className="text-[36px]">[ dịch vụ nhờ tìm sách ]</div>
                <div className="text-[20px] mt-[20px]">Sau một tổng kết cho thấy nhiều dấu hiệu tốt của CTXB 2022, chúng tôi vui mừng thông báo Chương trình xuất bản 2023 giai đoạn I (CTXB 2023-I). Tối đa 10q mỗi đơn</div>

                <div className="text-[36px] mt-[20px]">[ lưu ý ]</div>
                <div className="text-[20px] mt-[20px]">Hướng dẫn gửi thông tin nhờ tìm sách.</div>

                <div className="w-[265px] h-[42px] mt-[242px]">
                    <FormButton label="dat tim sach"/>
                </div>
            </div>

        </div>
    )
}

export default FindBook;

const Information = (props: IInformation) => {
    const { title } = props;
    return (
        <div className="flex flex-col gap-[36px]">
            <div>[{title}]</div>
            <div>
                <text>
                    tất cả các trang thông tin như khiếu nại, chính sách thu mua, ký gửi, cách thức đặt hàng, chính sách mua hàng, etc... đều có layout này - một nửa là text một nửa là minh hoạ/hoặc để chèn infographic) Sau một tổng kết cho thấy nhiều dấu hiệu tốt của CTXB 2022, chúng tôi vui mừng thông báo Chương trình xuất bản 2023 giai đoạn I (CTXB 2023-I), kéo dài trong sáu tháng đầu năm. Như các hé lộ rải rác, chương trình đã được khởi động từ nhiều tháng qua với các dự án cụ thể, mà một phần không nhỏ có sự đảm bảo của việc nắm được copyrights của nhiều tác giả quan trọng. Ở đây có một vài tác giả (Linda Lê, Thomas Bernhard…) đã từng xuất hiện ở Việt Nam, tuy vậy đấy sẽ không phải là những nối tiếp, mà là những Hiện diện khác. <br/>
                    Thể thức của chương trình cơ bản không có gì thay đổi. Đăng ký tham gia và nhận sách tại một trong các địa điểm phân phối sách của NXB Khác, nghĩa là bạn sẽ đặt mua tất cả các ấn phẩm của chương trình, không ngoại lệ. Lần lượt, bạn sẽ nhận được một vài ấn phẩm tặng không có trên thị trường (booklet, Quyển sách không bán). Thay đổi ở lần này đó là những bạn thanh toán trước khoản tiền dự trù của chương trình sẽ được nhận QSKB ở đợt sách đầu tiên, những bạn thanh toán theo đợt sẽ nhận ở đợt sách cuối. QSKB lần này, đó không phải là một cú bom văn chương như vừa rồi, nhưng là một tác phẩm làm phát lộ một khía cạnh khác của một trong những nhà văn Việt Nam quan trọng nhất thế kỷ 20, và sẽ do Thứ bảy nữa phụ trách.
                    Cũng như lần trước, trong quá trình thực hiện CTXB 2023-I có thể sẽ có nhiều ý định mới được thực hiện, chẳng hạn các ấn bản khác biệt với số lượng thực hiện hạn định (không phải bìa cứng). Những người đăng ký CTXB (các members) khi đó sẽ là những người đầu tiên được tiếp cận việc đặt mua.
                </text>
            </div>
        </div>
    )
};

export default Information;
import Button from "../../../../ui/Button";

const NotificationCard = (props: IFindBookFormProps) => {
    const { title } = props;
    return (
        <div>
            <div>
                <div className="pb-[14px] border-b-[1px] border-black" >
                    <text>[{title}]</text>
                </div>
                <div className="px-[30px] py-[20px] bg-[#9BC3FF]">
                    <div>Hop co ban co chinh sach thu mua sach cu va ky gui bla bla co an pham suu tam va co dich vu nho tim sach</div>
                    <div className="flex justify-end">
                        <Button label="doc them" />
                    </div>
                </div>



            </div>
        </div>
    )
};

export default NotificationCard;
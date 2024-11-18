import IBookLevelInfoPopUp from "./interface";

const BookLevelInfoPopUp = (props: IBookLevelInfoPopUp) => {
    const { content } = props;

    return (
        <div className="w-screen h-[100vh] xl:w-[860px] xl:h-[564px] pb-[50px] bg-layout flex flex-col items-center">
            <div className="w-full xl:w-[545px]  mt-[46px] xl:mt-[86px] flex flex-col px-[20px] xl:mb-[86px] pb-[40px]">
                <div className="text-[24px] leading-[24px] font-light text-[#888888]">[ chi tiết các tình trạng sách]</div>
                <div className="mt-[27px] mb-[20px] w-full"
                    style={{ whiteSpace: 'pre-wrap' }}
                >{content}</div>
            </div>
        </div>
    )

}

export default BookLevelInfoPopUp;
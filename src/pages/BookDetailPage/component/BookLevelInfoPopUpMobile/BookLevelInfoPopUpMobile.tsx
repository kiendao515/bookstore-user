import IBookLevelInfoPopUpMobile from "./interface";

const BookLevelInfoPopUpMobile = (props: IBookLevelInfoPopUpMobile) => {
    const { content } = props;

    return (
        <div className="fixed top-[53px] left-0 w-full h-[calc(100vh-53px)] bg-layout z-50 px-[18px]  pb-[12px]">
            <div className='w-full h-full overflow-y-scroll no-scrollbar pb-[100px]'>
                <div className="h-[45px] mobile-regular border-b-[1px] border-[#8C8C8C] border-solid flex items-center z-20 bg-layout">
                    <text className="mobile-regular text-grayword" >{`[ chi tiết tình trạng sách ]`}</text>
                </div>
                <div className="w-full pb-[100px] bg-layout flex flex-col items-center">
                    <div className="w-full flex flex-col xl:mb-[86px] pb-[40px]">
                        <div className="mt-[27px] mb-[20px] w-full"
                            style={{ whiteSpace: 'pre-wrap' }}
                        >{content}</div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default BookLevelInfoPopUpMobile;
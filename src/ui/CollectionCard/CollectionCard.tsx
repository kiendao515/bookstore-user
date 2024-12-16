import { useNavigate } from "react-router-dom";
const CollectionCard = (props: ICollectionCardProps) => {
    const { title, imageLink, link } = props;
    const navigate = useNavigate();

    return (
        <div className={`flex flex-col w-full relative lg:p-[20px] p-[10px] rounded-[5px] border border-[#D9D9D9] shadow-sm`}>
            <div
                onClick={() => navigate(link || "")}
                className={`group relative hover:cursor-pointer flex items-center w-full h-0 pb-[100%] overflow-hidden justify-center`}
            >
                <img
                    src={imageLink}
                    alt={title}
                    className="w-full h-full object-cover absolute top-0 left-0"
                />
            </div>
            <div className="flex justify-center lg:pt-[20px] pt-[10px]">
                <div className="mobile-regular lg:text-regular tracking-normal font-normal hover:cursor-pointer" onClick={() => navigate(link || "")}>{title}</div>
            </div>
        </div>
    );
};

export default CollectionCard;

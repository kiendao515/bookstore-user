const CollectionCard = (props: ICollectionCardProps) => {
    const { title, imageLink } = props;
    return (
        <div className="flex flex-col w-[368px] h-[473px]">
            <div className="flex items-center justify-center  w-full h-[368px] bg-bookcard">
                <img src={imageLink} className="w-[349px] h-[349px]" />
            </div>
            <div className="flex pt-[10px]">
                <div>{title}</div>
            </div>
        </div>
    )
};

export default CollectionCard;
import CollectionCard from "../CollectionCard";

const Collection = (props: ICollectionProps) => {
    const { title, collectionCards = [] } = props;
    return (
        <div>
            <div>
                <div className="pb-[14px] border-b-[1px] border-black" >
                    <text>[{title}]</text>
                </div>
                <div className="grid grid-cols-4 gap-[25px]">
                    {
                        collectionCards.map(collectionCard => {
                            return (
                                <CollectionCard imageLink={collectionCard.imageLink} title={collectionCard.title} />
                            )
                        })
                    }
                </div>


            </div>
        </div>
    )
};

export default Collection;
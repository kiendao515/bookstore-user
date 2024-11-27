import { useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import CollectionCard from "../CollectionCard";
import axios from "axios";
import { useCollections } from "@/api/collections/queries";
import { IReqParams } from "@/api/collections";

const Collection = (props: ICollectionProps) => {
    const { title } = props;
    const [collectionCards, setCollectionCards] = useState([]);
    const [bookParams, setBookParams] = useState<IReqParams>({
        page: 0,
        size: 4
    });
    const {collections}= useCollections({});

    return (
        <div className="p-8">
            <section className="flex items-center justify-between bg-gray-100 p-4 mt-[100px] mb-[64px]">
                <h2 className="text-lg font-semibold text-blue-600">{title}</h2>
                <a href="#more" className="flex items-center text-blue-600 hover:text-blue-800">
                    Xem thêm <RightOutlined className="ml-1" />
                </a>
            </section>
            <div className="grid grid-cols-4 gap-[25px]">
                {
                    collections?.data.map((collectionCard) => {
                        return (
                            <CollectionCard
                                key={collectionCard.id}
                                imageLink={collectionCard.image}
                                title={collectionCard.name}
                            />
                        );
                    })}
            
                    
            </div>
        </div>
    );
};

export default Collection;

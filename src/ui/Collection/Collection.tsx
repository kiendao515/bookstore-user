import { useMemo, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import CollectionCard from "../CollectionCard";
import { useCollections } from "@/api/collections/queries";
import { IReqParams } from "@/api/collections";
import { useNavigate } from "react-router-dom";

const Collection = (props: ICollectionProps) => {
    const { title } = props;
    const [params, setParams] = useState<IReqParams>({
        page: 0,
        size: 4
    });
    const navigate = useNavigate();
    const { collections } = useCollections({ ...params });
    const bookCollections = useMemo(() => {
        return collections?.data?.map(collection => ({
            link: `/collection?id=${collection?.id}`,
            name: collection?.name,
            image: collection?.image
        })) || [];
    }, [collections]);

    return (
        <div className="p-8">
            <section className="flex items-center justify-between bg-gray-100 p-4 mt-[100px] mb-[64px]">
                <h2 className="text-lg font-semibold text-blue-600">{title}</h2>
                <div onClick={() => navigate("/collection?page=0")} className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer">
                    Xem thêm <RightOutlined className="ml-1" />
                </div>
            </section>
            <div className="grid grid-cols-4 gap-[25px]">
                {
                    bookCollections?.map((collection) => {
                        return (
                            <CollectionCard
                                link={collection.link}
                                imageLink={collection.image}
                                title={collection.name}
                            />
                        );
                    })}


            </div>
        </div>
    );
};

export default Collection;

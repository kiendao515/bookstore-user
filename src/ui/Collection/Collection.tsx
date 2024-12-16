import { useMemo, useState } from "react";
import { ArrowRightOutlined, RightOutlined } from "@ant-design/icons";
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
        <div className="w-full">
            <section className="flex items-center justify-between bg-gray-100 py-[10px] px-[10px] lg:px-[20px] rounded-[5px]">
                <h2 className="lg:mobile-regular text-[15px] leading-[21px] font-semibold text-blue-600">{title}</h2>
                <div onClick={() => navigate("/collection?page=0")} className="flex text-[15px] leading-[21px] lg:mobile-regular items-center text-blue-600 hover:text-blue-800 cursor-pointer" >
                    Xem thêm <ArrowRightOutlined className="ml-1" />
                </div>
            </section>
            <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-y-[24px] gap-y-[10px] 2xl:gap-x-[24px] xl:gap-x-[10px] gap-[12px] mt-[20px] lg:mt-[40px]">
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

import MainLayout from "@/layout";
import { useState } from "react";
import FilterBar from "./component/FilterBar";
import BookCollection from "./component/BookCollection";

const CollectionPage = () => {
    const [collections, setCollections] = useState<ICollectionCardProps[]>([
        {
            "title": "Tu Luc Van Doan",
            "imageLink": "/public/assets/images/collection.png"
        },
        {
            "title": "Tu Luc Van Doan",
            "imageLink": "/public/assets/images/collection.png"
        },
        {
            "title": "Tu Luc Van Doan",
            "imageLink": "/public/assets/images/collection.png"
        },
        {
            "title": "Tu Luc Van Doan",
            "imageLink": "/public/assets/images/collection.png"
        }
    ])

    const [titles, setTitles] = useState<string[]>([
        "sach suu tam",
        "Tu luc van doan",
        "giai nobel",
        "giai Goncourt",
        "tranh hoa si Viet Nam",
        "sach truoc 75",
        "an ban dau tien"
    ]);


    return (
        <MainLayout>
            <div className="grid relative grid-cols-4 gap-5 col-span-1 pb-[144px] pt-[80px]">
                <div className="col-span-1 sticky top-[90px]">
                    <FilterBar titles={titles} />
                </div>
                <div className="col-span-3">
                    <div>
                        <BookCollection title="Showing 1–60 of 2812 results" />
                    </div>
                </div>

            </div>
        </MainLayout>
    )
}

export default CollectionPage;
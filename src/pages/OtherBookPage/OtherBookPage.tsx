import MainLayout from "@/layout";
import { useState } from "react";
import FilterBar from "./component/FilterBar";
import BookCollection from "./component/BookCollection";

const OtherBookPage = () => {
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


    return (
        <MainLayout>
            <div className=" pb-[144px] pt-[80px]">
                <div>
                    <BookCollection title="" />
                </div>
                <div>
                    <BookCollection title="[ combo ]" />
                </div>
            </div>
        </MainLayout>
    )
}

export default OtherBookPage;
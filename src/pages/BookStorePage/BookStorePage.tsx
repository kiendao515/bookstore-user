import MainLayout from "@/layout";
import CollectionCard from "@/ui/CollectionCard";
import Pagination from "@/ui/Pagination/Pagination";
import { useState } from "react";

const BookStorePage = () => {
    const [stores, setStores] = useState<ICollectionCardProps[]>([
        {
            "title": "Pandora Books",
            "imageLink": "/public/assets/images/bookstore.png"
        },
        {
            "title": "Pandora Books",
            "imageLink": "/public/assets/images/bookstore.png"
        },
        {
            "title": "Pandora Books",
            "imageLink": "/public/assets/images/bookstore.png"
        },
        {
            "title": "Pandora Books",
            "imageLink": "/public/assets/images/bookstore.png"
        }

    ])


    return (
        <MainLayout>
            <div className="pb-[144px] pt-[80px] gap-[40px]">
                <div className="grid grid-cols-4" >
                    {
                        stores.map(store => {
                            return (
                                <CollectionCard imageLink={store.imageLink} title={store.title} />
                            )
                        })
                    }
                </div>
                <div className="flex justify-end">
                    <Pagination />
                </div>
            </div>
        </MainLayout>
    )
}

export default BookStorePage;
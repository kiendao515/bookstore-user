import MainLayout from "@/layout";
import { useState } from "react";
import TextNotification from "./components/TextNotification";
import FindBookForm from "./components/FindBookForm";
import NotificationCard from "./components/NotificationCard";
import BookCollection from "./components/BookCollection";
import Collection from "@/ui/Collection";
import FilterCollection from "./components/FilterCollection";
import { RightOutlined } from "@ant-design/icons";
import WelcomeSection from "@/layout/Welcome/Welcome";

const HomePage = () => {
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
            <div className="flex flex-col gap-5 col-span-1 pb-5">
                <div className="">
                    <WelcomeSection />
                </div>
                {/* <div className="flex gap-[30px] w-full">
                    <div className="w-full">
                        <FindBookForm title="tim sach" />
                    </div>
                    <div className="w-full">
                        <NotificationCard title="thu mua/ ky gui"/>
                    </div>
                </div> */}
                <div className="py-3">
                    <BookCollection title="SÁCH MỚI VỀ" />
                </div>
                {/* <div className="py-3">
                    <BookCollection title="COLLECTION" />
                </div> */}
                <div className="py-3">
                    <Collection title="collections" collectionCards={collections} />
                </div>
                {/* <div>
                    <Collection title="sach ngoai Hop" collectionCards={stores} />
                </div> */}
                <div className="py-3">
                    <FilterCollection title="Thể loại" />
                </div>
            </div>
        </MainLayout>
    )
}

export default HomePage;
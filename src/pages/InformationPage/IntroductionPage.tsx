import MainLayout from "@/layout";
import { useState } from "react";
import Information from "./component/Information";
import Illustration from "./component/Illustration";

const IntroductionPage = () => {
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
            <div className="grid grid-cols-3 gap-[98px] mt-[40px] mb-[200px]">
                <div className="col-span-1">
                    <Information title={"ký gửi sách ở Hộp"}/>
                </div>
                <div className="col-span-2">
                    <Illustration/>
                </div>
            </div>
        </MainLayout>
    )
}

export default IntroductionPage;
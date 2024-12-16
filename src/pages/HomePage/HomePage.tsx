import MainLayout from "@/layout";
import BookCollection from "./components/BookCollection";
import Collection from "@/ui/Collection";
import WelcomeSection from "@/layout/Welcome/Welcome";
import CategoryFilter from "./components/CategoryFilter";
import { useEffect, useState } from "react";

const HomePage = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <MainLayout>
            <div className="flex flex-col col-span-1 pb-[100px]">
                <div className="">
                    <WelcomeSection />
                </div>
                <div className={`${isMobile ? "mt-[40px]" : "mt-[50px]"}`}>
                    <BookCollection title="Sách mới về" extendUrl="book?page=0" />
                </div>
                <div className={`${isMobile ? "mt-[40px]" : "mt-[50px]"}`}>
                    <Collection title="Bộ sưu tập" />
                </div>
                <div className={`${isMobile ? "mt-[40px]" : "mt-[50px]"}`}>
                    <CategoryFilter />
                </div>
            </div>
        </MainLayout>
    )
}

export default HomePage;
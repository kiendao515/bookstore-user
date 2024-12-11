import MainLayout from "@/layout";
import BookCollection from "./components/BookCollection";
import Collection from "@/ui/Collection";
import WelcomeSection from "@/layout/Welcome/Welcome";
import CategoryFilter from "./components/CategoryFilter";

const HomePage = () => {
    return (
        <MainLayout>
            <div className="flex flex-col gap-5 col-span-1 pb-5">
                <div className="">
                    <WelcomeSection />
                </div>
                <div className="py-3">
                    <BookCollection title="SÁCH MỚI VỀ" extendUrl="book?page=0" />
                </div>
                <div className="py-3">
                    <Collection title="Bộ sưu tập" />
                </div>
                <div className="py-3">
                    <CategoryFilter/>
                </div>
                {/* <div className="py-3">
                    <FilterCollection title="Thể loại" />
                </div> */}
            </div>
        </MainLayout>
    )
}

export default HomePage;
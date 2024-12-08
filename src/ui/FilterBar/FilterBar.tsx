import { IReqParams } from "@/api/books";
import { IFilterBarProps } from "./interface";

const FilterBar = (props: IFilterBarProps) => {
    const { filterValues = [], isPage = false, setBookParams, bookParams, searchField = "category_id" } = props;
    return (
        <div className={`flex flex-col gap-[2px] w-full ${isPage ? "sticky top-[110px]" : ""}`}>
            {
                filterValues.map(filterData => {
                    let isSelected = filterData.id === bookParams?.[`${searchField}`];
                    return (
                        <div className={`hover:cursor-pointer ${isSelected ? "bg-neon" : ""} w-fit hover:bg-[#9BC3FF]`} onClick={() => {
                            setBookParams((prev: IReqParams) => ({ page: 0, size: prev.size, [`${searchField}`]: filterData.id }))
                        }}>
                            <text className="hover:bg-[#9BC3FF] text-[18px]">{`${filterData?.label} (${filterData?.quantity || 0})`}</text>
                        </div>
                    )
                })
            }
        </div >
    )
}

export default FilterBar;
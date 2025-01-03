import { IReqParams } from "@/api/books";
import { IFilterBarProps } from "./interface";
import { List, Typography } from 'antd';

const { Text } = Typography;

const FilterBar = (props: IFilterBarProps) => {
    const { filterValues = [], setBookParams, bookParams, searchField = "category_id" } = props;

    return (
        <div className={`w-full border-r-[1px] border-gray-300`}>
            <List
                size="small"
                dataSource={filterValues}
                renderItem={(filterData) => {
                    const isSelected = filterData.id === bookParams?.[`${searchField}`];
                    return (
                        <List.Item
                            onClick={() => setBookParams((prev: IReqParams) => ({
                                page: 0,
                                size: prev.size,
                                [`${searchField}`]: filterData.id
                            }))}
                            style={{
                                backgroundColor: isSelected ? '#E6F7FF' : '#fff',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                border: "0px"
                            }}
                            className={`hover:bg-[#bae7ff] ${isSelected ? 'ant-list-item-selected' : ''}`}
                        >
                            <Text
                                strong={isSelected}
                                className="text-[16px]"
                                style={{ color: isSelected ? '#1890ff' : 'inherit' }}
                            >
                                {`${filterData?.label} (${filterData?.quantity || 0})`}
                            </Text>
                        </List.Item>
                    );
                }}
            />
        </div>
    );
}

export default FilterBar;

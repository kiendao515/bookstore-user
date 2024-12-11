import React from 'react';
import { IReqParams } from "@/api/books";
import { IFilterBarProps } from "./interface";
import { List, Typography, Card } from 'antd';

const { Text } = Typography;

const FilterBar = (props: IFilterBarProps) => {
    const { filterValues = [], isPage = false, setBookParams, bookParams, searchField = "category_id" } = props;

    return (
        <div className={`w-full`}>
            <List
                size="small"
                bordered
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

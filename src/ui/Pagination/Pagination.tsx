import { Pagination as AntPagination } from "antd";
import React, { useState } from "react";

interface IPaginationProps {
  total: number; 
  pageSize: number;
  current?: number; 
  onChange?: (page: number, pageSize: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({ total, pageSize, current = 1, onChange }) => {
  const [currentPage, setCurrentPage] = useState<number>(current);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    if (onChange) {
      onChange(page, pageSize);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <AntPagination
        total={500}
        pageSize={pageSize}
        current={currentPage}
        onChange={handlePageChange}
        showSizeChanger={false} // Ẩn thay đổi kích thước trang
        showQuickJumper 
      />
    </div>
  );
};

export default Pagination;

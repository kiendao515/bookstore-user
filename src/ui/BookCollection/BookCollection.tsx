import { Pagination, Typography, Button, Grid, Row, Col } from "antd";
import FilterBar from "../FilterBar";
import BookCard from "../BookCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { IBookCollectionProps } from "./interface";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const BookCollection = (props: IBookCollectionProps) => {
  const {
    extendUrl = "/",
    title,
    books = [],
    havePagination = true,
    filterValues = [],
    hasTitle = false,
    hasHeader = true,
    setBookParams,
    bookParams,
    currentPage = 0,
    firstIndex = 0,
    lastIndex = 0,
    totalElement = 0,
    totalPage = 0,
    isIndividualPage = false,
    searchField,
    isSearch = false,
    hasFilter = false,
    searchText = "",
  } = props;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(currentPage);
  }, [currentPage]);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "100%", marginTop: hasTitle ? 0 : "20px" }}>
        {/* Header Section */}
        {hasTitle && hasHeader && (
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              padding: "16px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          >
            <Title level={4} style={{ margin: 0, color: "#1890ff" }}>
              {title}
            </Title>
            <Button
              type="link"
              onClick={() => navigate(extendUrl)}
              icon={<RightOutlined />}
            >
              Xem thêm
            </Button>
          </section>
        )}

        {/* Content Section */}
        <Row gutter={[16, 16]}>
          {/* Filter Bar */}
          {hasFilter && (
            <Col xs={24} lg={6}>
              <FilterBar
                filterValues={filterValues}
                isPage
                setBookParams={setBookParams}
                bookParams={bookParams}
                searchField={searchField}
              />
            </Col>
          )}

          {/* Search Results */}
          {isSearch && !isMobile && (
            <Col xs={24} lg={6}>
              <div>
                <Text italic>
                  {books.length > 0
                    ? `Kết quả tìm kiếm cho: "${searchText}"`
                    : "Không có kết quả"}
                </Text>
              </div>
            </Col>
          )}

          {/* Book Cards */}
          <Col xs={24} lg={hasFilter || isSearch ? 18 : 24}>
            <Row
              gutter={[16, 16]}
              style={{ marginTop: isIndividualPage ? "30px" : 0 }}
            >
              {books.map((book) => (
                <Col xs={12} sm={8} lg={6} key={book.id}>
                  <BookCard
                    link={book.link}
                    author={book.authorName}
                    description={book.description}
                    image={book.image}
                    type={book.type}
                    name={book.name}
                    price={book.price}
                    quantity={book.quantity}
                    soldCount={book.soldCount}
                    id={book.id}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Pagination */}
        {havePagination && (
          <div style={{ marginTop: "48px", display: "flex", justifyContent: "flex-end" }}>
            <Pagination
              current={bookParams?.page + 1 || 1}
              total={totalElement}
              pageSize={bookParams?.size || 10}
              onChange={(page, pageSize) => {
                setSearchParams({
                  ...Object.fromEntries(searchParams),
                  page: (page - 1).toString(),
                });
                setBookParams((prev) => ({
                  ...prev,
                  page: page - 1,
                  size: pageSize,
                }));
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCollection;

import React, { useEffect, useState, useMemo } from "react";
import { Layout, Row, Col, Typography, Button, Select, InputNumber, Image, Tag, Divider, Tooltip, Modal } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/duck/cart/slice";
import { useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/store";
import { useBookDetail } from "@/api/books";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [count, setCount] = useState<number>(1);
  const [bookQuality, setBookQuality] = useState("NEW");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const { book } = useBookDetail(id!);
  const dispatch = useDispatch();

  const description = useMemo(() => {
    const bookRealities = book?.data?.book_inventories || [];
    const getPriceAndQuantity = (type: string) => {
      const filteredBooks = bookRealities.filter((reality) => reality.type === type);
      return {
        quantity: filteredBooks.length,
        price: filteredBooks[0]?.price || 0,
      };
    };

    return {
      id: book?.data?.id || "",
      name: book?.data?.name || "",
      author: book?.data?.author_name || "",
      publication_year: book?.data?.publish_year || 0,
      number_of_page: book?.data?.number_of_page || 0,
      categories: book?.data?.categories?.map((category) => category.name) || [],
      tags: book?.data?.tags || [],
      summary: book?.data?.description || "",
      book_type: {
        new: getPriceAndQuantity("NEW"),
        good: getPriceAndQuantity("GOOD"),
        medium: getPriceAndQuantity("MEDIUM"),
        old: getPriceAndQuantity("OLD"),
      },
      image: book?.data?.cover_image?.link || "",
    };
  }, [book]);

  // const handleAddToCart = () => {
  //   if (count <= 0) {
  //     return;
  //   }

  //   const price = description.book_type[bookQuality.toLowerCase() as keyof typeof description.book_type]?.price || 0;

  //   dispatch(
  //     addToCart({
  //       id: description.id,
  //       name: description.name,
  //       price,
  //       type: bookQuality,
  //       quantity: count,
  //       image: description.image,
  //     })
  //   );

  //   dispatch(setToggleByKey({ key: "toggleCart", value: true }));
  // };

  return (
    <Layout style={{ padding: "24px" }}>
      <Content>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={8}>
            <Image width={"100%"} src={description.image} alt={description.name} />
          </Col>
          <Col xs={24} md={12} lg={16}>
            <Title level={3}>{description.name}</Title>
            <Text type="secondary">{description.author}</Text>
            <Divider />
            <Text>
              Năm xuất bản: <b>{description.publication_year}</b>
            </Text>
            <br />
            <Text>
              Số trang: <b>{description.number_of_page}</b>
            </Text>
            <Divider />
            <Title level={4}>Phân loại</Title>
            <Select
              value={bookQuality}
              onChange={(value) => setBookQuality(value)}
              style={{ width: "100%" }}
            >
              <Option value="NEW">Mới</Option>
              <Option value="GOOD">Đẹp</Option>
              <Option value="MEDIUM">Khá</Option>
              <Option value="OLD">Tạm</Option>
            </Select>
            <Divider />
            <Title level={4}>Số lượng</Title>
            <InputNumber
              min={1}
              max={10}
              value={count}
              onChange={(value) => setCount(value || 1)}
              style={{ width: "100%" }}
            />
            <Divider />
            <Button type="primary"  block>
              Thêm vào giỏ hàng
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
          <Col span={24}>
            <Title level={4}>Mô tả sản phẩm</Title>
            <Text>{description.summary}</Text>
          </Col>
          <Col span={24}>
            <Title level={4}>Tags</Title>
            <div>
              {description.tags.map((tag, index) => (
                <Tag key={index} color="blue">
                  {tag}
                </Tag>
              ))}
            </div>
          </Col>
        </Row>
        <Modal
          title="Đọc thử"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={800}
        >
          <iframe src={description.categories} width="100%" height="600px" title="Đọc thử" />
        </Modal>
      </Content>
    </Layout>
  );
};

export default BookDetailPage;

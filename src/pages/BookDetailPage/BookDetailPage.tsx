import React, { useState } from "react";
import { Breadcrumb, Button, Divider, Image, InputNumber, Radio, Space, Tag, Typography, Row, Col } from "antd";
import { HeartOutlined, ShareAltOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import MainLayout from "@/layout";
import { useBookDetail } from "@/api/books";
import { useParams } from "react-router-dom";
import { addToCart } from "@/api/order";
import { message } from "antd";
const { Title, Text } = Typography;

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  const [selectedType, setSelectedType] = useState<string | null>(null); 
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const { book } = useBookDetail(id!);

  const prices = book?.data.book_inventories.map((inventory) => inventory.price) || [];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [quantity, setQuantity] = useState<number>(1);


  const handleTypeChange = (type: string) => {
    setSelectedType(type);

    // Cập nhật giá ứng với trạng thái
    const selectedInventory = book?.data.book_inventories.find(
      (inventory) => inventory.type === type
    );
    setSelectedPrice(selectedInventory?.price || null);
  };

  const handleAddToCart = async () => {
    if (!selectedType) {
      message.warning("Vui lòng chọn phân loại trước khi thêm vào giỏ hàng.")
      return;
    }

    const selectedInventory = book?.data.book_inventories.find(
      (inventory) => inventory.type === selectedType
    );

    if (!selectedInventory) {
      message.error("Không tìm thấy thông tin phân loại sách.");
      return;
    }

    try {
      let rs = await addToCart({book_inventory_id: selectedInventory.id, quantity:quantity});
      if(rs.result){
        message.success("Đã thêm vào giỏ hàng!");
      }else{
        message.error(rs.reason)
      }

    } catch (error) {
      message.error("Thêm vào giỏ hàng thất bại. Vui lòng thử lại.");
    }
  };
  return (
    <MainLayout>
      <div className="mx-auto p-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbItem>
          <a href="/">Trang chủ</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a href="#">Sách mới về</a>
        </BreadcrumbItem>
        <BreadcrumbItem>{book?.data.name}</BreadcrumbItem>
      </Breadcrumb>

      <Row gutter={32}>
        {/* Cột Trái: Hình ảnh */}
        <Col span={8}>
          <Image
            width="100%"
            src={book?.data.cover_image}
            alt={book?.data.name}
            className="rounded-md"
          />
          <Space className="mt-4" size={12}>
            {book?.data.content_image.map((_, index) => (
              <Image
                key={index}
                width={64}
                height={64}
                src={book?.data.content_image[index]}
                alt={`Thumbnail ${index + 1}`}
                className="cursor-pointer"
                preview={true}
                style={{
                  border: index === 0 ? "2px solid #1890ff" : "1px solid #ddd",
                  borderRadius: 4,
                }}
              />
            ))}
          </Space>
        </Col>
        <Col span={1}></Col>
        <Col span={13}>
          {/* Tiêu đề */}
          <div className="flex justify-between items-center">
            <Title level={3}>{book?.data.name}</Title>
            <div className="flex items-center space-x-4">
              <HeartOutlined className="text-lg cursor-pointer text-gray-500" />
              <ShareAltOutlined className="text-lg cursor-pointer text-gray-500" />
            </div>
          </div>
          <div className="flex justify-between items-center"><Title level={5}>{book?.data.author_name}</Title></div>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Text>{book?.data.sold_quantity} đã bán</Text>
            <Divider type="vertical" />
            <Text>15 lượt thích</Text>
          </div>

          {/* Giá */}
          <Title level={4} className="text-blue-600 mb-4">
              {selectedPrice
                ? `đ ${selectedPrice.toLocaleString()}`
                : `đ ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}`}
          </Title>

          {/* Phân loại */}
          <div className="mb-4">
            <Text strong>Phân loại:</Text>
            <Radio.Group
                className="ml-4"
                onChange={(e) => handleTypeChange(e.target.value)}
              >
                {book?.data.book_inventories.map((inventory) => (
                  <Radio.Button key={inventory.type} value={inventory.type}>
                    {inventory.type === "NEW"
                      ? "Mới"
                      : inventory.type === "GOOD"
                      ? "Đẹp"
                      : "Cũ"}
                  </Radio.Button>
                ))}
              </Radio.Group>
          </div>

          {/* Số lượng */}
          <div className="mb-6">
            <Text strong>Số lượng:</Text>
            <InputNumber min={1}
                defaultValue={1}
                value={quantity}
                onChange={(value) => setQuantity(value || 1)} className="ml-4" />
          </div>

          {/* Nút hành động */}
          <Space size="large">
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              className="bg-blue-600"
              onClick={handleAddToCart} // Gọi hàm thêm vào giỏ hàng
            >
              Thêm vào giỏ hàng
            </Button>
            <Button size="large">Mua ngay</Button>
          </Space>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={24}>
          <div>
            <span
              style={{
                backgroundColor: "#BAE7FF",
                color: "#000",
                fontWeight: "bold",
                padding: "8px 8px",
                borderRadius: "4px",
                display: "inline-block",
                fontSize: 16
              }}
            >
              THÔNG TIN CHUNG
            </span>
            <div className="mt-4">
              <Row className="mb-2">
                <Col span={6}>
                  <Text className="text-gray-500">Tên sách:</Text>
                </Col>
                <Col span={18}>
                  <Text>{book?.data.name}</Text>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col span={6}>
                  <Text className="text-gray-500">Tác giả:</Text>
                </Col>
                <Col span={18}>
                  <Text>{book?.data.author_name}</Text>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col span={6}>
                  <Text className="text-gray-500">Thể loại:</Text>
                </Col>
                <Col span={18}>
                  <Text>
                    {book?.data.category.name}
                  </Text>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col span={6}>
                  <Text className="text-gray-500">Số trang:</Text>
                </Col>
                <Col span={18}>
                  <Text>{book?.data.number_of_page}</Text>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col span={6}>
                  <Text className="text-gray-500">Năm xuất bản:</Text>
                </Col>
                <Col span={18}>
                  <Text>{book?.data.publish_year}</Text>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col span={6}>
                  <Text className="text-gray-500">Tag:</Text>
                </Col>
                <Col span={18}>
                  <Tag className="bg-[#91D5FF] cursor-pointer">Sách sưu tầm</Tag>
                  <Tag className="bg-[#91D5FF] cursor-pointer">Nguyễn An dịch</Tag>
                  <Tag className="bg-[#91D5FF] cursor-pointer">Giải Nobel</Tag>
                  <Tag className="bg-[#91D5FF] cursor-pointer">Tố Hữu đề bạt</Tag>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      {/* Mô tả sản phẩm */}
      <Divider />
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={16}>
          <div>
            <span
              style={{
                backgroundColor: "#BAE7FF",
                color: "#000",
                fontWeight: "bold",
                padding: "8px 8px",
                borderRadius: "4px",
                display: "inline-block",
                fontSize: 16,
              }}
            >
              MÔ TẢ SẢN PHẨM
            </span>
            <div className="mt-4">
              <p
                className={`text-justify ${!isExpanded ? "line-clamp-2" : ""
                  } transition-all duration-300`}
              >
                Nội dung chi tiết về Chữ Nghĩa Truyện Kiều là công trình nghiên cứu nghiêm túc về văn bản học, bao gồm các thao tác sưu tầm, tập hợp, đối chiếu tư liệu, khảo chứng và chú giải các từ ngữ, điển tích; khảo sát ngữ nghĩa của từng từ, từng cụm từ và đặt trong phong cách Nguyễn Du - văn cảnh Truyện Kiều sao cho khoa học, chính xác nhất. Nội dung chi tiết về Chữ Nghĩa Truyện Kiều là công trình nghiên cứu nghiêm túc về văn bản học, bao gồm các thao tác sưu tầm, tập hợp, đối chiếu tư liệu, khảo chứng và chú giải các từ ngữ, điển tích. Đây là nghiên cứu trọng tâm dành cho người yêu thích văn học cổ điển.
              </p>

              <div className="text-center mt-2">
                <Button
                  type="link"
                  onClick={handleExpand}
                  className="text-blue-600 font-medium"
                >
                  {isExpanded ? "Thu gọn" : "Xem thêm"}
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    </MainLayout>
  );
};

export default BookDetail;

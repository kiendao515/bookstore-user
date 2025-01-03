import React, { useEffect, useMemo, useState } from "react";
import { Breadcrumb, Button, Divider, Image, InputNumber, Radio, Space, Tag, Typography, Row, Col, Spin, message } from "antd";
import { HeartOutlined, HeartTwoTone, ShareAltOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import MainLayout from "@/layout";
import { updateBookFavorite, useBookDetail } from "@/api/books";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "@/api/order";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setToggleByKey } from "@/store/duck/togglePopUp/slice";
import { RootState } from "@/store";
import BookRelative from "./component/BookRelative/BookRelative";
import TemporaryOut from "@/ui/TemporaryOut/TemporaryOut";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import { setBookFavorite } from "@/store/duck/bookFavorite/slice";
import { useAuthToggle } from "@/context/AuthToggleContext";
const { Title, Text } = Typography;

interface CartItem {
  id: string;
  name: string;
  type: string;
  quantity: number;
  price: number;
  image: string;
  book_inventory_id: string;
}

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [redHeart, setRedHeart] = useState(false);
  const { bookIds = [] } = useSelector((state: RootState) => state.bookFavorite);
  const dispatch = useAppDispatch();
  const { toggleAuthPopup } = useAuthToggle();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const { book } = useBookDetail(id!);

  const prices = book?.data.book_inventories.map((inventory) => inventory.price) || [];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [quantity, setQuantity] = useState<number>(1);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { toggleAuth } = useAppSelector((state: RootState) => state.togglePopUp);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // State giỏ hàng
  const [loading, setLoading] = useState(true);
  const [addToCartLoading, setAddToCartLoading] = useState(false);


  useEffect(() => {
    if (id && bookIds.includes(id)) {
      setRedHeart(true);
    } else {
      setRedHeart(false);
    }

  }, [bookIds])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { mutate } = useMutation(updateBookFavorite, {
    onSuccess: async (data) => {
      if (data.result) {
        let newBookIds = [...bookIds]
        if (id && bookIds.includes(id)) {
          newBookIds = newBookIds.filter((bookId) => bookId !== id);
        } else {
          if (id) {
            newBookIds.push(id);
          }
        }
        dispatch(setBookFavorite({
          accountId: user.id,
          bookIds: newBookIds
        }));
      } else {
        console.error('Failed to update favorite books:', data.reason);
      }
    },
    onError: (error) => {
      console.error('Error updating favorite books:', error);
    }
  });

  const handleFavoriteButtonClick = () => {
    if (user.id === "") {
      toggleAuthPopup();
      dispatch(setToggleByKey({
        key: "toggleAuth",
        value: !toggleAuth
      }))
    } else {
      if (id) {
        mutate(id);
      }
    }
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);

    // Cập nhật giá ứng với trạng thái
    const selectedInventory = book?.data.book_inventories.find(
      (inventory) => inventory.type === type
    );
    setSelectedPrice(selectedInventory?.price || null);
  };

  const handleAddToCart = async () => {
    setAddToCartLoading(true);
    if (!selectedType) {
      message.warning("Vui lòng chọn phân loại trước khi thêm vào giỏ hàng.");
      setAddToCartLoading(false);
      return;
    }

    const selectedInventory = book?.data.book_inventories.find(
      (inventory) => inventory.type === selectedType
    );

    if (!selectedInventory) {
      message.error("Không tìm thấy thông tin phân loại sách.");
      setAddToCartLoading(false);
      return;
    }

    if (user.id == '' && user.email == '') {
      dispatch(setToggleByKey({ key: "toggleAuth", value: !toggleAuth }));
    } else {
      try {
        let rs = await addToCart({ book_inventory_id: selectedInventory.id, quantity: quantity, delete: false });
        if (rs.result) {
          message.success("Đã thêm vào giỏ hàng!");
        } else {
          message.error(rs.reason);
        }
      } catch (error) {
        message.error("Thêm vào giỏ hàng thất bại. Vui lòng thử lại.");
      }
    }
    setAddToCartLoading(false);
  };

  const handleBuyNow = async () => {
    if (!selectedType) {
      message.warning("Vui lòng chọn phân loại trước khi thêm vào giỏ hàng.");
      return;
    }

    const selectedInventory = book?.data.book_inventories.find(
      (inventory) => inventory.type === selectedType
    );

    if (!selectedInventory) {
      message.error("Không tìm thấy thông tin phân loại sách.");
      return;
    }

    if (user.id == '' && user.email == '') {
      dispatch(setToggleByKey({ key: "toggleAuth", value: !toggleAuth }));
    } else {
      const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      console.log(cartItems, totalPrice);
      navigate("/checkout", { state: { cartItems, totalPrice } });
    }
  };
  // Nhóm các bản ghi theo relatedBookId
  const groupInventories = (inventories: any) => {
    const grouped: any = {};
    inventories.forEach((inventory: any) => {
      const relatedBookId = inventory.relatedBookId || inventory.id;

      if (!grouped[relatedBookId]) {
        grouped[relatedBookId] = {
          relatedBookId,
          type: inventory.type,
          quantity: 0,
          price: inventory.price,
        };
      }

      // Cộng dồn số lượng và nhóm các bản ghi theo relatedBookId
      grouped[relatedBookId].quantity += inventory.quantity;
    });
    return Object.values(grouped);
  };

  const availableBookCount = useMemo(() => {
    return book?.data.book_inventories.reduce((acc, inventory) => acc + inventory.quantity, 0) || 0;
  }, [book])
  console.log("available", availableBookCount)

  useEffect(() => {
    if (book?.data) {
      setLoading(false);

      // Nhóm các bản ghi theo relatedBookId và tính tổng số lượng
      const groupedInventories = groupInventories(book.data.book_inventories);

      const mappedItems = groupedInventories
        .filter((group: any) => group.quantity > 0)
        .map((group: any) => ({
          id: book.data.id,
          name: book.data.name,
          type: group.type,
          quantity: group.quantity,
          price: group.price || 0,
          image: book.data.cover_image,
          book_inventory_id: group.relatedBookId
        }));

      setCartItems(mappedItems);
    }
  }, [book]); // Lắng nghe thay đổi của book

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto pt-[10px]">
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
              {book?.data.content_image?.map((_, index) => (
                <div>
                  {
                    availableBookCount == 0 &&
                    <div className="mr-[20px]">
                      <div className="absolute right-[10px] top-0 z-10 p-[10px]">
                        <TemporaryOut isMobile={isMobile} />
                      </div>
                    </div>
                  }
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

                </div>
              ))}
            </Space>
          </Col>
          {
            !isMobile && (
              <Col span={1}></Col>
            )
          }
          <Col span={15}>
            {/* Tiêu đề */}
            <div className="flex justify-between items-center">
              <Title level={3}>{book?.data.name}</Title>
              <div className="flex items-center space-x-4">
                <HeartTwoTone
                  className="hover:cursor-pointer hover:text-red-600 text-lg text-gray-500"
                  twoToneColor={redHeart ? "#ff0000" : "#d9d9d9"}
                  onClick={handleFavoriteButtonClick}
                  onMouseEnter={() => setRedHeart(true)}
                  onMouseLeave={() => {
                    if (!id || !bookIds.includes(id)) {
                      setRedHeart(false);
                    }
                  }}
                />
                <ShareAltOutlined className="text-lg cursor-pointer text-gray-500" />
              </div>
            </div>
            <div className="flex justify-between items-center"><Title level={5}>{book?.data.author_name}</Title></div>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Text>{book?.data.sold_quantity} đã bán</Text>
              <Divider type="vertical" />
              <Text>{book?.data.loved_quantity} thích</Text>
            </div>
            {/* Giá */}
            <Title level={4} className="text-blue-600 mb-4">
              {selectedPrice
                ? `đ ${selectedPrice.toLocaleString()}`
                : minPrice === maxPrice
                  ? `đ ${minPrice.toLocaleString()}`
                  : `đ ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}`}

            </Title>
            {availableBookCount <= 0 && (
              <Typography.Text type="danger" style={{ marginTop: '5px', fontSize: '20px', display: 'block' }}>
                Tình trạng : Sách tạm thời hết hàng
              </Typography.Text>
            )}
            {/* Phân loại */}
            {
              availableBookCount > 0 && (
                <>
                  <div className="mb-4">
                    <Text strong>Phân loại:</Text>
                    <Radio.Group
                      className="ml-4"
                      onChange={(e) => handleTypeChange(e.target.value)}
                    >
                      {cartItems.map((inventory) => (
                        <Radio.Button key={inventory.book_inventory_id} value={inventory.type}>
                          {inventory.type === "NEW"
                            ? `Mới (${inventory.quantity})`
                            : inventory.type === "GOOD"
                              ? `Đẹp (${inventory.quantity})`
                              : `Cũ (${inventory.quantity})`}
                        </Radio.Button>
                      ))}
                    </Radio.Group>
                  </div>

                  {/* Số lượng */}
                  <div className="mb-6">
                    <Text strong>Số lượng:</Text>
                    <InputNumber min={1} defaultValue={1} value={quantity} onChange={(value) => setQuantity(value || 1)} className="ml-4" />
                  </div>

                  {/* Nút hành động */}
                  <div className="flex lg:flex-row flex-col gap-[20px] w-full">
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      size="large"
                      loading={addToCartLoading}
                      className="bg-blue-600 flex justify-center"
                      onClick={handleAddToCart}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                    <Button size="large" onClick={handleBuyNow}>Mua ngay</Button>
                  </div>
                </>
              )
            }
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
                    {
                      book?.data?.tags?.map((t, index) => (
                        <Tag key={index} className="bg-[#91D5FF] cursor-pointer">
                          {t}  {/* Hiển thị giá trị của từng tag */}
                        </Tag>
                      ))
                    }
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
                <p className={`text-justify transition-all duration-300`} dangerouslySetInnerHTML={{ __html: book?.data.description }} />
              </div>
            </div>
          </Col>
        </Row>
        <div className="xl:mt-[90px] mt-[30px]">
          <BookRelative categoryId={book?.data?.category?.id || ""} currentBookId={book?.data?.id || ""} />
        </div>
      </div>
    </MainLayout>
  );
};

export default BookDetail;

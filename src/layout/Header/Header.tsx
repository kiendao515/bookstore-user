import Button from "@/ui/Button";
import { HeartOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Header = (props: IHeaderProps) => {
    const { toggleFindBook, setToggleFindBook, toggleCart, setToggleCart } = props;
    const [count, setCount] = useState<number>(3);
    useEffect(() => {
        setCount(JSON.parse(localStorage.getItem('cart') || '[]').length)
    }, [])
    const navigate = useNavigate();
    return (
        <header className="flex items-center justify-between p-4 bg-white">
            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    <div className="w-16 h-16 flex items-center justify-center">
                        <img src="assets/icons/box_logo.svg" alt="Logo" className="w-12 h-12" />
                    </div>
                </div>
                <nav className="flex space-x-4">
                    <a href="/intro" className="text-blue-600 font-semibold">Giới thiệu</a>
                    <a href="/category" className="text-gray-600">Thể loại</a>
                    <a href="/collections" className="text-gray-600">Bộ sưu tập</a>
                    <a href="/box" className="text-gray-600">Tủ sách</a>
                    <a href="/blog" className="text-gray-600">Blog</a>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex space-x-4 text-blue-600">
                    <HeartOutlined />
                    <ShoppingCartOutlined />
                    <UserOutlined/>
                </div>
            </div>
        </header>
    )
}

export default Header;
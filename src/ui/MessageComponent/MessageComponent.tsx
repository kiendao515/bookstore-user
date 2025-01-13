import { sendChatMessage } from "@/api/account";
import React, { useEffect, useState } from "react";

interface Book{
  id: string;
  name: string;
  description: string;
}
interface MessageComponentProps {
  userMessage: string; 
}

const MessageComponent: React.FC<MessageComponentProps> = ({ userMessage }) => {
  const [bookSuggestions, setBookSuggestions] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookSuggestions = async () => {
      setLoading(true);
      setError(null);
      try {
       const response = await sendChatMessage(userMessage);
       if (response.status && response.books && response.books.length > 0) {
        setBookSuggestions(response.books);
        console.log(response.books);
      } else {
        return "Xin lỗi, không tìm thấy sách phù hợp với mô tả của bạn.";
      }
      } catch (err: any) {
        console.error("Error fetching book suggestions:", err);
        setError("Không thể lấy thông tin sách. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookSuggestions();
  }, [userMessage]);

  if (loading) {
    return <span>Đang tìm kiếm sách phù hợp...</span>;
  }

  if (error) {
    return <span>{error}</span>;
  }

  if (bookSuggestions.length === 0) {
    return <span>Không tìm thấy sách phù hợp với mô tả của bạn.</span>;
  }

  return (
    <div>
      <span>Sách bạn tìm kiếm có thể là một trong những quyển sau:</span>
      <ul>
        {bookSuggestions?.map((book,index) => (
          <li key={book._id}>
            <a
              href={`https://hopsach.sytes.net/book-detail/${book._id}`}
              target="_blank"
              rel="noreferrer"
            >
              {index+1}: {book.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageComponent;

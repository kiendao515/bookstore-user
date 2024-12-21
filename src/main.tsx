import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { CustomerServiceOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRegister } from "chatbot-antd";
import { persistor, store } from "./store";
import { AuthToggleProvider } from "./context/AuthToggleContext";
import { router } from "./routes";
import "./index.css";
import { sendChatMessage } from "./api/account";

const queryClientOption = {
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: 1000 * 5 },
  },
};
const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleApiCall = async (userMessage: string) => {
    try {
      const response = await sendChatMessage(userMessage);
      if (response.status && response.books && response.books.length > 0) {
        const bookSuggestions = response.books.map((book: any) => {
          const bookLink = `http://localhost:5173/book-detail/${book._id}`;
          return `• <a href="${bookLink}" target="_blank" rel="noopener noreferrer">${book._id}</a>`;
        });

        return `Sách bạn tìm kiếm có thể là một trong những quyển sau:<br/><br/>${bookSuggestions.join(
          "<br/>"
        )}`;
      } else {
        return "Xin lỗi, không tìm thấy sách phù hợp với mô tả của bạn.";
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      return "Xin lỗi, tôi không thể trả lời câu hỏi của bạn vào lúc này.";
    }
  };

  const callb = useCallback(
    async (v: any) => {
      if (isProcessing) return; 
      setIsProcessing(true);

      try {
        const userMessage = v.text;
        setList((prev) => [...prev, { isUser: true, text: userMessage }]);
        const botReply = await handleApiCall(userMessage);
        setList((prev) => [...prev, { isUser: false, text: botReply }]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsProcessing(false); // Reset sau khi xử lý xong
      }
    },
    [isProcessing]
  );

  const [render, setList] = useRegister(
    modalOpen,
    callb,
    {
      onOk: () => setModalOpen(false),
      onCancel: () => setModalOpen(false),
      title: "Hỏi đáp với Hộp",
    },
    {},
    <div>Xin chào, tôi có thể giúp bạn tìm sách gì?</div>
  );

  const queryClient = new QueryClient(queryClientOption);

  return (
    <Provider store={store}>
      <AuthToggleProvider>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <div >
              {/* Chatbot button */}
              <div
                style={{
                  position: "fixed",
                  right: "10px",
                  top: "40%",
                }}
              >
                <Button type="primary" onClick={() => setModalOpen(!modalOpen)}>
                  <CustomerServiceOutlined />
                </Button>
              </div>
              {/* Render chatbot */}
              {render}
            </div>
            {/* Toast notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                error: {
                  duration: 2000,
                  style: {
                    fontSize: "14px",
                  },
                },
              }}
            />
            {/* Router */}
            <RouterProvider router={router} />
          </QueryClientProvider>
        </PersistGate>
      </AuthToggleProvider>
    </Provider>
  );
};

// Render application
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

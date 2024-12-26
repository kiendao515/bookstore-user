import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { CustomerServiceOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { generateRespones, library, RenderList, useRegister } from "chatbot-antd";
import { persistor, store } from "./store";
import { AuthToggleProvider } from "./context/AuthToggleContext";
import { router } from "./routes";
import "./index.css";
import MessageComponent from "./ui/MessageComponent/MessageComponent";
const queryClientOption = {
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: 1000 * 5 },
  },
};
const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  library.push({
    text: (inputText: string) =>
      React.createElement(MessageComponent, { userMessage: inputText }),
    useReg: /.*/, 
  });
  const callb = useCallback((v: RenderList) => {
		setTimeout(() => {
			let returnValue = generateRespones(v);
			if (returnValue) {
				setList((prev) => [
					...prev,
					{ isUser: false, text: returnValue(v.text) },
				]);
			}
		}, 500);

	}, []);

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <App /> 
);


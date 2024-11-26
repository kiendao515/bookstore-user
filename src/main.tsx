import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { router } from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { AuthToggleProvider } from './context/AuthToggleContext';
import { PersistGate } from 'redux-persist/integration/react';
const queryClientOption = {
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: 1000 * 5 },
  },
};
const queryClient = new QueryClient(queryClientOption);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthToggleProvider>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Toaster
              position="top-right"
              toastOptions={{
                error: {
                  duration: 2000,
                  style: {
                    fontSize: '14px',
                  },
                },
              }}
            />
            <RouterProvider router={router} />
          </QueryClientProvider>
        </PersistGate>
      </AuthToggleProvider>
    </Provider>
  </React.StrictMode>,
)

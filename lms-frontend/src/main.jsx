import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';
import { AuthProvider } from "./context/AuthContext";


window.addEventListener('error', (event) => {
  console.log('Global error caught:', event.error);
  event.preventDefault(); // Prevent default handling
  event.stopPropagation();
});

window.addEventListener('unhandledrejection', (event) => {
  console.log('Global unhandled rejection caught:', event.reason);
  event.preventDefault(); // Prevent default handling
  event.stopPropagation();
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      throwOnError: false,
      onError: (error) => {
        console.log('Global mutation error:', error);
      }
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 5000,
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
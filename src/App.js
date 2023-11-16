import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import React from "react";
import Slider from "react-slick";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Header/>
      <QueryClientProvider client={queryClient}>
          <Outlet />
      </QueryClientProvider>
      <Footer/>
    </>
  );
}

export default App;

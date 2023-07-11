import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Layout } from './components/Layout';
import { MainPage } from './pages/MainPage';
import { UsersPage } from './pages/UsersPage';
import { RegisterPage } from './pages/RegisterPage';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Layout>
  );
}

export default App;

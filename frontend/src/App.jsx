import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import ProductFormPage from './pages/ProductFormPage/ProductFormPage.jsx';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/produtos/novo" element={<ProductFormPage key="novo" />} />
        <Route path="/produtos/:id/editar" element={<ProductFormPage key="editar" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

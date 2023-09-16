import { Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import BannerPage from '@/pages/BannerPage';
import NotFoundPage from '@/pages/NotFoundPage';

const App = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path={'/banner/:id'} element={<BannerPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;

import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Loader } from 'src/components/UI/Loader';

const HomePage = lazy(() => import('@/pages/HomePage'));
const BannerPage = lazy(() => import('@/pages/BannerPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const App = () => {
  return (
    <Suspense fallback={<Loader visible={true} />}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={'/banner/:id'} element={<BannerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import AuthLayout from '@/layout/AuthLayout';
import LoginForm from '@/components/AuthForm/LoginForm';
import RegisterForm from '@/components/AuthForm/RegisterForm';
import TestsPage from '@/pages/TestsPage';
import { ROUTES } from '@/constants/routes';
import FaqPage from '@/pages/FaqPage';
import CollectionsPage from '@/pages/CollectionsPage';
import TestInfoPage from '@/pages/TestInfoPage';
import TestSessionPage from '@/pages/TestSessionPage';
import CollectionInfoPage from '@/pages/CollectionInfoPage';
import CreatePage from '@/pages/CreatePage';
import SessionDetailsPage from '@/pages/SessionDetailsPage';
import CourseboardsPage from '@/pages/CourseboardsPage';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.DEFAULT} element={<AuthLayout />}>
        <Route index element={<LoginForm />} />
        <Route path={ROUTES.REGISTER} element={<RegisterForm />} />
      </Route>
      <Route path={`${ROUTES.DEFAULT}/:testId`} element={<TestSessionPage />} />
      <Route path={ROUTES.DEFAULT} element={<MainLayout />}>
        <Route path={ROUTES.TESTS} element={<TestsPage />} />
        <Route path={ROUTES.COLLECTIONS} element={<CollectionsPage />} />
        <Route path={ROUTES.COURSEBOARDS} element={<CourseboardsPage />} />
      </Route>
      <Route path={`${ROUTES.TESTS}/:testId`} element={<TestInfoPage />} />
      <Route
        path={`${ROUTES.COLLECTIONS}/:collectionId`}
        element={<CollectionInfoPage />}
      />
      <Route
        path={`${ROUTES.CREATE_TEST}/:cloneId?`}
        element={<CreatePage />}
      />
      <Route
        path={`${ROUTES.CREATE_COLLECTION}/:cloneId?`}
        element={<CreatePage />}
      />
      <Route path={ROUTES.FAQ} element={<FaqPage />} />
      <Route
        path={`${ROUTES.SESSION_DETAILS}/:testId`}
        element={<SessionDetailsPage />}
      />
    </Routes>
  );
}

export default App;

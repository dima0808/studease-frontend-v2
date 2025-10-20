import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import AuthLayout from '@/layout/AuthLayout';
import LoginForm from '@/components/AuthForm/LoginForm';
import RegisterForm from '@/components/AuthForm/RegisterForm';
import TestsPage from '@/pages/TestsPage';
import { ROUTES } from '@/constants/routes';
import FaqPage from '@/pages/FaqPage';
import CollectionsPage from '@/pages/CollectionsPage';
import CreateTestForm from '@/components/CreateTestForm';
import CreateCollectionForm from '@/components/CreateCollectionForm/CreateCollectionForm';
import TestInfoPage from '@/pages/TestInfoPage';
import TestSessionPage from '@/pages/TestSessionPage';

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
        <Route
          path={ROUTES.COURSEBOARDS}
          element={<h1>Courseboards page</h1>}
        />
      </Route>
      <Route path={`${ROUTES.TESTS}/:testId`} element={<TestInfoPage />} />
      <Route
        path={`${ROUTES.CREATE_TEST}/:cloneId?`}
        element={<CreateTestForm />}
      />
      <Route
        path={ROUTES.CREATE_COLLECTION}
        element={<CreateCollectionForm />}
      />
      <Route path={ROUTES.FAQ} element={<FaqPage />} />
    </Routes>
  );
}

export default App;

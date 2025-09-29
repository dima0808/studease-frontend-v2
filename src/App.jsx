import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";
import LoginForm from "@/components/AuthForm/LoginForm";
import RegisterForm from "@/components/AuthForm/RegisterForm";
import TestsPage from "@/pages/TestsPage";
import { ROUTES } from "@/constants/routes";
import FaqPage from "@/pages/FaqPage";
import CollectionsPage from "@/pages/CollectionsPage";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.DEFAULT} element={<AuthLayout />}>
        <Route index element={<LoginForm />} />
        <Route path={ROUTES.REGISTER} element={<RegisterForm />} />
      </Route>

      <Route path={ROUTES.DEFAULT} element={<MainLayout />}>
        <Route
          path={ROUTES.TESTS} element={<TestsPage />}
        />
        <Route path={ROUTES.COLLECTIONS} element={<CollectionsPage />} />
        <Route path={ROUTES.DASHBOARD} element={<h1>Dashboard page</h1>} />
      </Route>
      <Route path={ROUTES.FAQ} element={<FaqPage />} />
    </Routes>
  )
}

export default App

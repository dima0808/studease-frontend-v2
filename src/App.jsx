import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";
import LoginForm from "@/components/AuthForm/LoginForm";
import RegisterForm from "@/components/AuthForm/RegisterForm";
import TestPage from "@/pages/TestPage";
import { ROUTES } from "@/constants/routes";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.DEFAULT} element={<AuthLayout />}>
        <Route index element={<LoginForm />} />
        <Route path={ROUTES.REGISTER} element={<RegisterForm />} />
      </Route>

      <Route path={ROUTES.DEFAULT} element={<MainLayout />}>
        <Route
          path={ROUTES.TESTS} element={<TestPage />}
        />
        <Route path={ROUTES.COLLECTIONS} element={<h1>Collections page</h1>} />
        <Route path={ROUTES.DASHBOARD} element={<h1>Dashboard page</h1>} />
      </Route>
      <Route path={ROUTES.FAQ} element={<h1>FAQ page</h1>} />
    </Routes>
  )
}

export default App

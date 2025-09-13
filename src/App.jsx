import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";
import LoginForm from "@/components/AuthForm/LoginForm";
import RegisterForm from "@/components/AuthForm/RegisterForm";
import TestPage from "@/pages/TestPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route
          path="tests" element={<TestPage />}
        />
        <Route path="collections" element={<h1>Collections page</h1>} />
        <Route path="dashboard" element={<h1>Dashboard page</h1>} />
        <Route path="faq" element={<h1>FAQ page</h1>} />
      </Route>
    </Routes>
  )
}

export default App

import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";
import LoginForm from "@/components/AuthForm/LoginForm";
import RegisterForm from "@/components/AuthForm/RegisterForm";
import TestCard from "@/components/TestCard";
import ToggleButton from "@/components/ToggleButton";
import { ACTION_OPTIONS, VIEW_OPTIONS } from "@/constants/toggleOptions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route
          path="tests" element={
          <div className="container">
            <h1>Tests page</h1>
            <div className="flex">
              <ToggleButton options={VIEW_OPTIONS}/>
              <ToggleButton options={ACTION_OPTIONS}/>
            </div>
            <div className="grid">
              <TestCard title="Системи управлінням мережами" wide/>
              <TestCard isActive title="Основи програмування" wide/>
              <TestCard title="Веб-програмування" wide/>
              <TestCard isActive title="Комп'ютерні мережі" wide/>
            </div>
            <div className="grid--4">
              <TestCard title="Системи управлінням мережами"/>
              <TestCard isActive title="Основи програмування"/>
              <TestCard title="Веб-програмування"/>
              <TestCard isActive title="Комп'ютерні мережі"/>
              <TestCard title="Системи управлінням мережами"/>
              <TestCard isActive title="Основи програмування"/>
              <TestCard title="Веб-програмування"/>
              <TestCard isActive title="Комп'ютерні мережі"/>
            </div>
          </div>}
        />
        <Route path="collections" element={<h1>Collections page</h1>} />
        <Route path="dashboard" element={<h1>Dashboard page</h1>} />
        <Route path="faq" element={<h1>FAQ page</h1>} />
      </Route>
    </Routes>
  )
}

export default App

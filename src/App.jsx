import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index path="tests" element={<h1>Tests page</h1>}/>
        <Route path="collections" element={<h1>Collections page</h1>}/>
        <Route path="dashboard" element={<h1>Dashboard page</h1>}/>
        <Route path="faq" element={<h1>FAQ page</h1>}/>
      </Route>
    </Routes>
  )
}

export default App

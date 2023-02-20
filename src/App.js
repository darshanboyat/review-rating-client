import { lazy, Suspense } from "react";
import Signin from "./Components/Auth/Signin";
import Reset from "./Components/ResetPassword";
import NewPassword from "./Components/NewPassword";
import { Routes, Route } from "react-router-dom";
import "./App.css";
const Signup = lazy(() => import("./Components/Auth/Signup"));
const CompanyList = lazy(() => import("./Components/Company/CompanyList"));


function App() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/list/company" element={<CompanyList />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/api/user/reset/:id/:token" element={<NewPassword />} />
            <Route path="*" element={<>Not Found</>} />
          </Routes>
        </header>
      </div>
    </Suspense>
  );
}

export default App;

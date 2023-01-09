import { Route, Routes } from "react-router-dom";
import { Explore } from "./pages/Explore/Explore";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import { UserRole } from "./pages/UserRole/UserRole";
import { useEffect } from "react";

export function App() {
    useEffect(() => {
        // perform network call like login to set current user if jwt not expired
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/user/role" element={<UserRole />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/explore" element={<Explore />}></Route>
        </Routes>
    );
}

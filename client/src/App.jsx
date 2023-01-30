import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import { UserRole } from "./pages/UserRole/UserRole";
import { RentalListing } from "./pages/RentalListing/RentalListing";
import { RentalDetail } from "./pages/RentalDetail/RentalDetail";
import { CreateListing } from "./pages/CreateListing/CreateListing";

export function App() {
    useEffect(() => {
        // perform network call like login to set current user if jwt not expired
    }, []);

    const role = "host"; // for now

    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/rental-listing" element={<RentalListing />}></Route>
            <Route
                path="/rental-detail/:rentalId"
                element={<RentalDetail />}
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/user/role" element={<UserRole />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            {/* this role will be saved using useReducer, after login */}
            {role === "host" || role === "admin" ? (
                <Route
                    path="/create-listing"
                    element={<CreateListing />}
                ></Route>
            ) : (
                {
                    /* <Route path="*" element={<Error404Page />} /> */
                }
            )}
            {/* <Route path="*" element={<Error404Page />} /> */}
        </Routes>
    );
}

import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import { UserRole } from "./pages/UserRole/UserRole";
import { RentalListing } from "./pages/RentalListing/RentalListing";
import { RentalDetail } from "./pages/RentalDetail/RentalDetail";
import { CreateListing } from "./pages/CreateListing/CreateListing";
import { useAuth } from "./context/auth-context";
import axios from "axios";
import { Error404Page } from "./pages/Error404Page/Error404Page";

export function App() {
    const {
        currentUser,
        setCurrentUser,
        userRole,
        setUserRole,
        setAllListings,
    } = useAuth();

    useEffect(() => {
        // perform network call like login to set current user if jwt not expired
        (async () => {
            try {
                const {
                    data: { userId, message },
                } = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/user`,
                    { withCredentials: true }
                );

                if (message === "Set user") {
                    setCurrentUser(
                        JSON.parse(localStorage.getItem("currentUser"))
                    );
                    setUserRole(JSON.parse(localStorage.getItem("userRole")));
                }
            } catch (error) {
                if (error.response?.data.message === "Token invalid") {
                    localStorage.removeItem("currentUser");
                    localStorage.removeItem("userRole");
                }
            }
        })();
    }, []);

    // to get all listings at start and save it in authContext state
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/rental/viewListing`,
                    { withCredentials: true }
                );
                setAllListings(response.data.listings);
            } catch (error) {
                // console.log(error);
            }
        })();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/rental-listing" element={<RentalListing />}></Route>
            <Route
                path="/rental-detail/:rentalId"
                element={<RentalDetail />}
            ></Route>

            {currentUser === "" ? (
                <>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/user/role" element={<UserRole />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                </>
            ) : (
                <Route path="*" element={<Error404Page />} />
            )}

            {userRole === "host" || userRole === "admin" ? (
                <>
                    <Route
                        path="/create-listing"
                        element={<CreateListing />}
                    ></Route>
                    <Route
                        path="/view-listing"
                        // element={<ViewListing />}
                    ></Route>
                </>
            ) : (
                <Route path="*" element={<Error404Page />} />
            )}

            <Route path="*" element={<Error404Page />} />
        </Routes>
    );
}

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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "./components/Loader";

export function App() {
    const {
        currentUser,
        setCurrentUser,
        userRole,
        setUserRole,
        setAllListings,
        loading,
        setLoading,
    } = useAuth();

    useEffect(() => {
        // perform network call like login to set current user if jwt not expired
        (async () => {
            try {
                const {
                    data: { userId, role, message },
                } = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/user`,
                    { withCredentials: true }
                );

                if (message === "Set user") {
                    setCurrentUser(userId);
                    setUserRole(role);
                    setLoading(false);
                }
            } catch (error) {
                if (error.response?.data.message === "Token invalid") {
                    // user not logged in, token expired or invalid
                    setLoading(false);
                }
            }
            // or we can use finally block for setloading?
        })();
    }, []);

    // to get all listings at start and save it in authContext state
    // NOTE: can use react router Loader for this! Update this
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/rental/listing`,
                    { withCredentials: true }
                );
                setAllListings(response.data.listings);
            } catch (error) {
                // console.log(error);
            }
        })();
    }, []);

    return (
        <>
            {!loading ? (
                <>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route
                            path="/rental-listing"
                            element={<RentalListing />}
                        ></Route>
                        <Route
                            path="/rental-detail/:rentalId"
                            element={<RentalDetail />}
                        ></Route>

                        {currentUser === "" ? (
                            <>
                                <Route
                                    path="/login"
                                    element={<Login />}
                                ></Route>
                                <Route
                                    path="/user/role"
                                    element={<UserRole />}
                                ></Route>
                                <Route
                                    path="/signup"
                                    element={<Signup />}
                                ></Route>
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

                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        theme="dark"
                        hideProgressBar={true}
                    />
                </>
            ) : (
                <Loader />
            )}
        </>
    );
}

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import axios from "axios";
import { toast } from "react-toastify";

const BtnsBeforeLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/user/role" ? (
        <Button color="inherit" onClick={() => navigate("/")}>
            Back to home
        </Button>
    ) : (
        <div>
            <Button color="inherit" onClick={() => navigate("/user/role")}>
                Signup
            </Button>
            <Button color="inherit" onClick={() => navigate("/login")}>
                Login
            </Button>
        </div>
    );
};

const logUserOut = async (navigate, setCurrentUser, setUserRole) => {
    setCurrentUser("");
    setUserRole("");

    try {
        const {
            data: { message },
        } = await axios.get(
            `${process.env.REACT_APP_API_ENDPOINT}/user/logout`,
            {
                withCredentials: true,
            }
        );

        toast(message);
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }

    navigate("/login");
};

const BtnsAfterLogin = () => {
    const navigate = useNavigate();
    const { setCurrentUser, setUserRole } = useAuth();

    return (
        <Button
            color="inherit"
            sx={{
                color: "#0f172a",
            }}
            onClick={() => logUserOut(navigate, setCurrentUser, setUserRole)}
        >
            Logout
        </Button>
    );
};

export function Navbar() {
    const { currentUser } = useAuth();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            // cursor: "pointer",
                        }}
                        // onClick={() => navigate("/")}
                    >
                        Holiday Rentals
                    </Typography>

                    {currentUser !== "" ? (
                        <BtnsAfterLogin />
                    ) : (
                        <BtnsBeforeLogin />
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

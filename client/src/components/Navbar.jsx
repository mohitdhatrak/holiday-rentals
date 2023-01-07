import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const BtnsBeforeLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/user-role" ? (
        <Button color="inherit" onClick={() => navigate("/")}>
            Back to home
        </Button>
    ) : (
        <Button color="inherit" onClick={() => navigate("/login")}>
            Login
        </Button>
    );
};

const logUserOut = (navigate) => {
    Cookies.remove("jwtToken");
    navigate("/login");
};

const BtnsAfterLogin = () => {
    const navigate = useNavigate();

    return (
        <Button
            color="inherit"
            sx={{
                color: "#27272a",
            }}
            onClick={() => logUserOut(navigate)}
        >
            Logout
        </Button>
    );
};

export function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (
            (document.cookie.includes("jwtToken") &&
                location.pathname === "/login") ||
            location.pathname === "/signup" ||
            location.pathname === "/user-role"
        ) {
            navigate("/");
        }
    }, []);

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

                    {Cookies.get("jwtToken") ? (
                        <BtnsAfterLogin />
                    ) : (
                        <BtnsBeforeLogin />
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
